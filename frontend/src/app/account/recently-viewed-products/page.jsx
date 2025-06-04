"use client";
import SideBar from "../../../components/SideBar"
import React, {useEffect, useState} from 'react';
import { Heart } from 'lucide-react';
import { Button, Card } from '@nextui-org/react';
import api from "@/lib/api";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function RecentlyViewedProducts() {
  const [userId, setUserId] = useState(null);
  const [loader, setLoader] = useState(true);
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await api.get('/users/me')
            console.log('response: ', response.data);
            setUserId(response.data.id);
        } catch (err) {
            console.log('error response: ', err.response || err);
        } finally {
            setLoader(false);
        }
    }
        fetchUserData();
    }, [])

    useEffect(() => {
        const fetchRecentlyVPItems = async () => {
            if (!userId) {
                console.log('userId not available yet, skipping recently viewed products fetch');
                return;
            }
            
            try {
                const response = await api.post('/history/get-recently-viewed-products', { 
                    userId, 
                })
                setRecentlyViewedItems(response.data.recentlyViewedProducts || []);
                console.log('fetchRecentlyVP items: ', response.data.recentlyViewedProducts);
            } catch (err) {
                console.log('error fetching reventlyVP items: ', err?.message)
            }
        }
        fetchRecentlyVPItems();
    }, [userId])
      
    
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
                    <h1 className="text-xl font-medium mb-6">Produits vus récemment</h1>
                    
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {recentlyViewedItems.map((item) => (
                            <Card key={item._id} className="w-full">
                                <div className="h-full flex flex-col">
                                {/* Product Image Container */}
                                <div className="relative">
                                    {item.product.category && (
                                    <span className="absolute top-2 left-2 text-xs px-2 py-1 rounded z-10 bg-blue-600 text-white">
                                        {item.product.category.name}
                                    </span>
                                    )}
                                    <img
                                    src={item.product.mainSrc}
                                    alt={item.product.title}
                                    className="w-full aspect-square object-cover"
                                    />
                                </div>

                                {/* Product Info Container */}
                                <div className="p-3 flex flex-col flex-grow">
                                    {item.shopType && (
                                    <div className="text-xs text-blue-600 mb-1">{item.shopType}</div>
                                    )}
                                    
                                    <h3 className="text-sm mb-1 line-clamp-2">{item.product.title}</h3>
                                    
                                    <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">${item.product.currentPrice}</span>
                                    {item.product.regularPrice && (
                                        <>
                                        <span className="text-xs text-gray-500 line-through">${item.product.regularPrice}</span>
                                        <span className="text-xs text-[#E74683]">-{item.product.discount}%</span>
                                        </>
                                    )}
                                    </div>

                                    

                                    {/* Add to Cart Button - Initially Hidden */}
                                    <div className="mt-auto pt-3">
                                    <Link  href={`/products/${item.product.slug}`}>
                                        <Button onPress={() => {setLoader(true)}} color="primary" className="w-full py-2 px-4 rounded text-sm font-medium ">
                                            Go to Cart
                                        </Button>
                                    </Link>
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



 

  

    
