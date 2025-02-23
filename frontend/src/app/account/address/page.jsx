"use client";
import SideBar from "../../../components/SideBar"
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function EditAddress() {
  const [formData, setFormData] = useState({
    address: {
      name: 'chkir abde',
      street: 'rue165, num31',
      city: 'CASABLANCA - Ben Msick, Grand Casablanca',
      postalCode: '20020',
      phone: '+212 617455647'
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Address form submitted:', formData.address);
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
          <h1 className="text-xl font-medium mb-6">Modifier votre adresse</h1>
          
          <div className="w-full">
            <Card className="w-full">
              <CardHeader className="border-b border-gray-200">
                <h2 className="text-lg font-semibold">Adresse</h2>
              </CardHeader>
              <CardBody className="pb-16">
                <form onSubmit={handleSubmit} className="relative h-full">
                  <div className="space-y-4">
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
                      className="w-full focus:border-pink-600"
                    />
                    <Input
                        label="Code Postal"
                        name="postalCode"
                        value={formData.address.postalCode}
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
                  </div>
                </form>
              </CardBody>
              <CardFooter className="-mt-14">
                <Button 
                    type="submit"
                    color="primary"
                    className="w-full"
                >
                    Modifier l'adresse
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}