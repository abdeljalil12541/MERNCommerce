import { Truck, DollarSign, CreditCard, Headphones } from 'lucide-react';
import { Noto_Serif } from 'next/font/google';
import Image from 'next/image';

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400'],
});

const FeaturesBanner = () => {
  const features = [
    {
      icon: <Image 
                src="https://marinothemes.com/html/preview/minimalin/minimalin/img/feature/feature__1.svg" 
                alt="Free Shipping" 
                width={54} 
                height={54} 
                className="text-gray-700"
            />,
      title: "Free Shipping",
      description: "On orders over $99.",
      textColor: "text-gray-500"
    },
    {
    icon: <Image 
                src="https://marinothemes.com/html/preview/minimalin/minimalin/img/feature/feature__2.svg" 
                alt="Free Shipping" 
                width={50} 
                height={50} 
                className="text-gray-700"
            />,
      title: "Money Back",
      description: "Money back in 15 days.",
      textColor: "text-gray-500"
    },
    {
    icon: <Image 
                src="https://marinothemes.com/html/preview/minimalin/minimalin/img/feature/feature__3.svg" 
                alt="Free Shipping" 
                width={50} 
                height={50} 
                className="text-gray-700"
            />,
      title: "Secure Checkout",
      description: "100% Payment Secure.",
      textColor: "text-gray-500"
    },
    {
    icon: <Image 
                src="https://marinothemes.com/html/preview/minimalin/minimalin/img/feature/feature__4.svg" 
                alt="Free Shipping" 
                width={46} 
                height={46} 
                className="text-gray-700"
            />,
      title: "Online Support",
      description: "Ensure the product quality.",
      textColor: "text-gray-500"
    }
  ];

  return (
    <section className={`mt-6 mx-28 ${notoSerif.className}`}>
        <div className="w-full rounded-xl bg-white container mx-auto ">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                    <div 
                    key={index} 
                    className="flex items-center space-x-4 px-6 py-12 rounded-xl hover:bg-[#e7468411] transition-colors duration-200"
                    >
                    <div className="flex-shrink-0">
                        {feature.icon}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                        {feature.title}
                        </h3>
                        <p className={`${feature.textColor} !noto-serif-features-banner text-sm`}>
                        {feature.description}
                        </p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
    </section>
  );
};

export default FeaturesBanner;