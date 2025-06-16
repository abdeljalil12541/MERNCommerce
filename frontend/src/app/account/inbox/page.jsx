'use client';
import { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar"
import { Card, CardBody } from '@nextui-org/react';
import api from "@/lib/api";

export default function AccountIndex() {
    const [inboxes, setInboxes] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loader, setLoader] = useState(true);

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

    const messages = [
        {
          id: 1,
          timeAgo: "il y a 4 jrs",
          statusTitle: "Article(s) annulé(e) ⚠️",
          status: "canceled",
          content: "Le(s) article(s) de votre commande 395712859 a (ont) été annulé(e). Veuillez visiter votre email pour plus d'informations. Si vous avez besoin d'aide pour passer une commande, appelez-nous sur 05 22 04 18 18.",
          product: {
            name: "Bouilloire Electrique élégant 1,8L 1500W BG1500/",
            image: "https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946"
          }
        },
        {
          id: 2,
          timeAgo: "il y a 5 jrs",
          statusTitle: "Livreur en route!",
          status: "upcoming",
          content: "MATRACHE (tel: 0615498994) vous appellera bientôt pour livrer votre colis JE-G4A-395712859-9522 aujourd'hui. Assurez-vous que 107 MAD sont prêts pour le paiement. Il est maintenant possible de payer par carte bancaire lors de la livraison. Veuillez simplement informer le livreur que vous souhaitez effectuer le paiement par carte bancaire.",
          product: {
            name: "Bouilloire Electrique élégant 1,8L 1500W BG1500/",
            image: "https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946"
          }
        },
        {
          id: 3,
          timeAgo: "il y a 3 jrs",
          statusTitle: "Confirmé!",
          status: "confirmed",
          content: "Votre commande 395712859 a été confirmée. Date de livraison prévue entre le 13-02-2025 et 14-02-2025. Pour suivre l'état de votre commande, vous pouvez aller dans la section 'Vos Commandes' dans le menu de votre compte. Nous vous informerons lorsque l'article sera expédié. Nous vous remercions pour votre achat sur Jumia!",
          product: {
            name: "Bouilloire Electrique élégant 1,8L 1500W BG1500/",
            image: "https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946"
        }
        }
      ];

    return(
        <div className="w-full grid grid-cols-4 gap-6 px-8 py-8">
            <div className="col-span-1">
                <SideBar />
            </div>

            <div className="col-span-3">
                <div className="w-full p-4 rounded-md bg-gray-100">
                    <h1 className="text-xl font-medium mb-6">Messages</h1>
                    
                    <div className="w-full space-y-4">
                        {inboxes.map((message) => (
                            <Card key={message._id} className="w-full">
                            <CardBody className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                <div className="text-sm text-gray-500">{getTimeAgo(message?.createdAt)}</div>
                                <div className="text-sm">
                                    <a href="#" className="text-blue-500 hover:underline">Détails</a>
                                </div>
                                </div>
                                
                                <div className="mb-4">
                                <div className="flex items-center gap-2">
                                    <span className={`font-medium 
                                        ${
                                            message.status === 'canceled' && 'text-red-600' ||
                                            message.status === 'upcoming' && 'text-green-600' ||
                                            message.status === 'confirmed' && 'text-green-600'
                                        }
                                    `}>
                                    {message?.statusTitle}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{message?.message}</p>
                                </div>

                            </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}