"use client";
import SideBar from "../../../components/SideBar"
import React, { useState } from 'react';
import { Card, Button, Divider, CardHeader } from '@nextui-org/react';
import { ImageIcon, Package, Star } from 'lucide-react';
import { CardContent } from "@mui/material";
import { Rating } from 'react-simple-star-rating'
import EmptyStars from "@/components/EmptyStars";
import dynamic from 'next/dynamic';
const ReactStars = dynamic(() => import("react-stars"), { ssr: false });


export default function AccountOrders() {
  const hasPendingReviews = false;

  const reviews = [
    {
      id: 1,
      productName: "Nike Air Max 270 - White",
      purchaseDate: "15 Jan 2024",
      reviewDate: "20 Jan 2024",
      rating: 4,
      comment: "These shoes are incredibly comfortable and stylish! The Air unit provides excellent cushioning for daily wear. Perfect fit after a few days of breaking in.",
      image: "https://mrbeast.store/cdn/shop/files/crop_0002_138.jpg?v=1739802087&width=1445",
      reviewer: "Alex D.",
      verifiedPurchase: true
    },
    {
      id: 2,
      productName: "Samsung Galaxy A54",
      purchaseDate: "10 Jan 2024",
      reviewDate: "18 Jan 2024",
      rating: 5,
      comment: "Amazing phone for the price point. Camera quality is exceptional and battery life is outstanding. Very happy with this purchase!",
      image: "https://mrbeast.store/cdn/shop/files/crop_0002_138.jpg?v=1739802087&width=1445",
      reviewer: "Sarah M.",
      verifiedPurchase: true
    },
    {
      id: 3,
      productName: "Logitech MX Master 3",
      purchaseDate: "12 Jan 2024",
      reviewDate: "16 Jan 2024",
      rating: 3,
      comment: "Best mouse I've ever used. The ergonomics are perfect and the customization options are extensive. Great for productivity.",
      image: "https://mrbeast.store/cdn/shop/files/crop_0002_138.jpg?v=1739802087&width=1445",
      reviewer: "Mike R.",
      verifiedPurchase: true
    }
  ];
    
    return(
        <div className="w-full grid grid-cols-4 gap-6 px-8 py-8">
            <div className="col-span-1">
                <SideBar />
            </div>

            <div className="col-span-3">
                <div className="w-full p-4 rounded-md bg-gray-100">
                  <h1 className="text-xl font-medium mb-6">{reviews.length > 0 ? 'Avis publiés' : 'Vos avis en attente'}</h1>
                  {!reviews.length > 0 ? (
                    <div className="w-full max-w-4xl mx-auto p-6">
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-pink-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-[#E74683]" />
                      </div>
                      <h2 className="text-xl font-medium mb-4">
                        Vous n'avez aucune commande en attente d'évaluation
                      </h2>
                      <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                        Après la livraison de vos produits, vous pourrez les évaluer. Vos commentaires seront publiés sur la page produit pour aider tous les utilisateurs de Jumia à bénéficier de la meilleure expérience d'achat.
                      </p>
                      <Button color="primary">
                        Poursuivre vos achats
                      </Button>
                    </div>
                  </div>
                  ):(
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reviews.map((review) => (
                      <Card key={review.id} className="h-full">
                      <CardHeader className="space-y-2">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 flex-shrink-0">
                            <img
                              src={review.image}
                              alt={review.productName}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-grow">
                            <h2 className="text-base font-semibold mb-1 line-clamp-1">{review.productName}</h2>
                            <div className="flex items-center relative gap-1 -mt-2">
                              <ReactStars value={review.rating} edit={false} count={5} className="!flex" size={22} />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-600">{review.reviewer}</span>
                              {review.verifiedPurchase && (
                                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                                  Verified
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                
                      <CardContent className="space-y-3">
                        <div className="text-xs text-gray-600">
                          <div>Purchased: {review.purchaseDate}</div>
                          <div>Reviewed: {review.reviewDate}</div>
                        </div>
                        
                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                          {review.comment}
                        </p>
                        
                        <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t">
                          <button className="hover:text-gray-700">
                            Helpful?
                          </button>
                          <button className="hover:text-gray-700">
                            Report
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                    ))}
                  </div>
                  )}
                      
                  
                </div>
            </div>
        </div>
    );
}



 

  

    
