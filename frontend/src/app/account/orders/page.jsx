"use client";
import SideBar from "../../../components/SideBar"
import React, { useEffect, useState } from 'react';
import { Card, Button, Divider } from '@nextui-org/react';
import { Package } from 'lucide-react';
import api from "@/lib/api";

export default function AccountOrders() {
    const [activeTab, setActiveTab] = useState('canceled');
    const [userId, setUserId] = useState(null);
    const [orders, setOrders] = useState([]);


    const upcomingOrdersProducts = [
        {
          id: '395712859',
          image: 'https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946',
          name: 'Bouilloire Électrique élégant 1.8L 1500W BG1500/',
          status: 'DÉLICE DE LA MAISON',
          date: 'Le jeudi, 13-02'
        },
        {
          id: '323645169',
          image: 'https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946',
          name: 'Barre Fixe de Musculation réglable Exercice traction Gym Sport Fitness',
          status: 'ANNULÉE',
          date: 'Le 09-12-2023'
        },
        {
          id: '372828169',
          image: 'https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946',
          name: 'Barre Fixe de Musculation réglable Exercice traction Gym Sport Fitness',
          status: 'DÉLICE DE LA MAISON',
          date: 'Le 08-12-2023'
        },
        {
          id: '361228169',
          image: 'https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946',
          name: 'Barre Fixe Multifonctions neuf sans emballage',
          status: 'ANNULÉE',
          date: 'Commande'
        }
    ];

    const canceledOrdersProducts = [
    {
        id: '395712859',
        image: 'https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946',
        name: 'Bouilloire Électrique élégant 1.8L 1500W BG1500/',
        status: 'DÉLICE DE LA MAISON',
        date: 'Le jeudi, 13-02'
    },
    {
        id: '323645169',
        image: 'https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946',
        name: 'Barre Fixe de Musculation réglable Exercice traction Gym Sport Fitness',
        status: 'ANNULÉE',
        date: 'Le 09-12-2023'
    },
    {
        id: '372828169',
        image: 'https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946',
        name: 'Barre Fixe de Musculation réglable Exercice traction Gym Sport Fitness',
        status: 'DÉLICE DE LA MAISON',
        date: 'Le 08-12-2023'
    },
    {
        id: '361228169',
        image: 'https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946',
        name: 'Barre Fixe Multifonctions neuf sans emballage',
        status: 'ANNULÉE',
        date: 'Commande'
    }
    ];

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

    useEffect(() => {
      const fetchOrders = async () => {
        if (userId) { // Only fetch if userId is available
          try {
            // FIXED: Pass userId in request body for POST request
            const response = await api.post('/orders/get-orders', { userId });
            console.log('orders: ', response.data.orders);
            setOrders(response.data.orders);
            const fetchedOrders = response.data.orders.flat();
          setOrders(fetchedOrders);
          } catch (error) {
            console.error("Error fetching orders:", error);
          }
        }
      };
      
      fetchOrders();
    }, [userId]); // Add userId as dependency so it runs when userId changes

      const EmptyCard = () => (
        <Card className="w-full">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Package className="w-8 h-8 text-[#E74683]" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              Vous n'avez placé aucune commande !
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Toutes vos commandes seront sauvegardées ici pour que vous puissiez consulter leur statut à tout moment.
            </p>
            <Button color="warning" variant="solid">
              Poursuivez vos achats
            </Button>
          </div>
        </Card>
      );

      function joinTitlesWithOverallLimit(titles, limit = 55) {
        const fullString = titles.join(' | ');
        if (fullString.length <= limit) {
          return fullString;
        } else {
          return fullString.slice(0, limit).trimEnd() + '...'; // add "..." if truncated
        }
      }



    
      const CanceledOrders = () => (
        <div className="space-y-4">
          {orders.filter(order => 
            order.status.toLowerCase() === "canceled" || 
            order.status.toLowerCase() === "returned"
          ).length > 0 ? (
            orders.filter(order => 
              order.status.toLowerCase() === "canceled" || 
              order.status.toLowerCase() === "returned"
            ).map((order, index) => {
              const productImages = order.cartProducts.slice(0, 4).map(item => item.productId.mainSrc);
              const imageCount = productImages.length;
              
              return (
                <Card key={index} className="w-full">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 overflow-hidden rounded-md">
                        {imageCount === 1 && (
                          <img
                            src={productImages[0]}
                            alt="Product"
                            className="w-full h-full object-cover"
                          />
                        )}
                        
                        {imageCount === 2 && (
                          <div className="grid grid-cols-2 w-full h-full">
                            {productImages.map((src, index) => (
                              <img
                                key={index}
                                src={src}
                                alt={`Product ${index}`}
                                className="w-full h-full object-cover"
                              />
                            ))}
                          </div>
                        )}
                        
                        {(imageCount === 3 || imageCount === 4) && (
                          <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-0.5">
                            {productImages.map((src, index) => (
                              <img
                                key={index}
                                src={src}
                                alt={`Product ${index}`}
                                className="w-full h-full object-cover"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sm">
                          {joinTitlesWithOverallLimit(order.cartProducts.map(item => item.productId.title))}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Commande {order._id.slice(0, 9).toUpperCase()}
                        </p>
                        <Button
                          size="sm"
                          variant="flat"
                          color={order.status.toLowerCase() === "returned" ? "warning" : "danger"}
                          className="mt-1 px-2 py-1 h-auto min-h-0"
                        >
                          {order.status.toUpperCase()}
                        </Button>
                        <p className="text-sm text-gray-500 mt-1">
                          Le {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <a href="#" className="text-blue-500 hover:underline">
                        Détails
                      </a>
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <EmptyCard />
          )}
        </div>
      );

      const UpcomingOrders = () => (
        <div className="space-y-4">
          {orders.filter(order => 
            order.status.toLowerCase() === "upcoming" || 
            order.status.toLowerCase() === "delivered"
          ).length > 0 ? (
            orders.filter(order => 
              order.status.toLowerCase() === "upcoming" || 
              order.status.toLowerCase() === "delivered"
            ).map((order, index) => {
              const productImages = order.cartProducts.slice(0, 4).map(item => item.productId.mainSrc);
              const imageCount = productImages.length;
              
              return (
                <Card key={index} className="w-full">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 overflow-hidden rounded-md">
                        {imageCount === 1 && (
                          <img
                            src={productImages[0]}
                            alt="Product"
                            className="w-full h-full object-cover"
                          />
                        )}
                        
                        {imageCount === 2 && (
                          <div className="grid grid-cols-2 w-full h-full">
                            {productImages.map((src, index) => (
                              <img
                                key={index}
                                src={src}
                                alt={`Product ${index}`}
                                className="w-full h-full object-cover"
                              />
                            ))}
                          </div>
                        )}
                        
                        {(imageCount === 3 || imageCount === 4) && (
                          <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-0.5">
                            {productImages.map((src, index) => (
                              <img
                                key={index}
                                src={src}
                                alt={`Product ${index}`}
                                className="w-full h-full object-cover"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sm">
                          {joinTitlesWithOverallLimit(order.cartProducts.map(item => item.productId.title))}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Commande {order._id.slice(0, 9).toUpperCase()}
                        </p>
                        <Button
                          size="sm"
                          variant="flat"
                          color={order.status.toLowerCase() === 'delivered' ? 'success' : 'warning'}
                          className="mt-1 px-2 py-1 h-auto min-h-0"
                        >
                          {order.status.toUpperCase()}
                        </Button>
                        <p className="text-sm text-gray-500 mt-1">
                          Le {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <a href="#" className="text-blue-500 hover:underline">
                        Détails
                      </a>
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <EmptyCard />
          )}
        </div>
      );
      
    
    return(
        <div className="w-full grid grid-cols-4 gap-6 px-8 py-8">
            <div className="col-span-1">
                <SideBar />
            </div>

            <div className="col-span-3">
                <div className="w-full p-4 rounded-md bg-gray-100">
                    <h1 className="text-xl font-medium mb-6">Vos commandes</h1>
                    
                    <div>
                        <div className="w-full">
                            <Card className="w-full mb-6">
                                <div className="flex">
                                <Button
                                    className={`flex-1 rounded-none ${activeTab === 'current' ? 'text-[#E74683] border-b-2 border-[#E74683]' : 'text-gray-500'}`}
                                    variant="light"
                                    onClick={() => setActiveTab('current')}
                                    disableAnimation
                                >
                                    EN COURS/LIVRÉES ({orders.filter(order => 
                                      order.status.toLowerCase() === "upcoming" || 
                                      order.status.toLowerCase() === "delivered"
                                    ).length})
                                </Button>
                                <Button
                                    className={`flex-1 rounded-none ${activeTab === 'canceled' ? 'text-[#E74683] border-b-2 border-[#E74683]' : 'text-gray-500'}`}
                                    variant="light"
                                    onClick={() => setActiveTab('canceled')}
                                    disableAnimation
                                >
                                    ANNULÉES/RETOURNÉES ({orders.filter(order => 
                                      order.status.toLowerCase() === "canceled" || 
                                      order.status.toLowerCase() === "returned"
                                    ).length})
                                </Button>
                                </div>
                            </Card>
                            
                            {activeTab === 'current' ? <UpcomingOrders /> : <CanceledOrders />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



 

  

    
