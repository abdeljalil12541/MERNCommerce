"use client";
import React, { useState } from 'react';
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
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";


const Checkout = () => {
  const isPending  = usePayPalScriptReducer;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Mexico',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });

  const [selectedCountry, setSelectedCountry] = useState('Mexico');

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

  const initialOptions = {
    clientId: "AXz1LXU4Y-9g3uPBqo26Us6FbwJbl34POTjmHnp3aOtNDnkq8ieOmMoQKLw9dU7s2vg1yO5z_mNak-80",
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className="mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardBody>
              
              <div className="text-center my-4 text-gray-500">OR</div>

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
                  selectedKeys={[selectedCountry]}
                  onSelectionChange={(keys) => {
                    const country = Array.from(keys)[0];
                    setSelectedCountry(country);
                    setFormData(prev => ({ ...prev, country }));
                  }}
                >
                  <SelectItem key="Mexico">Mexico</SelectItem>
                  <SelectItem key="USA">United States</SelectItem>
                  <SelectItem key="Canada">Canada</SelectItem>
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

                <div className="w-full">
                  <PayPalScriptProvider options={initialOptions}>
                    {isPending ? <div className="spinner" /> : null}
                    <PayPalButtons style={{ layout: "vertical" }} />
                  </PayPalScriptProvider>
                </div>

                
              </div>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader>Order Summary</CardHeader>
          <CardBody className='h-96'>
            {cartItems.map((item, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 object-cover h-16 mr-4 rounded"
                  />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-gray-500">{item.size}</div>
                  </div>
                </div>
                <div className="font-semibold">${item.price.toFixed(2)}</div>
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
                  <Button color="primary">
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