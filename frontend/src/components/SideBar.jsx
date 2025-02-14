"use client";
import { Button } from '@nextui-org/react';
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
  
  export default function SideBar() {
    const [activeItem, setActiveItem] = useState(null);
    
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
          <Button variant='faded' color='danger' className="py-6 border-none rounded-none w-full flex items-center justify-center font-medium">
            <LogOut size={16} />
            <span>Déconnexion</span>
          </Button>
        </div>
      </div>
    );
  }