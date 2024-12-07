"use client";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import modules from swiper
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Button } from "@nextui-org/react";
import { MessageCirclePlus } from "lucide-react";

const cars = [
    { id: 1, name: 'Car 1' },
    { id: 2, name: 'Car 2' },
    { id: 3, name: 'Car 3' },
    { id: 4, name: 'Car 4' },
];

export default function ReviewSwipper() {
    return (
        <div className='w-full container mx-auto px-20 my-24 text-gray-700'>
            <p className='text-2xl text-center mt-10'>Let customers speak for us</p>
            <p className='text-2xl flex justify-center my-2 text-yellow-400'><FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} /></p>
            <p className='text-center'>from 41 reviews</p>
            <Swiper
                className=" my-6"
                spaceBetween={30}
                slidesPerView={1}
                speed={2000}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{clickable: true}}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {cars.map(car => (
                    <SwiperSlide key={car.id}>
                        <div className="w-full flex justify-center flex-col">
                            <p className='text-2xl flex justify-center my-2 text-yellow-400'><FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} /></p>
                            <p className="text-lg text-center">quality is just amazing !</p>
                            <p className="text-center px-6 text-sm mt-1.5">It's so comfy and soft on the inside and the customer service was incredible. Thank you !</p>
                            <p className="text-center px-6 text-xs text-gray-500 mt-8">Felix Harmon</p>
                            <div className="w-full flex justify-center items-center">
                                <img className="w-24" src="https://suicideboystore.com/cdn/shop/files/12801480305247675068_2048.jpg?v=1706570827" alt="" />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="w-full mt-14 flex justify-center">
                <Button className="border  border-gray-500 py-2.5 px-3 transition-all duration-300">
                    Add Review <MessageCirclePlus strokeWidth={1.5} />
                </Button>
            </div>
        </div>
    );
}