"use client";
import SideBar from "../../../components/SideBar"
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import api from "@/lib/api";
import Swal from "sweetalert2";
import Loader from "@/components/Loader";

export default function ManageAccount() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: {
      current: '',
      new: '',
      confirm: ''
    }
  });

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Toast = Swal.mixin({
    toast: true,
    width: '400px',
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        console.log("Fetching user data from /me...");
        const response = await api.get("/users/me");
        console.log("Full response from /me:", response.data);

        const userInfo = response.data;
        console.log("Extracted user info:", userInfo);

        if (userInfo) {
          setFormData(prev => ({
            ...prev,
            username: userInfo.username || prev.username,
            email: userInfo.email || prev.email
          }));
          setUserId(userInfo._id);
          console.log("Set userId to:", userInfo._id);
        } else {
          setError("No user data found");
          console.log("No user data available in response");
        }
      } catch (err) {
        console.log("Error fetching user data:", err);
        console.log("Error details:", err.response?.data || err.message);
        setError("Failed to load user data");
        Toast.fire({
          icon: "error",
          title: "Failed to load user data",
        });
      } finally {
        setLoading(false);
        console.log("Fetch complete, state:", { loading, error, userId });
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log("Submitting to /users/me/user-info with data:", {
        username: formData.username,
        email: formData.email
      });
      
      const response = await api.put(`/users/me/user-info/${userId}`, {
        username: formData.username,
        email: formData.email
      });
      
      console.log("update user info response: ", response.data);
      Toast.fire({
        icon: "success",
        title: "User info updated successfully",
      });
    } catch (err) {
      console.log("Error updating user info:", err);
      console.log("Error details:", err.response?.data || err.message);
      
      Toast.fire({
        icon: "error",
        title: "Failed to update user info",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.put(`/users/me/update-password/${userId}`, {
        oldPassword: formData.password.current,
        newPassword: formData.password.new,
        confirmPassword: formData.password.confirm
      });
      
      console.log("update password response: ", response.data);
      Toast.fire({
        icon: "success",
        title: "password updated successfully",
      });
    } catch (err) {
      console.log("Error updating password:", err);
      console.log("Error details:", err.response?.data || err.message);
      
      Toast.fire({
        icon: "error",
        title: "Failed to update password",
      });
    } finally {
      setLoading(false);
    }
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
                  <form onSubmit={handleUpdateUserInfo} className="space-y-4">
                    <Input
                      label="Nom"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      variant="bordered"
                      className="w-full"
                      isDisabled={loading}
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="bordered"
                      className="w-full"
                      isDisabled={loading}
                    />
                    <div className="left-0 right-0 bottom-3 px-3 absolute">
                      <Button 
                        type="submit"
                        color="primary"
                        className="w-full"
                        isDisabled={loading}
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
                  <form onSubmit={(e) => handleUpdatePassword(e)} className="space-y-4">
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
          </div>
        </div>
      </div>
      {loading &&
        <Loader />
      }
    </div>
  );
}
