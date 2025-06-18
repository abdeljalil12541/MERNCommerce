'use client';
import { useEffect, useState } from "react";
import SideBar from "../../../../components/SideBar";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { CheckCircle, User, Bell, Info, Package } from 'lucide-react';
import api from "@/lib/api";

export default function AccountIndex() {
  const [inboxData, setInboxData] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
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
        
        console.log('user id in inboxes page: ', response.data);
        setUsername(response.data.username);
      } catch (err) {
        console.log('Error fetching user data:', err?.message);
        return;
      }
    };
    fetchUserData();
  }, []);

    useEffect(() => {
      try {
        const storedInbox = sessionStorage.getItem('inboxData');
        if (!storedInbox) {
          console.log("No inbox data found, redirecting...");
          router.push("/account");
          return;
        }
  
        const parsedInbox = JSON.parse(storedInbox);
        setInboxData(parsedInbox);
      } catch (err) {
        console.error("Error loading inbox data:", err.message);
      } finally {
        setLoading(false);
      }
    }, []);
  
    if (loading) {
      return <Loader />;
    }
  
    if (!inboxData) {
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold">Aucune donnée trouvée</h2>
        </div>
      );
    }

    

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
  
    const getStatusConfig = (status) => {
      const configs = {
        register: {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          label: 'Inscription'
        },
        orderUpcoming: {
          icon: Package, // or Truck, ShoppingBag, Clock - choose based on your imports
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          label: 'Commande en cours'
        },
        notification: {
          icon: Bell,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          label: 'Notification'
        },
        info: {
          icon: Info,
          color: 'text-indigo-600',
          bgColor: 'bg-indigo-50',
          borderColor: 'border-indigo-200',
          label: 'Information'
        },
        default: {
          icon: User,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          label: 'Général'
        }
      };
      return configs[status] || configs.default;
    };
  
    const statusConfig = getStatusConfig(inboxData.status);
    const StatusIcon = statusConfig.icon;

    return(
        <div className="w-full grid grid-cols-4 gap-6 px-8 py-8">
            <div className="col-span-1">
                <SideBar />
            </div>

            <div className="col-span-3">
                <div className="w-full p-4 rounded-md bg-gray-100">
                    <h1 className="text-xl font-medium mb-6">Messages</h1>
                    
                    <div className="w-full space-y-4">
                      <div className="w-full max-w-2xl mx-auto space-y-4 p-4">
                        <div className={`relative bg-white rounded-xl shadow-lg border-l-4 ${statusConfig.borderColor} overflow-hidden transition-all duration-200 hover:shadow-xl hover:scale-[1.02]`}>
                          {/* Status indicator dot */}
                          <div className="absolute top-4 right-4">
                            <div className={`w-3 h-3 rounded-full ${statusConfig.color.replace('text-', 'bg-')} animate-pulse`}></div>
                          </div>

                          <div className="p-6">
                            {/* Header section */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${statusConfig.bgColor}`}>
                                  <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h3 className="font-semibold text-lg text-gray-900">
                                      {statusConfig.label}
                                    </h3>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig.bgColor} ${statusConfig.color}`}>
                                      {inboxData.status}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">
                                    ID: {inboxData._id.slice(-8).toUpperCase()}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Message content */}
                            <div className="mb-4">
                              <p className="text-gray-700 leading-relaxed">
                                {inboxData.message}
                              </p>
                            </div>

                            {/* Footer with metadata */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <User className="w-4 h-4" />
                                  <span>Utilisateur: {username}</span>
                                </div>
                                {inboxData.updatedAt !== inboxData.createdAt && (
                                  <div className="flex items-center space-x-1">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                    <span>Modifié</span>
                                  </div>
                                )}
                              </div>
                              <div className="text-sm font-medium text-gray-600">
                                {getTimeAgo(inboxData.createdAt)}
                              </div>
                            </div>
                          </div>

                          {/* Subtle gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/5 pointer-events-none"></div>
                        </div>

                        {/* Additional metadata card */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h4 className="font-medium text-gray-800 mb-2">Détails techniques</h4>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-gray-500">Créé le:</span>
                              <p className="font-mono text-gray-700">
                                {new Date(inboxData.createdAt).toLocaleString('fr-FR')}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Mis à jour:</span>
                              <p className="font-mono text-gray-700">
                                {new Date(inboxData.updatedAt).toLocaleString('fr-FR')}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Version:</span>
                              <p className="font-mono text-gray-700">v{inboxData.__v}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">ID complet:</span>
                              <p className="font-mono text-gray-700 text-xs break-all">
                                {inboxData._id}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
}