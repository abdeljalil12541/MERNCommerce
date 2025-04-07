"use client";
import SideBar from "../../../../components/SideBar"
import React, { useEffect, useState } from 'react';
import { RadioGroup, Radio, Checkbox, Button } from "@nextui-org/react";
import api from "@/lib/api";
import Swal from "sweetalert2";
import Loader from "@/components/Loader";

export default function NewsletterPreferences() {
    const [selected, setSelected] = useState("");
    const [acceptPolicy, setAcceptPolicy] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setuserId] = useState(null);
    const [showError, setShowError] = useState(false);

    const Toast = Swal.mixin({
        toast: true,
        width: "540px",
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
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, please log in');
                }
                
                const response = await api.get('/users/me', {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token}`    
                    }
                })

                console.log('response: ', response.data);
                setSelected(response.data.newsLetter);
                setuserId(response.data._id);
            } catch (err) {
                console.log('error response: ', err.response || err);
                setError(
                    err.response?.data?.message || err.message || 'An error occurred while fetching user data'
                );
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, [])

    const updateNewsLetterStatus = async (e) => {
        e.preventDefault();
        setError(null);
        
        if (!acceptPolicy) {
            setShowError(true);
            Toast.fire({
                icon: "error",
                title: "Veuillez accepter la politique de confidentialité",
            });
            return;
        }

        setLoading(true);
        setShowError(false);

        try {
            const response = await api.put(`users/me/update-user-newsletter-status/${userId}`, {
                newsLetter: selected
            })
            console.log("Update response:", response.data);
            Toast.fire({
                icon: "success",
                title: "newsLetter status updated successfully",
            });
        } catch (err) {
            console.log("Error submitting newsLetter status:", err);
            console.log("Submit error details:", err.response?.data || err.message);
            Toast.fire({
                icon: "error",
                title: "Failed to update newsLetter status",
            });
        } finally {
            console.log("Submit complete, form data:", selected);
            setLoading(false);
        }
    }

    return(
        <div className="w-full grid grid-cols-4 gap-6 px-8 py-8">
            <div className="col-span-1">
                <SideBar />
            </div>

            <div className="col-span-3">
                <div className="w-full p-4 rounded-md bg-gray-100">
                    <h1 className="text-xl font-medium mb-6">Préférences de communication</h1>
                    
                    <form onSubmit={updateNewsLetterStatus} className="mx-auto p-6 bg-white rounded-md">
                        <h2 className="text-lg font-normal text-gray-800 mb-6">
                            Définissez vos préférences
                        </h2>
                        
                        <RadioGroup 
                            value={selected} 
                            onValueChange={setSelected}
                            className="mb-6"
                        >
                            <Radio 
                                value="receive" 
                                className="mb-4"
                                description=""
                            >
                                Je souhaite recevoir la newsletter quotidienne
                            </Radio>
                            <Radio 
                                value="unsubscribe"
                                description=""
                            >
                                Je ne souhaite plus recevoir la newsletter quotidienne
                            </Radio>
                        </RadioGroup>
                        
                        <div className="mb-8">
                            <Checkbox
                                isSelected={acceptPolicy}
                                onValueChange={(isCkecked) => {
                                    setAcceptPolicy(isCkecked);
                                    setShowError(false);
                                }}
                                // Conditionally apply red border when showError is true
                                className={`mb-2 ${showError ? 'border border-red-600 rounded-md p-2' : ''}`}
                            >
                                <span className="text-sm">
                                    J'accepte la Politique de confidentialité et des cookies de Jumia et je comprends que je peux me désabonner des newsletters à tout moment.
                                </span>
                            </Checkbox>
                            {/* Error message */}
                            <p className={`text-[13px] !font-mono text-red-600 ${!showError ? 'hidden' : ''}`}>
                                Champ requis
                            </p>
                        </div>
                        
                        <Button
                            type="submit"
                            color="primary"
                            radius="sm"
                            className="w-full"
                        >
                            Enregistrer
                        </Button>
                    </form>
                </div>
            </div>
            {loading && 
                <Loader />
            }    
        </div>
    );
}