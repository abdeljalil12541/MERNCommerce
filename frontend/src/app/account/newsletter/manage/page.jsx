"use client";
import SideBar from "../../../../components/SideBar"
import React, { useState } from 'react';
import { RadioGroup, Radio, Checkbox, Button } from "@nextui-org/react";

export default function NewsletterPreferences() {
    const [selected, setSelected] = useState("receive");
    const [acceptPolicy, setAcceptPolicy] = useState(false);

    return(
        <div className="w-full grid grid-cols-4 gap-6 px-8 py-8">
            <div className="col-span-1">
                <SideBar />
            </div>

            <div className="col-span-3">
                <div className="w-full p-4 rounded-md bg-gray-100">
                    <h1 className="text-xl font-medium mb-6">Préférences de communication</h1>
                    
                    <div className="mx-auto p-6 bg-white rounded-md">
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
                        
                        <Checkbox
                            isSelected={acceptPolicy}
                            onValueChange={setAcceptPolicy}
                            className="mb-8"
                        >
                            <span className="text-sm">
                            J'accepte la Politique de confidentialité et des cookies de Jumia et je comprends que je peux me désabonner des newsletters à tout moment.
                            </span>
                        </Checkbox>
                        
                        <Button
                            color="primary"
                            radius="sm"
                            className="w-full"
                        >
                            Enregistrer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}



 

  

    
