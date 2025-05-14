const stripePromise = loadStripe('pk_test_51OpZiJFHs1GmgtcbJ0jbzfsHMriJb4XHRammGCq7fuZplZ9TFshdUeJCf6RBXjj6QymUIvI3ysgk1v9CtN5gqRch00oCzByb2Y')
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import convetToSubcurrency from '@/lib/convetToSubcurrency';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import convertToSubcurrency from '@/lib/convetToSubcurrency';
import { Button } from '@nextui-org/react';
import Loader from '../Loader';
import { useCart } from '@/context/CartContext';

function CheckoutPage({ amount, isFormFilled, cartProduct, customerInfo }) {
  const stripe = useStripe();
  const elements = useElements();


  const [errorMessage, setErrorMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Stripe');
  const [userId, setUserId] = useState(null);
  const {cartId, setCartId} = useCart();

  console.log('cart product from checkout pagesss: ', cartProduct);
  console.log('cart id: ', cartId)
  console.log('user id: ', userId)
  console.log('customerInfo: ', customerInfo)

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const res = await api.post('/create-payment-intent', {
          amount: convertToSubcurrency(amount), // cents
        });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log("Failed to get client secret", err);
      }
    };
  
    fetchClientSecret();
  }, [amount]);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found, please log in');
        }

        console.log('Fetching user data with token:', token);
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Response data:', response.data);
        setUserId(response.data.id)
        
      } catch (err) { // No type annotation
        return
      } finally {
        // setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const syncGuestCart = async () => {
    try {
      const guestCart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Properly map cart items based on their structure
      const mappedItems = guestCart.map(item => ({
        productId: item._id, // Use _id directly from localStorage cart
        quantity: item.quantity,
        selectedSize: item.selectedSize,
      }));
  
      const response = await api.post('/orders/sync-guest-cart', {
        products: mappedItems,
      });
  
      console.log('Guest cart synced:', response.data);
      setCartId(response.data.cartId);
      return response.data.cartId;
    } catch (err) {
      console.log('Error syncing guest cart:', err);
      throw err;
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      if (!stripe || !elements) {
        return;
      }
  
      const { error: submitError } = await elements.submit();
  
      if (submitError) {
        setErrorMessage(submitError.message);
        setIsLoading(false);
        return;
      }
  
      // Sync guest cart if not authenticated
      let finalCartId = cartId;
      if (!userId) {
        finalCartId = await syncGuestCart();
      }
  
      try {
        // The key fix is here - we need to pass the cartProducts as an array with the cart ID
        const response = await api.post('/orders/create-order', {
          userId: userId || null,
          cartProducts: [finalCartId], // Cart ID must be in an array as per Order schema
          customerInfo: customerInfo,
          paymentMethod: paymentMethod,
          totalPrice: amount
        });
        
        console.log('order created successfully:', response.data);

        // Clear cart from localStorage for guest users
        if (!userId) {
          localStorage.removeItem('cart');
        }
        
        // Proceed with payment confirmation
        const { error } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/payment-success?amount=${amount}&orderId=${response.data.orderId}`
          },
        });
        
        if (error) {
          setErrorMessage(error.message);
        }
      } catch (err) {
        console.log('Error creating order:', err);
        setErrorMessage(err.response?.data?.message || 'Failed to create order');
      }
    } catch (err) {
      console.log('error: ', err.message);
      setErrorMessage('Payment processing failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return <div className='w-full text-center my-4' role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#E74683]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
        }

  return(
    <form onSubmit={handleSubmit} className='w-full text-center mt-4 p-4 rounded-md'>
      {/* {isLoading && <Loader /> } */}
      {clientSecret && <PaymentElement /> }
      {errorMessage && <div>{errorMessage}</div> }
      
      <Button type='submit' isDisabled={!stripe || isLoading || !isFormFilled} color='primary' className='w-full my-4'>
        <p className='text-white'>{!isLoading ? `Pay $${amount}`: "Processing..."}</p>
      </Button>
    </form>
  )
}
export default CheckoutPage;