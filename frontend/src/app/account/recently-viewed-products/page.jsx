"use client";
import SideBar from "../../../components/SideBar"
import React from 'react';
import { Heart } from 'lucide-react';
import { Button, Card } from '@nextui-org/react';

export default function RecentlyViewedProducts() {
    const products = [
        {
          id: 1,
          name: "Mizuno Chaussure Course Homme WAVE ULTIMA",
          price: "1,195.00 Dhs",
          rating: 5,
          reviewCount: 6,
          image: "https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946",
          badge: null
        },
        {
          id: 2,
          name: "A2 HOME Tapis de prière Al Makam noir",
          price: "99.00 Dhs",
          originalPrice: "135.00 Dhs",
          discount: "-27%",
          image: "https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946",
          badge: "Offre Ramadan",
          shopType: "Boutique Officielle"
        },
        {
          id: 3,
          name: "Adidas Chaussure Grand Court TD Lifestyle Court Casual - Noir",
          price: "449.00 Dhs",
          originalPrice: "770.00 Dhs",
          discount: "-42%",
          rating: 5,
          reviewCount: 16,
          image: "https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946",
          badge: "Boutique Officielle",
        },
        {
          id: 4,
          name: "Set de 2 Plats rectangulaires en céramique (2 tailles)",
          price: "49.00 Dhs",
          originalPrice: "110.00 Dhs",
          discount: "-55%",
          image: "https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946",
          badge: "Offre Ramadan"
        },
        {
          id: 5,
          name: "NIVEA Trousse pour elle: LABELLO Baume à lèvres, Fruit Shine",
          price: "161.00 Dhs",
          originalPrice: "190.00 Dhs",
          discount: "-15%",
          image: "https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946",
          badge: "Boutique Officielle",
        },
        {
          id: 6,
          name: "Kenz Bouilloire Electrique élégant 1.8L 1500W BG1500/",
          price: "85.00 Dhs",
          originalPrice: "199.00 Dhs",
          discount: "-57%",
          rating: 4,
          reviewCount: 103,
          image: "https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946",
          badge: "Happy Hour",
        }
      ];
      
    
    return(
        <div className="w-full grid grid-cols-4 gap-6 px-8 py-8">
            <div className="col-span-1">
                <SideBar />
            </div>

            <div className="col-span-3">
                <div className="w-full p-4 rounded-md bg-gray-100">
                    <h1 className="text-xl font-medium mb-6">Produits vus récemment</h1>
                    
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {products.map((product) => (
                            <Card key={product.id} className="w-full">
                                <div className="h-full flex flex-col">
                                {/* Product Image Container */}
                                <div className="relative">
                                    {product.badge && (
                                    <span className={`absolute top-2 left-2 text-xs px-2 py-1 rounded z-10 ${
                                        product.badge === 'Offre Ramadan' ? 'bg-purple-600 text-white' :
                                        product.badge === 'Vente Flash' ? 'bg-orange-500 text-white' :
                                        product.badge === 'Happy Hour' ? 'bg-green-500 text-white' :
                                        'bg-blue-600 text-white'
                                    }`}>
                                        {product.badge}
                                    </span>
                                    )}
                                    <button className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white">
                                        <Heart className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full aspect-square object-cover"
                                    />
                                </div>

                                {/* Product Info Container */}
                                <div className="p-3 flex flex-col flex-grow">
                                    {product.shopType && (
                                    <div className="text-xs text-blue-600 mb-1">{product.shopType}</div>
                                    )}
                                    
                                    <h3 className="text-sm mb-1 line-clamp-2">{product.name}</h3>
                                    
                                    <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">{product.price}</span>
                                    {product.originalPrice && (
                                        <>
                                        <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                                        <span className="text-xs text-orange-500">{product.discount}</span>
                                        </>
                                    )}
                                    </div>

                                    {product.rating && (
                                    <div className="flex items-center gap-1">
                                        <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`text-xs ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                                ★
                                            </span>
                                        ))}
                                        </div>
                                        <span className="text-xs text-gray-500">({product.reviewCount})</span>
                                    </div>
                                    )}

                                    {product.expressDelivery && (
                                    <div className="mt-1">
                                        <img src="/api/placeholder/60/20" alt="Jumia Express" className="h-4" />
                                    </div>
                                    )}

                                    {/* Add to Cart Button - Initially Hidden */}
                                    <div className="mt-auto pt-3">
                                    <Button color="primary" className="w-full py-2 px-4 rounded text-sm font-medium ">
                                        Ajouter au panier
                                    </Button>
                                    </div>
                                </div>
                                </div>
                            </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



 

  

    
