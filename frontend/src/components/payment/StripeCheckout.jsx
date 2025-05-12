// File: src/components/payment/StripeCheckout.jsx

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51M8...'); // Replace with your Stripe publishable key

const StripeCheckout = ({ amount, currency = "USD", onPaymentSuccess, onPaymentError, onPaymentCancel }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch the Payment Intent client secret from your backend
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount }),
        });

        if (!response.ok) {
          throw new Error('Failed to connect to payment server. Please ensure the backend is running.');
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.message);
        onPaymentError(err);
      }
    };

    fetchPaymentIntent();
  }, [amount, onPaymentError]);

  const StripeForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);

      if (!stripe || !elements || !clientSecret) {
        setError('Payment initialization failed. Please try again later.');
        setIsLoading(false);
        onPaymentError(new Error('Payment initialization failed'));
        return;
      }

      const cardElement = elements.getElement(CardElement);

      try {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

        if (error) {
          setError(error.message);
          onPaymentError(error);
        } else if (paymentIntent.status === 'succeeded') {
          onPaymentSuccess(paymentIntent);
        }
      } catch (err) {
        setError(err.message);
        onPaymentError(err);
      } finally {
        setIsLoading(false);
      }
    };

    const handleCancel = () => {
      onPaymentCancel();
    };

    return (
      <div className="w-full">
        {error && (
          <div className="bg-red-100 text-red-800 p-2 rounded-lg mb-4">
            {error}
          </div>
        )}
        {!clientSecret && !error && (
          <div className="flex justify-center p-4">
            <div className="spinner border-4 border-t-4 border-gray-200 rounded-full w-10 h-10 animate-spin"></div>
          </div>
        )}
        {clientSecret && (
          <>
            <div className="mb-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
            <div className="flex justify-between">
              <Button onClick={handleCancel} color="secondary" disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary" disabled={isLoading || !stripe || !clientSecret}>
                {isLoading ? 'Processing...' : `Pay $${amount}`}
              </Button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <Elements stripe={stripePromise}>
      <StripeForm />
    </Elements>
  );
};

export default StripeCheckout;