"use client";
import SideBar from "../../../components/SideBar"
import React, { useEffect, useState } from 'react';
import { Card, Button, Divider, CardHeader } from '@nextui-org/react';
import { ImageIcon, Package, Star } from 'lucide-react';
import { CardContent } from "@mui/material";
import dynamic from 'next/dynamic';
import api from "@/lib/api";
import Loader from "@/components/Loader";
import Link from "next/link";

const ReactStars = dynamic(() => import("react-stars"), { ssr: false });

export default function AccountOrders() {
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loader, setLoader] = useState(true);

 // First fetch the user data
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in');
      }
      
      const response = await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('user id in reviews page: ', response.data);
      setUserId(response.data.id);
    } catch (err) {
      console.log('Error fetching user data:', err?.message);
      return;
    }
  };
  fetchUserData();
}, []);

// Then fetch reviews ONLY when userId is available
useEffect(() => {
  // Only proceed if userId is available
  if (!userId) return;
  
  const fetchReviews = async () => {
    try {
      // Use POST request with userId in the request body, matching your order implementation
      const response = await api.post('/reviews/get-reviews', { userId });
      console.log('review response: ', response.data.reviews);
      
      // Handle the reviews data - flatten if needed
      const fetchedReviews = response.data.reviews.flat();
      setReviews(fetchedReviews);
    } catch (err) {
      console.log('error fetching reviews objects: ', err?.message);
    } finally {
      setLoader(false);
    }
  };
  
  fetchReviews();
}, [userId]);

    
    return(
        <div className="w-full grid grid-cols-4 gap-6 px-8 py-8">
          {loader && <Loader /> }
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
                      <Link href={'/'}>
                        <Button color="primary">
                          Poursuivre vos achats
                        </Button>
                      </Link>
                    </div>
                  </div>
                  ):(
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reviews?.map((review, index) => (
                      <Card key={index} className="h-full flex flex-col">
                        <CardHeader className="space-y-2">
                          <div className="flex items-start gap-4">
                            <div className="w-20 h-20 flex-shrink-0">
                              <img
                                src={review.product.mainSrc}
                                alt={review.product.title}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div className="flex-grow">
                              <h2 className="text-base font-semibold mb-1 line-clamp-1">{review.product.title}</h2>
                              <div className="flex items-center relative gap-1 -mt-2">
                                <ReactStars value={review.reviewCount} edit={false} count={5} className="!flex" size={22} />
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-600">{review.user.username}</span>
                                {review.verifiedPurchase && (
                                  <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                                    Verified
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                  
                        <CardContent className="flex flex-col flex-grow justify-between">
    <div>
      <div className="text-xs text-gray-600">
        <div>Reviewed: {new Date(review.product.createdAt).toLocaleDateString()}</div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mt-2">
        {review.reviewDescription}
      </p>
    </div>
                          
                          <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t mt-4">
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



 

  

    
