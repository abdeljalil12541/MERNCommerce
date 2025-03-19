"use client";
import api from '@/lib/api';
import { Button } from '@nextui-org/react';
import axios from 'axios';
import { 
    User, 
    Package, 
    Mail, 
    MessageSquare, 
    Ticket, 
    Heart, 
    Store, 
    Clock, 
    Settings, 
    MapPin, 
    Bell, 
    LogOut
  } from 'lucide-react';
  import { useState } from 'react';
  import Swal from 'sweetalert2';
  import Loader from './Loader';
import { useRouter } from 'next/navigation';
  
  export default function SideBar() {
    const [activeItem, setActiveItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    
    const menuItems = [
      { icon: <User size={18} />, text: "Votre compte Jumia" },
      { icon: <Package size={18} />, text: "Vos commandes" },
      { icon: <Mail size={18} />, text: "Boîte de réception" },
      { icon: <MessageSquare size={18} />, text: "Vos avis en attente" },
      { icon: <Ticket size={18} />, text: "Bons d'achat" },
      { icon: <Heart size={18} />, text: "Favoris" },
      { icon: <Store size={18} />, text: "Vendeurs suivis" },
      { icon: <Clock size={18} />, text: "Vus récemment" },
    ];
    
    const accountSettings = [
      { icon: <Settings size={16} />, text: "Gérez votre Compte" },
      { icon: <MapPin size={16} />, text: "Adresses" },
      { icon: <Bell size={16} />, text: "Préférences de communication" },
    ];
    

    const logOut = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        console.log('Token sent to backend:', token);
  
        // if (!token) {
        //   throw new Error('No token found in localStorage');
        // }
  
        // const response = await axios.post(
        //   'http://localhost:5000/api/users/logout',
        //   {},
        //   {
        //     headers: { Authorization: `Bearer ${token}` },
        //     withCredentials: true, // Keep this if using credentials
        //   }
        // );
        // console.log('Backend response:', response.data);
  
        localStorage.removeItem('token');
        Toast.fire({
          icon: "success",
          title: "Logged out successfully",
        });
        router.push('/login');
      } catch (error) {
        console.error('Error while logging out...', error);
        console.error('Error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
          config: error.config,
        });
        Toast.fire({
          icon: "error",
          title: "Failed to log out",
        });
      } finally {
        setLoading(false);
      }
    };
    
    return (
      <div className="w-full bg-gray-100 rounded-md shadow-sm">
        {/* Menu items with icons */}
        <ul className="px-2 py-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full flex items-center py-2 px-3 my-1 hover:bg-gray-200 rounded-md text-left ${
                  activeItem === index ? 'bg-gray-200' : ''
                }`}
                onClick={() => setActiveItem(index)}
              >
                <span className="mr-3 text-gray-600">{item.icon}</span>
                <span className="text-sm text-gray-700">{item.text}</span>
              </button>
            </li>
          ))}
        </ul>
        
        {/* Divider */}
        <div className="border-t border-gray-300 my-2"></div>
        
        {/* Account settings */}
        <ul className="px-2 py-1">
          {accountSettings.map((item, index) => (
            <li key={index}>
              <button
                className="w-full flex items-center text-left py-2 px-3 my-1 hover:bg-gray-200 rounded-md"
              >
                <span className="mr-3 text-gray-600">{item.icon}</span>
                <span className="text-sm text-gray-700">{item.text}</span>
              </button>
            </li>
          ))}
        </ul>
        
        <div className="border-t border-gray-300 mt-2"></div>
        
        {/* Logout button */}
        <div>
          <Button onPress={logOut} variant='faded' color='danger' className="py-6 border-none rounded-none w-full flex items-center justify-center font-medium">
            <LogOut size={16} />
            <span>Déconnexion</span>
          </Button>
        </div>

        {loading && 
          <Loader />
        }
      </div>
    );
  }