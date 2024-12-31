"use client";
import { Goldman } from 'next/font/google';
import { Button } from "@nextui-org/react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
    { title: 'BEAST SKATE DECK - PINK', size: 'S', color: 'Red', productType: 'Accessoiries', regularPrice: 499, currentPrice: 459, discount: 16, status: 'NEW', mainSrc: '/api/placeholder/400/320', hoverSrc: '/api/placeholder/400/320', date: '2024-03-15', ifBestSeller: true },
    { title: 'BEAST SKATE DECK - PINK', size: 'S', color: 'Blue', productType: 'Flannel Pants', regularPrice: 499, currentPrice: 459, discount: 16, status: 'NEW', mainSrc: '/api/placeholder/400/320', hoverSrc: '/api/placeholder/400/320', date: '2024-02-28', ifBestSeller: false },
    { title: 'BEAST SKATE DECK - BLUE', size: 'S', color: 'Red', productType: 'Cap', regularPrice: 499, currentPrice: 449, discount: 10, status: 'DEAL', mainSrc: '/api/placeholder/400/320', hoverSrc: '/api/placeholder/400/320', date: '2024-01-15', ifBestSeller: true },
    { title: 'BEAST SKATE DECK - GREEN', size: 'S', color: 'Black', productType: 'Backpack', regularPrice: 499, currentPrice: 399, discount: 20, status: 'TRENDING', mainSrc: '/api/placeholder/400/320', hoverSrc: '/api/placeholder/400/320', date: '2024-03-01', ifBestSeller: true },
];

const GoldmanFont = Goldman({
    subsets: ['latin'],
    weight: ['400'],
});

export default function HomePageItems1() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: -1000,
        pauseOnHover: false,  // Prevent pausing on hover
        cssEase: "linear",  // Changed to linear for smooth continuous movement
        arrows: true,
        className: "w-full h-[400px]" // Add fixed height
    };
    

    return(
        <section className='w-full mx-auto pb-8'>
            <div className='w-full mb-8'>
                <div className="slider-container"> {/* Add container with styles */}
                    <Slider {...settings}>
                        <div className="h-[400px] bg-blue-500">
                            <h3 className="text-white text-center text-4xl h-full flex items-center justify-center">1</h3>
                        </div>
                        <div className="h-[400px] bg-green-500">
                            <h3 className="text-white text-center text-4xl h-full flex items-center justify-center">2</h3>
                        </div>
                        <div className="h-[400px] bg-red-500">
                            <h3 className="text-white text-center text-4xl h-full flex items-center justify-center">3</h3>
                        </div>
                        <div className="h-[400px] bg-purple-500">
                            <h3 className="text-white text-center text-4xl h-full flex items-center justify-center">4</h3>
                        </div>
                        <div className="h-[400px] bg-yellow-500">
                            <h3 className="text-white text-center text-4xl h-full flex items-center justify-center">5</h3>
                        </div>
                        <div className="h-[400px] bg-pink-500">
                            <h3 className="text-white text-center text-4xl h-full flex items-center justify-center">6</h3>
                        </div>
                    </Slider>
                </div>
            </div>
            <div className="w-full px-4 grid grid-cols-4 mb-5">
                {products.length > 0 && (
                products.map((product, index) => (
                    <div key={index} className={`${GoldmanFont.className} col-span-1 CardHover relative mx-1 cursor-pointer h-[480px] group`}>
                        <img
                            src={product.mainSrc}
                            alt={product.title}
                            className="rounded-lg group-hover:hidden h-[400px] w-full object-cover"
                        />
                        <img
                            src={product.hoverSrc}
                            alt={`${product.title} Hover`}
                            className="rounded-lg hidden group-hover:block h-[400px] w-full object-cover"
                        />
                        <span 
                            className={`absolute ${product.status === 'SOLD OUT'? '!bottom-[90px] right-2': 'top-2 left-2'} 
                                ${product.status === 'NEW' && 'bg-[#1AACDD]' ||
                                    product.status === 'DEAL' && 'bg-[#E74683]' ||
                                    product.status === 'TRENDING' && 'bg-[#17C964]' ||
                                    product.status === 'SOLD OUT' && 'bg-neutral-950'
                                } text-white text-[10px] me-2 px-4 py-1 rounded-xl font-medium`}
                            >
                            {product.status}
                        </span>
                        <div className="space-y-2 p-2">
                            <p className="pt-2 cursor-pointer TextCardHover">{product.title}</p>
                            <div className="flex gap-3">
                                <p className="text-gray-800 line-through">{product.regularPrice.toFixed(2)} dh</p>
                                <p className="text-black ">{product.currentPrice.toFixed(2)} dh</p>
                                <p className="text-[#E74683] mt-[1px]">{product.discount}% OFF</p>
                            </div>
                        </div>
                    </div>
                ))
                )}
            </div>
            <div className='w-full flex justify-center pt-4'>
                <Button color='primary' className='uppercase !py-6 !px-6 !rounded-lg'>View All</Button>
            </div>

            {/* Add required styles */}
            <style jsx global>{`
                .slider-container {
                    width: 100%;
                    height: 400px;
                    position: relative;
                }
                .slider-container .slick-slider,
                .slider-container .slick-list,
                .slider-container .slick-track {
                    height: 100%;
                }
                .slick-prev, .slick-next {
                    z-index: 1;
                }
                .slick-prev {
                    left: 25px;
                }
                .slick-next {
                    right: 25px;
                }
            `}</style>
        </section>
    );
}