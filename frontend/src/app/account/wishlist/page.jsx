"use client";
import SideBar from "../../../components/SideBar"
import React from 'react';
import { Button } from '@nextui-org/react';

export default function Wishlist() {
    const products = [
        {
          id: 1,
          name: "Sweat pour Hommes - Noir",
          attributes: { Taille: "M" },
          currentPrice: "98.00 Dhs",
          originalPrice: "250.00 Dhs",
          discount: "-61%",
          image: "https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946"
        },
        {
          id: 2,
          name: "Set de 2 Plats rectangulaires en céramique (2 tailles) ( 20.5/11cm ) ( 25/12cm )",
          currentPrice: "49.00 Dhs",
          originalPrice: "110.00 Dhs",
          discount: "-55%",
          image: "https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946"
        }
      ];
      
    
    return(
        <div className="w-full grid grid-cols-4 gap-6 px-8 py-8">
            <div className="col-span-1">
                <SideBar />
            </div>

            <div className="col-span-3">
                <div className="w-full p-4 rounded-md bg-gray-100">
                    <h1 className="text-xl font-medium mb-6">Favoris (2)</h1>
                    
                    <div className="w-full space-y-4">
                        {products.map((product) => (
                            <div key={product.id} className="w-full border rounded-lg p-4 flex items-center gap-4 bg-white">
                            <div className="w-20 h-20 flex-shrink-0">
                                <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                            
                            <div className="flex-grow">
                                <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                                {product.attributes && (
                                <div className="mt-1 text-sm text-gray-600">
                                    {Object.entries(product.attributes).map(([key, value]) => (
                                    <span key={key}>{key}: {value}</span>
                                    ))}
                                </div>
                                )}
                                
                                <div className="mt-2 flex items-center gap-2">
                                <span className="text-sm font-medium">{product.currentPrice}</span>
                                <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                                <span className="text-sm text-[#E74683]">{product.discount}</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-2 items-end w-22">
                                <Button color="primary" size="sm" className="text-sm bg-green-500 w-full"> Acheter </Button>
                                <Button color="danger" variant="light" size="sm" className="text-sm w-full" > Supprimer </Button>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}



 

  

    
