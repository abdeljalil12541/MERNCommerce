"use client";
import SideBar from "../../../components/SideBar"
import React, { useState } from 'react';
import { Card, Button, Divider } from '@nextui-org/react';
import { Package } from 'lucide-react';

export default function AccountOrders() {
    const [activeTab, setActiveTab] = useState('canceled');

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
    
      const CanceledOrders = () => (
        <div className="space-y-4">
          {canceledOrdersProducts.length > 0 ? 
          (canceledOrdersProducts.map((order) => (
            <Card key={order.id} className="w-full">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={order.image} 
                    alt={order.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium text-sm">{order.name}</h3>
                    <p className="text-sm text-gray-500">Commande {order.id}</p>
                    <Button 
                      size="sm" 
                      variant="flat" 
                      color={order.status === 'ANNULÉE' ? 'danger' : 'warning'}
                      className="mt-1 px-2 py-1 h-auto min-h-0"
                    >
                      {order.status}
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">{order.date}</p>
                  </div>
                </div>
                <div className="text-sm">
                    <a href="#" className="text-blue-500 hover:underline">Détails</a>
                </div>
              </div>
            </Card>
          ))) : ( <EmptyCard /> )}
        </div>
      );

      const UpcomingOrders = () => (
        <div className="space-y-4">
          {upcomingOrdersProducts.length > 0 ? 
          (upcomingOrdersProducts.map((order) => (
            <Card key={order.id} className="w-full">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={order.image} 
                    alt={order.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium text-sm">{order.name}</h3>
                    <p className="text-sm text-gray-500">Commande {order.id}</p>
                    <Button 
                      size="sm" 
                      variant="flat" 
                      color={order.status === 'ANNULÉE' ? 'danger' : 'warning'}
                      className="mt-1 px-2 py-1 h-auto min-h-0"
                    >
                      {order.status}
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">{order.date}</p>
                  </div>
                </div>
                <div className="text-sm">
                    <a href="#" className="text-blue-500 hover:underline">Détails</a>
                </div>
              </div>
            </Card>
          ))) : ( <EmptyCard /> )}
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
                                    EN COURS/LIVRÉES (0)
                                </Button>
                                <Button
                                    className={`flex-1 rounded-none ${activeTab === 'canceled' ? 'text-[#E74683] border-b-2 border-[#E74683]' : 'text-gray-500'}`}
                                    variant="light"
                                    onClick={() => setActiveTab('canceled')}
                                    disableAnimation
                                >
                                    ANNULÉES/RETOURNÉES (4)
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



 

  

    
