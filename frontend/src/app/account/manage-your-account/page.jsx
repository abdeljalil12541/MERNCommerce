"use client";
import SideBar from "../../../components/SideBar"
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function ManageAccount() {
  const [formData, setFormData] = useState({
    name: 'chkir abdeljalil',
    email: 'abdorca534@gmail.com',
    address: {
      name: 'chkir abde',
      street: 'rue165, num31',
      city: 'CASABLANCA - Ben Msick, Grand Casablanca',
      phone: '+212 617455647'
    },
    password: {
      current: '12345678',
      new: '',
      confirm: ''
    }
  });

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    console.log(`${formType} form submitted:`, formType === 'password' ? formData.password : formData);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="w-full grid grid-cols-4 gap-6 px-8 py-8">
      <div className="col-span-1">
        <SideBar />
      </div>

      <div className="col-span-3">
        <div className="w-full p-4 rounded-md bg-gray-100">
          <h1 className="text-xl font-medium mb-6">Gérez votre Compte</h1>
          
          <div className="space-y-6">
            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information Card */}
              <Card className="w-full relative">
                <CardHeader className="border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Informations Personnelles</h2>
                </CardHeader>
                <CardBody>
                  <form onSubmit={(e) => handleSubmit(e, 'personal')} className="space-y-4">
                    <Input
                      label="Nom"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="bordered"
                      className="w-full"
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="bordered"
                      className="w-full"
                    />
                    <div className="left-0 right-0 bottom-3 px-3 absolute">
                      <Button 
                        type="submit"
                        color="primary"
                        className="w-full"
                      >
                        Modifier les informations
                      </Button>
                    </div>
                  </form>
                </CardBody>
              </Card>

              {/* Password Change Card */}
              <Card className="w-full">
                <CardHeader className="border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Changer le mot de passe</h2>
                </CardHeader>
                <CardBody>
                  <form onSubmit={(e) => handleSubmit(e, 'password')} className="space-y-4">
                    <Input
                      label="Mot de passe actuel"
                      name="password.current"
                      type="password"
                      value={formData.password.current}
                      onChange={handleChange}
                      variant="bordered"
                      className="w-full"
                    />
                    <Input
                      label="Nouveau mot de passe"
                      name="password.new"
                      type="password"
                      value={formData.password.new}
                      onChange={handleChange}
                      variant="bordered"
                      className="w-full"
                    />
                    <Input
                      label="Confirmer le nouveau mot de passe"
                      name="password.confirm"
                      type="password"
                      value={formData.password.confirm}
                      onChange={handleChange}
                      variant="bordered"
                      className="w-full"
                    />
                    <Button 
                      type="submit"
                      color="primary"
                      className="w-full"
                    >
                      Changer le mot de passe
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </div>

              {/* Address Card */}
              <Card className="w-full hidden">
                <CardHeader className="border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Adresse</h2>
                </CardHeader>
                <CardBody>
                  <form onSubmit={(e) => handleSubmit(e, 'address')} className="space-y-4">
                    <Input
                      label="Nom d'adresse"
                      name="address.name"
                      value={formData.address.name}
                      onChange={handleChange}
                      variant="bordered"
                      className="w-full"
                    />
                    <Input
                      label="Rue"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleChange}
                      variant="bordered"
                      className="w-full"
                    />
                    <Input
                      label="Ville"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      variant="bordered"
                      className="w-full"
                    />
                    <Input
                      label="Téléphone"
                      name="address.phone"
                      value={formData.address.phone}
                      onChange={handleChange}
                      variant="bordered"
                      className="w-full"
                    />
                    <Button 
                      type="submit"
                      color="primary"
                      className="w-full"
                    >
                      Modifier l'adresse
                    </Button>
                  </form>
                </CardBody>
              </Card>
            
          </div>
        </div>
      </div>
    </div>
  );
}