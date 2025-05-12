"use client";
import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Button, 
  Select, 
  SelectItem, 
  Input 
} from "@nextui-org/react";
import Stepper from 'react-stepper-horizontal';
import { useCart } from '@/context/CartContext';
import countries from '../../countries-list/countries.json';
import StripeCheckout from '../../components/payment/StripeCheckout';

const Checkout = () => {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Morocco',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });
  const [orderTotal, setOrderTotal] = useState('99.99');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPaymentAttempted, setHasPaymentAttempted] = useState(false);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const sortedCountries = countries.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        setCountryList(sortedCountries);
        
        const moroccoEntry = sortedCountries.find(c => 
          c.name === 'Morocco' || c.code === 'MA' || c.code === 'MAR'
        );
        
        if (moroccoEntry) {
          const moroccoKey = moroccoEntry.code || moroccoEntry.name;
          setSelectedCountry(moroccoKey);
        }
      } catch (error) {
        console.error('Error loading local file, fetching from API instead:', error);

        try {
          const response = await fetch('https://restcountries.com/v3.1/all');
          if (!response.ok) {
            throw new Error('API fetch failed');
          }
          const data = await response.json();

          const sortedCountries = data.sort((a, b) => {
            const nameA = a.name.common.toLowerCase();
            const nameB = b.name.common.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });

          const formattedCountries = sortedCountries.map(country => ({
            name: country.name.common,
            code: country.cca3
          }));

          setCountryList(formattedCountries);
          
          const moroccoEntry = formattedCountries.find(c => 
            c.name === 'Morocco' || c.code === 'MAR'
          );
          
          if (moroccoEntry) {
            const moroccoKey = moroccoEntry.code || moroccoEntry.name;
            setSelectedCountry(moroccoKey);
          }
        } catch (apiError) {
          console.error('Error fetching from API:', apiError);
        }
      }
    };

    getCountries();
  }, []);

  const { cartProduct, setCartProduct } = useCart();
  console.log('cart product in checkouts page: ', cartProduct);
  const cartItems = [
    {
      name: 'KIDS BEAST GAMES COLOR BLOCK HOODIE',
      size: '6Y / Blue',
      price: 948.00,
      image: 'https://cdn.shopify.com/s/files/1/0016/1975/5059/files/MB0078-BLK_0012_449Q4MrBeast.StoreKids2024copy_9aa35d68-a871-44f6-862d-4e7f83cfb83e.jpg?v=1733171927'
    },
    {
      name: '3D BOLT HOODIE - BLACK',
      size: 'XXS/Y12 / Black',
      price: 842.00,
      image: 'https://cdn.shopify.com/s/files/1/0016/1975/5059/files/MB0078-BLK_0012_449Q4MrBeast.StoreKids2024copy_9aa35d68-a871-44f6-862d-4e7f83cfb83e.jpg?v=1733171927'
    },
    {
      name: '3D BOLT HOODIE - BLACK',
      size: 'XXS/Y12 / Black',
      price: 842.00,
      image: 'https://cdn.shopify.com/s/files/1/0016/1975/5059/files/MB0078-BLK_0012_449Q4MrBeast.StoreKids2024copy_9aa35d68-a871-44f6-862d-4e7f83cfb83e.jpg?v=1733171927'
    },
    {
      name: '3D BOLT HOODIE - BLACK',
      size: 'XXS/Y12 / Black',
      price: 842.00,
      image: 'https://cdn.shopify.com/s/files/1/0016/1975/5059/files/MB0078-BLK_0012_449Q4MrBeast.StoreKids2024copy_9aa35d68-a871-44f6-862d-4e7f83cfb83e.jpg?v=1733171927'
    },
    {
      name: '3D BOLT HOODIE - BLACK',
      size: 'XXS/Y12 / Black',
      price: 842.00,
      image: 'https://cdn.shopify.com/s/files/1/0016/1975/5059/files/MB0078-BLK_0012_449Q4MrBeast.StoreKids2024copy_9aa35d68-a871-44f6-862d-4e7f83cfb83e.jpg?v=1733171927'
    },
    {
      name: '3D BOLT HOODIE - BLACK',
      size: 'XXS/Y12 / Black',
      price: 842.00,
      image: 'https://cdn.shopify.com/s/files/1/0016/1975/5059/files/MB0078-BLK_0012_449Q4MrBeast.StoreKids2024copy_9aa35d68-a871-44f6-862d-4e7f83cfb83e.jpg?v=1733171927'
    },
    {
      name: 'INVESTOR 3M REFLECTIVE HOODIE - BLACK',
      size: 'Y16',
      price: 316.00,
      image: 'https://cdn.shopify.com/s/files/1/0016/1975/5059/files/MB0078-BLK_0012_449Q4MrBeast.StoreKids2024copy_9aa35d68-a871-44f6-862d-4e7f83cfb83e.jpg?v=1733171927'
    }
  ];

  const recommendedItems = [
    {
      name: 'KIDS GLOW IN THE DARK PANTHER HOODIE',
      size: '4Y / Black',
      price: 948.00,
      image: 'https://cdn.shopify.com/s/files/1/0016/1975/5059/files/MB0078-BLK_0012_449Q4MrBeast.StoreKids2024copy_9aa35d68-a871-44f6-862d-4e7f83cfb83e.jpg?v=1733171927'
    },
    {
      name: 'KIDS GLOW IN THE DARK PANTHER HOODIE',
      size: '4Y / Black',
      price: 948.00,
      image: 'https://cdn.shopify.com/s/files/1/0016/1975/5059/files/MB0078-BLK_0012_449Q4MrBeast.StoreKids2024copy_9aa35d68-a871-44f6-862d-4e7f83cfb83e.jpg?v=1733171927'
    },
    {
      name: 'KIDS GLOW IN THE DARK PANTHER HOODIE',
      size: '4Y / Black',
      price: 948.00,
      image: 'https://cdn.shopify.com/s/files/1/0016/1975/5059/files/MB0078-BLK_0012_449Q4MrBeast.StoreKids2024copy_9aa35d68-a871-44f6-862d-4e7f83cfb83e.jpg?v=1733171927'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentSuccess = (paymentIntent) => {
    setIsProcessing(true);
    console.log('Payment successful!', paymentIntent);
    setTimeout(() => {
      setPaymentStatus({
        success: true,
        message: 'Payment completed successfully!',
        paymentId: paymentIntent.id,
      });
      setIsProcessing(false);
      setHasPaymentAttempted(true);
      setCartProduct([]);
    }, 1000);
  };
  
  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    setPaymentStatus({
      success: false,
      message: `Payment failed: ${error.message || 'Unknown error'}`,
    });
    setHasPaymentAttempted(true);
  };

  const handlePaymentCancel = () => {
    setPaymentStatus({
      success: false,
      message: 'Payment was cancelled.',
    });
    setHasPaymentAttempted(true);
  };

  return (
    <div className="mx-auto p-6">
      {paymentStatus?.success ? (
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Order Confirmation</h1>
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
            <p className="font-medium">{paymentStatus.message}</p>
            {paymentStatus.paymentId && (
              <p className="text-sm mt-1">Payment ID: {paymentStatus.paymentId}</p>
            )}
          </div>
          <div className="text-center">
            <p className="mb-4">Thank you for your purchase!</p>
            <Button color="primary" onClick={() => window.location.href = '/'}>
              Return to Home
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${orderTotal}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${orderTotal}</span>
              </div>
            </div>
            
            {paymentStatus && (
              <div className={`p-4 mb-4 rounded-lg ${paymentStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <p className="font-medium">{paymentStatus.message}</p>
                {paymentStatus.paymentId && (
                  <p className="text-sm mt-1">Payment ID: {paymentStatus.paymentId}</p>
                )}
              </div>
            )}
            
            {isProcessing && (
              <div className="flex justify-center items-center p-4 mb-4">
                <div className="spinner border-4 border-t-4 border-gray-200 rounded-full w-8 h-8 animate-spin mr-2"></div>
                <span>Processing your payment...</span>
              </div>
            )}
            
            {!hasPaymentAttempted && !isProcessing && (
              <div className="border rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-4">Pay with Card</h3>
                <StripeCheckout
                  amount={orderTotal}
                  currency="USD"
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  onPaymentCancel={handlePaymentCancel}
                />
              </div>
            )}
          </div>

          <div className='-mt-8 mb-8'>
            <Stepper steps={[{title: 'Shopping Cart'}, {title: 'Checkout'}, {title: 'Confirmation'}]} activeStep={1} defaultColor="#E0E0E0" completeColor="#E74683" activeColor="#E74683" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardBody>
                  <div className="space-y-4">
                    <Input 
                      type="email" 
                      label="Email Address" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />

                    <Input 
                      type="tel" 
                      label="Phone Number" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input 
                        type="text" 
                        label="First Name" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <Input 
                        type="text" 
                        label="Last Name" 
                        name="lastName"
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <Select
                      label="Delivery Country"
                      selectedKeys={selectedCountry ? [selectedCountry] : []}
                      onSelectionChange={(keys) => {
                        const country = Array.from(keys)[0];
                        setSelectedCountry(country);
                        setFormData(prev => ({ ...prev, country }));
                      }}
                    >
                      {countryList.map((country) => (
                        <SelectItem
                          key={country.code || country.name}
                          value={country.code || country.name}
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                    </Select>

                    <Input 
                      type="text" 
                      label="Street Address" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />

                    <Input 
                      type="text" 
                      label="Apartment, suite, etc. (optional)" 
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                    />

                    <div className="grid md:grid-cols-3 gap-4">
                      <Input 
                        type="text" 
                        label="City" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                      <Input 
                        type="text" 
                        label="State" 
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                      <Input 
                        type="text" 
                        label="ZIP Code" 
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <Card>
              <CardHeader>Order Summary</CardHeader>
              <CardBody className='h-96'>
                {cartProduct.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center mb-4"
                  >
                    <div className="flex items-center">
                      <img 
                        src={item?.mainSrc || (item?.productId && item.productId.mainSrc)} 
                        alt={item?.title || (item?.productId && item.productId.title)} 
                        className="w-16 object-cover h-16 mr-4 rounded"
                      />
                      <div>
                        <div className="font-semibold">{item?.title || (item?.productId && item.productId.title)} <span className='text-gray-400 font-sans'>{item?.quantity === 1 ? null : `×${item?.quantity}`}</span></div>
                        <div className="text-gray-500">{item.selectedSize}</div>
                      </div>
                    </div>
                    <div className="font-semibold">
                      ${(
                        item?.currentPrice != null && item?.quantity != null
                          ? (Number(item.currentPrice) * Number(item.quantity)).toFixed(2)
                          : item?.productId
                            ? (item.productId.currentPrice * item.quantity).toFixed(2)
                            : '0.00'
                      )}
                    </div>
                  </div>
                ))}
              </CardBody>
              <CardFooter>
                <div>
                  <h4 className="font-semibold mb-4">Jimmy recommends these 😎</h4>
                  {recommendedItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover mr-4 rounded"
                        />
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-gray-500">{item.size}</div>
                        </div>
                      </div>
                      <Button className='ml-2' color="primary">
                        Add • ${item.price.toFixed(2)}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;