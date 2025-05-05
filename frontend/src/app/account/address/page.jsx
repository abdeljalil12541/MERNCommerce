"use client";
import SideBar from "../../../components/SideBar";
import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import api from "../../../lib/api.jsx";
import Swal from "sweetalert2";
import Loader from "@/components/Loader";


export default function EditAddress() {
  const [formData, setFormData] = useState({
    address: {
      name: "",
      street: "",
      city: "",
      postalCode: "",
      phone: "",
    },
  });
  const [addressId, setAddressId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Toast = Swal.mixin({
    toast: true,
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

        const userAddresses = response.data.addresses;
        console.log("Extracted addresses:", userAddresses);

        if (userAddresses && userAddresses.length > 0) {
          const defaultAddress = userAddresses[0];
          console.log("Using default address:", defaultAddress);
          setFormData({ address: defaultAddress });
          setAddressId(defaultAddress._id);
          console.log("Set addressId to:", defaultAddress._id);
        } else {
          setError("No address found for this user");
          console.log("No addresses available in response");
        }
      } catch (err) {
        console.log("Error fetching user data:", err);
        console.log("Error details:", err.response?.data || err.message);
        setError("Failed to load user data");
        Toast.fire({
          icon: "error",
          title: "Failed to load address",
        });
      } finally {
        setLoading(false);
        console.log("Fetch complete, state:", { loading, error, addressId });
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log("Submitting to /me/address/", addressId, "with data:", formData.address);
      const response = await api.put(`/users/me/address/${addressId}`, formData.address);
      console.log("Update response:", response.data);
      Toast.fire({
        icon: "success",
        title: "Address updated successfully",
      });
    } catch (err) {
      console.log("Error submitting address:", err);
      console.log("Submit error details:", err.response?.data || err.message);
      Toast.fire({
        icon: "error",
        title: "Failed to update address",
      });
    } finally {
      console.log("Submit complete, form data:", formData.address);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
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
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && addressId && (
                  <form onSubmit={handleSubmit} className="relative h-full">
                    <div className="space-y-4">
                      <Input
                        label="Nom d'adresse"
                        name="address.name"
                        value={formData.address.name}
                        onChange={handleChange}
                        variant="bordered"
                        className="w-full"
                        disabled={loading}
                      />
                      <Input
                        label="Rue"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        variant="bordered"
                        className="w-full"
                        disabled={loading}
                      />
                      <Input
                        label="Ville"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        variant="bordered"
                        className="w-full focus:border-pink-600"
                        disabled={loading}
                      />
                      <Input
                        label="Code Postal"
                        name="address.postalCode"
                        value={formData.address.postalCode}
                        onChange={handleChange}
                        variant="bordered"
                        className="w-full"
                        disabled={loading}
                      />
                      <Input
                        label="Téléphone"
                        name="address.phone"
                        value={formData.address.phone}
                        onChange={handleChange}
                        variant="bordered"
                        className="w-full"
                        disabled={loading}
                      />
                    </div>
                    <div className="mt-6">
                      <Button
                        type="submit"
                        color="primary"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Modifier l'adresse"}
                      </Button>
                    </div>
                  </form>
                )}
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