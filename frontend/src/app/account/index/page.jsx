import SideBar from "../../../components/SideBar"
import { Card, CardHeader, CardBody, Button, Divider, Avatar } from '@nextui-org/react';
import { Edit, CreditCard, Mail, Home, User } from 'lucide-react';

export default function AccountIndex() {
    const userInfo = {
        name: 'chkir abdeljalil',
        email: 'abdorca534@gmail.com',
        creditBalance: '0.00 Dhs',
        address: {
          name: 'chkir abde',
          line1: 'lamia5',
          line2: 'rue165, num31',
          city: 'CASABLANCA - Ben Msick, Grand Casablanca',
          phone: '+212 617465647 / +212 617465647'
        }
      };
    return(
        <div className="w-full h-[100vh] grid grid-cols-4 gap-6 px-8 py-8">
            <div className="col-span-1">
                <SideBar />
            </div>

            <div className="col-span-3">
                <div className="w-full p-4 rounded-md bg-gray-100">
                    <h1 className="text-xl font-medium mb-6">Votre compte</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Personal Information */}
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
                        
                        {/* Address */}
                        <Card className="bg-white shadow-sm">
                        <CardHeader className="pb-2 flex justify-between">
                            <h2 className="text-md uppercase font-medium text-gray-700">
                            Adresses
                            </h2>
                            <Button 
                            isIconOnly 
                            size="sm" 
                            variant="light" 
                            color="warning"
                            className="min-w-0 w-auto h-auto p-0"
                            >
                            <Edit size={18} className="text-orange-400" />
                            </Button>
                        </CardHeader>
                        <CardBody className="pt-2">
                            <p className="text-sm font-medium">Adresse par défaut :</p>
                            <div className="text-sm">{userInfo.address.name}</div>
                            <div className="text-sm">{userInfo.address.line1}</div>
                            <div className="text-sm">{userInfo.address.line2}</div>
                            <div className="text-sm">{userInfo.address.city}</div>
                            <div className="text-sm text-gray-500">{userInfo.address.phone}</div>
                        </CardBody>
                        </Card>
                        
                        {/* Credit */}
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
                        
                        {/* Communication Preferences */}
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
        </div>
    );
}