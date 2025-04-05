"use client"; // Add this for client-side rendering in Next.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from "../../../components/SideBar";
import { Card, CardHeader, CardBody, Button, Divider, Avatar } from '@nextui-org/react';
import { Edit, CreditCard, Mail, Home, User } from 'lucide-react';
import Loader from '@/components/Loader';

export default function AccountIndex() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    creditBalance: '0.00 Dhs',
    address: {
      name: '',
      street: '',
      city: '',
      postalCode: '',
      phone: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found, please log in');
        }

        console.log('Fetching user data with token:', token);
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Response data:', response.data);
        setUserInfo(prev => ({
          ...prev,
          name: response.data.username || prev.name,
          email: response.data.email || prev.email,
          address: {
            ...prev.address,
            name: response.data.addresses?.[0]?.name || prev.address.name,
            street: response.data.addresses?.[0]?.street || prev.address.street,
            city: response.data.addresses?.[0]?.city || prev.address.city,
            postalCode: response.data.addresses?.[0]?.postalCode || prev.address.postalCode,
            phone: response.data.addresses?.[0]?.phone || prev.address.phone
          }
        }));
      } catch (err) { // No type annotation
        console.log('Axios error:', err.response || err);
        setError(
          err.response?.data?.message || err.message || 'An error occurred while fetching user data'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="w-full h-[100vh] grid grid-cols-4 gap-6 px-8 py-8">
      <div className="col-span-1">
        <SideBar />
      </div>

      <div className="col-span-3">
        <div className="w-full p-4 rounded-md bg-gray-100">
          <h1 className="text-xl font-medium mb-6">Votre compte</h1>
          
          {error && (
            <div className="mb-4 text-center text-red-500">Error: {error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <h2 className="text-md uppercase font-medium text-gray-700">
                  Informations Personnelles
                </h2>
              </CardHeader>
              <CardBody className="pt-2">
                <div className="mb-1">
                  <p className="font-medium">{userInfo.name}</p>
                  <p className="text-sm text-gray-500">{userInfo.email}</p>
                </div>
                <div className="mt-4">
                  <Button 
                    as="a"
                    size="sm" 
                    color="primary" 
                    variant="light"
                    href="#"
                    className="px-2 font-normal"
                    endContent={<Edit size={16} className="ml-1" />}
                  >
                    Modifier les informations
                  </Button>
                </div>
              </CardBody>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2 flex relative justify-between">
                <h2 className="text-md uppercase font-medium text-gray-700">
                  Adresses
                </h2>
                  <Button 
                    as="a"
                    size="sm" 
                    color="primary" 
                    variant="light"
                    href="#"
                    className="bg-none font-normal absolute right-1"
                  >
                    <Edit size={16} />
                  </Button>
              </CardHeader>
              <CardBody className="pt-2">
                <p className="text-sm font-medium">Adresse par défaut :</p>
                <div className="text-sm">{userInfo.address.name}</div>
                <div className="text-sm">{userInfo.address.street}</div>
                <div className="text-sm">{userInfo.address.city}</div>
                <div className="text-sm">{userInfo.address.postalCode}</div>
                <div className="text-sm text-gray-500">{userInfo.address.phone}</div>
              </CardBody>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <h2 className="text-md uppercase font-medium text-gray-700">
                  Crédit Jumia
                </h2>
              </CardHeader>
              <CardBody className="pt-2">
                <div className="flex items-center">
                  <CreditCard size={18} className="text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Solde de crédit Jumia:</p>
                    <p className="font-medium">{userInfo.creditBalance}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <h2 className="text-md uppercase font-medium text-gray-700">
                  Préférences de Communication
                </h2>
              </CardHeader>
              <CardBody className="pt-2">
                <div className="mb-3">
                  <p className="text-sm">
                    Gérez vos communications par e-mail pour rester informé des dernières nouvelles et offres.
                  </p>
                </div>
                <Button 
                  as="a"
                  size="sm" 
                  variant="light"
                  color="primary"
                  href="#" 
                  className="px-0 font-normal"
                  endContent={<Mail size={16} className="ml-1" />}
                >
                  Modifier les préférences de communication
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      {loading && 
        <Loader />
      }
    </div>
  );
}