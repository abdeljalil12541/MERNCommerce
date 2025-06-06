"use client";
import React, { useEffect } from 'react';
import { Card, CardBody, Divider } from "@nextui-org/react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Stepper from 'react-stepper-horizontal';
import { Goldman } from 'next/font/google';
import { useSearchParams } from 'next/navigation';

const GoldmanFont = Goldman({
  subsets: ['latin'],
  weight: ['400'],
});

const OrderConfirmation = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');

  const orderDetails = {
    orderNumber: "100000147",
    email: "sample@zoey.com",
    shippingAddress: {
      name: "John Doe",
      address: "9302 Maple Drive",
      city: "New York City",
      state: "New York",
      zip: "10001",
      country: "United States",
      phone: "555-555-1234"
    },
    shippingMethod: "Flat Rate 2 Title - Flat Rate 2 Method Name",
    paymentMethod: "Check / Money Order"
  };

  const orderData = JSON.parse(sessionStorage.getItem('latestOrder'));
  console.log('order amount in success page: ', amount)

  const products = [
    { title: 'BEAST SKATE DECK - PINK', size: 'S', color: 'Red', productType: 'Accessoiries', regularPrice: 499, currentPrice: 459, discount: 16, status: 'NEW', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-03-15', ifBestSeller: true },
    { title: 'BEAST SKATE DECK - PINK', size: 'S', color: 'Blue', productType: 'Flannel Pants', regularPrice: 499, currentPrice: 459, discount: 16, status: 'NEW', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-02-28', ifBestSeller: false },
    { title: 'BEAST SKATE DECK - BLUE', size: 'S', color: 'Red', productType: 'Cap', regularPrice: 499, currentPrice: 449, discount: 10, status: 'DEAL', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-01-15', ifBestSeller: true },
    { title: 'BEAST SKATE DECK - GREEN', size: 'S', color: 'Black', productType: 'Backpack', regularPrice: 499, currentPrice: 399, discount: 20, status: 'TRENDING', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-03-01', ifBestSeller: true },
  ];

  const subtotal = orderData.cartProduct.reduce((acc, item) => {
    const price = item.currentPrice || (item.productId && item.productId.currentPrice) || 0;
    return acc + price * item.quantity;
  }, 0);

  const shippingAndHandling = 20;
  const tax = 0;
  const totalPrice = orderData.totalPrice + shippingAndHandling + tax;



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className='-mt-8 mb-8'>
        <Stepper steps={[{ title: 'Shopping Cart' }, { title: 'Checkout' }, { title: 'Confirmation' }]} activeStep={2} defaultColor="#E0E0E0" completeColor="#E74683" activeColor="#E74683" />
      </div>
      <div className="max-w-6xl mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Details Section */}
          <div className="md:col-span-2">
            <Card>
              <CardBody className="p-6">
                <div className="text-2xl font-medium text-center justify-center flex text-green-600 mb-10 mt-1">
                  <IoCheckmarkCircleSharp className='mt-[2px] mr-1 size-7' /> Thank you! Your order has been placed.
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium">Your order # is: {orderData.orderId.toUpperCase().slice(0, 9)}</h2>
                    <p className="text-sm text-gray-500">
                      An email receipt including the details about your order has been sent to {orderData.customerInfo.email}
                    </p>
                  </div>

                  <Divider />

                  <div>
                    <h3 className="font-medium mb-2">This order will be shipped to:</h3>
                    <div className="text-sm text-gray-600">
                      <p>{orderData.customerInfo.firstName} {orderData.customerInfo.lastName}</p>
                      <p>{orderData.customerInfo.address}</p>
                      <p>{orderData.customerInfo.apartment}</p>
                      <p>
                        {orderData.customerInfo.city}, {orderData.customerInfo.state} {orderData.customerInfo.zipCode}
                      </p>
                      <p>{orderData.customerInfo.country}</p>
                      <p>T: {orderData.customerInfo.phone}</p>
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h3 className="font-medium mb-2">Shipping Method</h3>
                    <p className="text-sm text-gray-600">FedEx</p>
                  </div>

                  <Divider />

                  <div>
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <p className="text-sm text-gray-600">{orderData.paymentMethod}</p>
                  </div>

                  <Divider />

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Questions?</h3>
                    <p className="text-sm text-gray-600">
                      Have any questions about your order? Feel free to contact us{' '}
                      <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                        here
                      </span>{' '}
                      or call 234-235-2351
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Order Summary Section */}
          <div>
            <Card>
              <CardBody className="p-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {orderData.cartProduct.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="h-12 w-12 overflow-hidden bg-gray-200 rounded-md">
                        <img
                          src={item?.mainSrc || (item?.productId && item.productId.mainSrc)}
                          alt={item?.title || (item?.productId && item.productId.title)}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item?.title || (item?.productId && item.productId.title)}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}

                  <Divider />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping & Handling (Flat Rate)</span>
                      <span className='ml-1'>${shippingAndHandling.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <Divider />

                    <div className="flex justify-between font-medium text-lg">
                      <span>Grand Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      <section className='w-full px-4 mt-10'>
        <p className='flex text-2xl py-4 pl-1 justify-start'>
          You may also like
        </p>
        <div className="w-full grid grid-cols-4 gap-2 mb-5">
            {products.length > 0 && (
              products.map((product, index) => (
                  <div key={index} className={`${GoldmanFont.className} col-span-1 CardHover relative mx-1 cursor-pointer h-[480px] group`}>
                      <img
                          src={product.mainSrc}
                          alt={product.title}
                          className="rounded-lg group-hover:hidden h-[400px] w-full object-cover"
                      />
                      <img
                          src={product.hoverSrc}
                          alt={`${product.title} Hover`}
                          className="rounded-lg hidden group-hover:block h-[400px] w-full object-cover"
                      />
                      <span 
                          className={`absolute ${product.status === 'SOLD OUT'? '!bottom-[90px] right-2': 'top-2 left-2'} 
                              ${product.status === 'NEW' && 'bg-[#1AACDD]' ||
                                  product.status === 'DEAL' && 'bg-[#E74683]' ||
                                  product.status === 'TRENDING' && 'bg-[#17C964]' ||
                                  product.status === 'SOLD OUT' && 'bg-neutral-950'
                              } text-white text-[10px] me-2 px-4 py-1 rounded-xl font-medium`}
                          >
                          {product.status}
                      </span>
                      <div className="space-y-2 p-2">
                          <p className="pt-2 cursor-pointer TextCardHover">{product.title}</p>
                          <div className="flex gap-3">
                              <p className="text-gray-800 line-through">{product.regularPrice.toFixed(2)} dh</p>
                              <p className="text-black ">{product.currentPrice.toFixed(2)} dh</p>
                              <p className="text-[#E74683] mt-[1px]">{product.discount}% OFF</p>
                          </div>
                      </div>
                  </div>
              ))
            )}
        </div>
      </section>
    </div>
  );
};

export default OrderConfirmation;
