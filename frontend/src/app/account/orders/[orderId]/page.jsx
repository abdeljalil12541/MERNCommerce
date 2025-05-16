'use client';
import { Card, Button, Divider } from '@nextui-org/react';
import SideBar from "@/components/SideBar";
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

export default function OrderDetail() {
    const [orders, setOrders] = useState([]);
    const [loader, setLoader] = useState(true);
    const orderItems = [
        {
            id: 1,
            name: 'FIFA Basic Football',
            type: 'simple',
            price: '$18.00',
            quantity: 1,
            sku: 'fifa-football',
            category: 'Sports',
            image: '/path-to-football-image.jpg'
        },
        {
            id: 2,
            name: 'Football Shoes',
            type: 'simple',
            price: '$51.00',
            quantity: 1,
            sku: 'woo-shoes',
            category: 'Sports',
            image: '/path-to-shoes-image.jpg'
        }
    ];

    const subtotal = orders.totalPrice;
    const paymentMethod = orders.paymentMethod;
    const total = orders.totalPrice;

    useEffect(() => {
        try {
          const orderData = sessionStorage.getItem('orderData');
          if (orderData) {
            const parsedOrder = JSON.parse(orderData);
            console.log('Retrieved order data:', parsedOrder);
            setOrders(parsedOrder);
          } 
        } catch (error) {
          console.error('Error retrieving order data:', error);
        } finally {
            setLoader(false);
        }
      }, []);



    return(
        <div className="w-full grid grid-cols-4 gap-6 px-8 py-8">
            {loader && <Loader />}
            <div className="col-span-1">
                <SideBar />
            </div>
            <div className="col-span-3">
                <div className="w-full p-4 rounded-md bg-gray-100">
                    <h1 className="text-xl font-medium mb-6">Order Details</h1>
                   
                    <div>
                        <div className="w-full">
                            <Card className="w-full mb-6">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Order details</h2>
                                    
                                    {/* Order Summary Section */}
                                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                                        <div className="flex justify-between py-2">
                                            <span className="font-medium">Product</span>
                                            <span className="font-medium">Total</span>
                                        </div>
                                        
                                        {orders.cartProducts && orders.cartProducts.map((item, index) => (
                                            <div key={index} className="flex justify-between py-2">
                                                <span className="hover:underline">
                                                    <a href={`/products/${item.productId.slug}`}>{item.productId.title}</a> <span>×{item.quantity}</span>
                                                </span>
                                                <span>${(item.productId.currentPrice * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                        
                                        <div className="flex justify-between py-2">
                                            <span className="font-medium">Subtotal:</span>
                                            <span>${subtotal?.toFixed(2)}</span>
                                        </div>
                                        
                                        <div className="flex justify-between py-2">
                                            <span className="font-medium">Shipping:</span>
                                            <span className='text-right'>
                                                {orders?.customerInfo?.address} <br /> 
                                                {orders?.customerInfo?.apartment} <br /> 
                                                {orders?.customerInfo?.city}, {orders?.customerInfo?.country} 
                                            </span>
                                        </div>
                                        
                                        <div className="flex justify-between py-2">
                                            <span className="font-medium">Payment method:</span>
                                            <span className="text-blue-500">{paymentMethod}</span>
                                        </div>
                                        
                                        <div className="flex justify-between py-2">
                                            <span className="font-medium">Total:</span>
                                            <span className="text-green-600">${total?.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Product Details Table */}
                                    <div className="border border-gray-200 rounded-md overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {orders?.cartProducts?.map((item, index) => (
                                                    <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <img
                                                        src={item.productId.mainSrc || "https://via.placeholder.com/40"}
                                                        alt={item.productId.title}
                                                        className="w-10 h-10 object-cover rounded"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {item.productId.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        ${(item.productId.currentPrice * item.quantity).toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <a href="#" className="text-blue-600 hover:underline">
                                                        {item.productId.category?.name || 'Unknown Category'}
                                                        </a>
                                                    </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}