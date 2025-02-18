import SideBar from "../../../components/SideBar"
import { Card, CardBody } from '@nextui-org/react';

export default function AccountIndex() {
    const messages = [
        {
          id: 1,
          timeAgo: "il y a 4 jrs",
          statusTitle: "Article(s) annulé(e) ⚠️",
          status: "canceled",
          content: "Le(s) article(s) de votre commande 395712859 a (ont) été annulé(e). Veuillez visiter votre email pour plus d'informations. Si vous avez besoin d'aide pour passer une commande, appelez-nous sur 05 22 04 18 18.",
          product: {
            name: "Bouilloire Electrique élégant 1,8L 1500W BG1500/",
            image: "https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946"
          }
        },
        {
          id: 2,
          timeAgo: "il y a 5 jrs",
          statusTitle: "Livreur en route!",
          status: "upcoming",
          content: "MATRACHE (tel: 0615498994) vous appellera bientôt pour livrer votre colis JE-G4A-395712859-9522 aujourd'hui. Assurez-vous que 107 MAD sont prêts pour le paiement. Il est maintenant possible de payer par carte bancaire lors de la livraison. Veuillez simplement informer le livreur que vous souhaitez effectuer le paiement par carte bancaire.",
          product: {
            name: "Bouilloire Electrique élégant 1,8L 1500W BG1500/",
            image: "https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946"
          }
        },
        {
          id: 3,
          timeAgo: "il y a 3 jrs",
          statusTitle: "Confirmé!",
          status: "confirmed",
          content: "Votre commande 395712859 a été confirmée. Date de livraison prévue entre le 13-02-2025 et 14-02-2025. Pour suivre l'état de votre commande, vous pouvez aller dans la section 'Vos Commandes' dans le menu de votre compte. Nous vous informerons lorsque l'article sera expédié. Nous vous remercions pour votre achat sur Jumia!",
          product: {
            name: "Bouilloire Electrique élégant 1,8L 1500W BG1500/",
            image: "https://mrbeast.store/cdn/shop/files/crop_0001_0-110-F.jpg?v=1739801971&width=1946"
        }
        }
      ];

    return(
        <div className="w-full grid grid-cols-4 gap-6 px-8 py-8">
            <div className="col-span-1">
                <SideBar />
            </div>

            <div className="col-span-3">
                <div className="w-full p-4 rounded-md bg-gray-100">
                    <h1 className="text-xl font-medium mb-6">Messages</h1>
                    
                    <div className="w-full space-y-4">
                        {messages.map((message) => (
                            <Card key={message.id} className="w-full">
                            <CardBody className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                <div className="text-sm text-gray-500">{message.timeAgo}</div>
                                <div className="text-sm">
                                    <a href="#" className="text-blue-500 hover:underline">Détails</a>
                                </div>
                                </div>
                                
                                <div className="mb-4">
                                <div className="flex items-center gap-2">
                                    <span className={`font-medium 
                                        ${
                                            message.status === 'canceled' && 'text-red-600' ||
                                            message.status === 'upcoming' && 'text-green-600' ||
                                            message.status === 'confirmed' && 'text-green-600'
                                        }
                                    `}>
                                    {message.statusTitle}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{message.content}</p>
                                </div>

                                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                                <img
                                    src={message.product.image}
                                    alt={message.product.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="text-sm">{message.product.name}</div>
                                </div>
                            </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}