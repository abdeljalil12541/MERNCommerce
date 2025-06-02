"use client";
import SideBar from "../../../components/SideBar"
import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import api from "@/lib/api";
import Loader from "@/components/Loader";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Wishlist() {
  const [userId, setUserId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loader, setLoader] = useState(true);
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-right",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

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


      useEffect(() => {
        // Only proceed if userId is available
        if (!userId) return;
        
        const fetchWishlist = async () => {
          try {
            // Use POST request with userId in the request body, matching your order implementation
            const response = await api.get(`/wishlist/${userId}`);
            console.log('wishlist response: ', response.data);
            
            // Handle the reviews data - flatten if needed
            const fetchedWishlist = response.data.flat();
            setWishlist(fetchedWishlist);
          } catch (err) {
            console.log('error fetching reviews objects: ', err?.message);
          } finally {
            setLoader(false);
          }
        };
        
        fetchWishlist();
      }, [userId]);


      const removeWishlist = async (product) => {
        setLoader(true);
        try {
          const response = await api.post('/wishlist/remove-from-wishlist', {
            userId,
            product,
          });
          
          console.log('Removed from wishlist:', response);
          
          // Update the local wishlist state by filtering out the removed item
          setWishlist(prevWishlist => 
            prevWishlist.filter(item => item.product._id !== product._id)
          );
          
        } catch (error) {
          console.log('Error removing from wishlist:', error);
          // Optionally show an error message to the user
        } finally {
            setLoader(false);
            Toast.fire({
                icon: "success",
                title: "Removed from wishlist!",
              });
        }
      };
      
    
    return(
        <div className="w-full grid grid-cols-4 gap-6 px-8 py-8">
            {loader && 
                <Loader />
            }
            <div className="col-span-1">
                <SideBar />
            </div>

            <div className="col-span-3">
                <div className="w-full p-4 rounded-md bg-gray-100">
                    <h1 className="text-xl font-medium mb-6">Favoris ({wishlist.length})</h1>
                    
                    <div className="w-full space-y-4">
                        {wishlist.length > 0 ? (
                            wishlist.map((item, index) => (
                                <div key={item._id} className="w-full border rounded-lg p-4 flex items-center gap-4 bg-white">
                                <div className="w-20 h-20 flex-shrink-0">
                                    <img
                                    src={item.product.mainSrc}
                                    alt={item.product.title}
                                    className="w-full h-full object-cover rounded-md"
                                    />
                                </div>
                                
                                <div className="flex-grow">
                                    <h3 className="text-sm font-medium text-gray-800">{item.product.title}</h3>
                                    {item.attributes && (
                                    <div className="mt-1 text-sm text-gray-600">
                                        {Object.entries(item.attributes).map(([key, value]) => (
                                        <span key={key}>{key}: {value}</span>
                                        ))}
                                    </div>
                                    )}
                                    
                                    <div className="mt-2 flex items-center gap-2">
                                    <span className="text-sm font-medium">${item.product.currentPrice}</span>
                                    <span className="text-sm text-gray-500 line-through">${item.product.regularPrice}</span>
                                    <span className="text-sm text-[#E74683]">-{item.product.discount}%</span>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-2 items-end w-22">
                                    <Link href={`/products/${item.product.slug}`}>
                                        <Button color="primary" size="sm" className="text-sm bg-green-500 w-full"> Go to product </Button>
                                    </Link>
                                    <Button onPress={() => removeWishlist(item.product)} color="danger" variant="light" size="sm" className="text-sm w-full">
                                        Supprimer
                                    </Button>                           
                                </div>
                            </div>
                            ))
                        ): (
                            <p className="w-full flex justify-center items-center my-8">no items in wishlist</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}



 

  

    
