'use client';
import { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar"
import { Card, CardBody } from '@nextui-org/react';
import api from "@/lib/api";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

export default function AccountIndex() {
    const [inboxes, setInboxes] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loader, setLoader] = useState(true);
    const router = useRouter();

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
    if (!userId) return;

    const fetchInboxes = async () => {
      try {
        const response = await api.post('/get-inboxes', { userId });
        console.log('inbox response: ', response.data.inboxes);

        // No need to flat() since the backend now returns a flat array
        const fetchedInboxes = (response.data.inboxes || []).flat();
        setInboxes(fetchedInboxes);
      } catch (err) {
        console.log('error fetching inbox objects: ', err?.message);
      } finally {
        setLoader(false);
      }
    };
    fetchInboxes();
  }, [userId]);

  function getTimeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return diffInMinutes <= 1 ? "à l'instant" : `il y a ${diffInMinutes} min`;
      }
      return diffInHours === 1 ? "il y a 1 heure" : `il y a ${diffInHours} heures`;
    }
    
    return diffInDays === 1 ? "il y a 1 jour" : `il y a ${diffInDays} jours`;
  }

  const PassInboxData = (inbox, e) => {
    e.preventDefault();
    try {
      // Store the order data as a JSON string
      sessionStorage.setItem('inboxData', JSON.stringify(inbox));
      console.log('Inbox data stored successfully');
      // Navigate to the order detail page
      router.push(`/account/inbox/${inbox._id.toUpperCase()}`);
    } catch (err) {
      console.log('Error storing inbox data in session storage:', err.message);
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
                    <h1 className="text-xl font-medium mb-6">Messages</h1>
                    
                    <div className="w-full space-y-4">
                      {inboxes.length > 0 ? 
                        inboxes.map((inbox) => (
                          <Card key={inbox._id} className="w-full">
                          <CardBody className="p-4">
                              <div className="flex justify-between items-start mb-2">
                              <div className="text-sm text-gray-500">{getTimeAgo(inbox?.createdAt)}</div>
                                <div 
                                  href={`/account/inbox/${inbox._id}`} 
                                  className="text-blue-500 text-sm hover:underline"
                                  onClick={(e) => PassInboxData(inbox, e)}
                                >
                                    <a href="#" className="text-blue-500 hover:underline">Détails</a>
                                </div>
                              </div>
                              
                              <div className="mb-4">
                              <div className="flex items-center gap-2">
                                  <span className={`font-medium 
                                      ${
                                          inbox.status === 'register' && 'text-green-600' ||
                                          inbox.status === 'orderUpcoming' && 'text-yellow-600' ||
                                          inbox.status === 'upcoming' && 'text-green-600' ||
                                          inbox.status === 'confirmed' && 'text-green-600'
                                      }
                                  `}>
                                  {inbox?.status === 'register' && 'Welcome to Kawaii! Start Shopping!'}
                                  {inbox?.status === 'orderUpcoming' && 'Your order is on the way! 📦'}
                                  </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{inbox?.message}</p>
                              </div>

                          </CardBody>
                          </Card>
                        )) : (
                          <p className="my-4 text-red-500">Inbox is empty</p>
                        )
                      }
                    </div>
                </div>
            </div>
        </div>
    );
}