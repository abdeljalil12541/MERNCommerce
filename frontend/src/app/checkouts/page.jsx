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
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements
} from '@stripe/react-stripe-js';
import CheckoutPage from '@/components/payment/StripeCheckout';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubcurrency from '@/lib/convetToSubcurrency';
import Loader from '@/components/Loader';


const stripePromise = loadStripe('pk_test_51OpZiJFHs1GmgtcbJ0jbzfsHMriJb4XHRammGCq7fuZplZ9TFshdUeJCf6RBXjj6QymUIvI3ysgk1v9CtN5gqRch00oCzByb2Y')

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
  });
  const [orderTotal, setOrderTotal] = useState(0);
  const { cartProduct, setCartProduct } = useCart();
  

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
        console.log('Error loading local file, fetching from API instead:', error);

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
          console.log('Error fetching from API:', apiError);
        }
      }
    };

    getCountries();
  }, []);

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
  
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (Array.isArray(cartProduct)) {
      const total = cartProduct.reduce((acc, item) => {
        const price = item?.currentPrice ?? item?.productId?.currentPrice ?? 0;
        const quantity = item?.quantity ?? 1;
        return acc + (Number(price) * Number(quantity));
      }, 0);
      setOrderTotal(total);
      setLoader(false);
    }
  }, [cartProduct]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== ''); // Checks if no value is empty
  };

  const [isFormFilled, setIsFormFilled] = useState(true);
  
  useEffect(() => {
    setIsFormFilled(isFormValid());
  }, [formData]);

  const amount = orderTotal;
  return (
    <div className="mx-auto p-6">
      {loader && <Loader />}
          <div className='-mt-8 mb-8'>
            <Stepper steps={[{title: 'Shopping Cart'}, {title: 'Checkout'}, {title: 'Confirmation'}]} activeStep={1} defaultColor="#E0E0E0" completeColor="#E74683" activeColor="#E74683" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Card>
              <CardBody>
                  <div className="space-y-4">
                    <Input 
                      radius='sm'
                      variant='bordered'
                      type="email" 
                      label="Email Address" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />

                    <Input 
                      radius='sm'
                      variant='bordered'
                      type="tel" 
                      label="Phone Number" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input 
                        radius='sm'
                        variant='bordered'
                        type="text" 
                        label="First Name" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <Input 
                        radius='sm'
                        variant='bordered'
                        type="text" 
                        label="Last Name" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <Select
                      radius='sm'
                      variant='bordered'
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
                      radius='sm'
                      variant='bordered'
                      type="text" 
                      label="Street Address" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />

                    <Input 
                      radius='sm'
                      variant='bordered'
                      type="text" 
                      label="Apartment, suite, etc. (optional)" 
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                    />

                    <div className="grid md:grid-cols-3 gap-4">
                      <Input 
                        radius='sm'
                        variant='bordered'
                        type="text" 
                        label="City" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                      <Input 
                        radius='sm'
                        variant='bordered'
                        type="text" 
                        label="State" 
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                      <Input 
                        radius='sm'
                        variant='bordered'
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
                {
                  orderTotal > 0 && (
                    <Elements
                      stripe={stripePromise}
                      options={{ 
                        mode: "payment",
                        amount: convertToSubcurrency(amount), // Now it's safe
                        currency: "usd"
                      }}
                    >
                      <CheckoutPage amount={amount} isFormFilled={isFormFilled} />
                    </Elements>
                  )
                }
              </Card>
            </div>

            <Card>
              <CardHeader>Order Summary</CardHeader>
              <CardBody className='h-96'>
                {Array.isArray(cartProduct) && cartProduct.length > 0 ? cartProduct.map((item, index) => (
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
                )) : (
                  <div className="text-center text-gray-500 py-4">
                    No items in cart
                  </div>
                )}
              </CardBody>
              <CardFooter>
                <div>
                  <h4 className="font-semibold mb-4">Jimmy recommends these 😎</h4>
                  {recommendedItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center mb-4"
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
    </div>
  );
};

export default Checkout;