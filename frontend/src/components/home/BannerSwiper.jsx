'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper core styles
import 'swiper/css/pagination'; // Import Pagination styles
import 'swiper/css/navigation'; // Import Navigation styles
import { Pagination, Navigation, Autoplay } from 'swiper/modules'; // Import modules correctly

export default function BannerSwiper() {
    const bannerImages = [
        { alt: 'Banner 1', src: 'https://mrbeast.store/cdn/shop/files/Gift-Card-Desktop-Hero-Banner.png?v=1734703502&width=1250' },
        { alt: 'Banner 2', src: 'https://mrbeast.store/cdn/shop/files/Kids-Products-Desktop-Hero-Banner-Variation-1.png?v=1733761590&width=1250' },
        { alt: 'Banner 3', src: 'https://mrbeast.store/cdn/shop/files/BG-Desktop-Hero-Banner-Variation-2.png?v=1734547732&width=1250' },
    ];

    return (
        <div className="w-full px-2 -mt-8 h-screen flex justify-center items-center">
            <Swiper
                className="w-full rounded-lg"
                modules={[Pagination, Navigation, Autoplay]}
                pagination={{ clickable: true }}
                loop={true}
                speed={2000}
                slidesPerView={1}
                autoplay={{
                    delay: 3000, // Delay between slides in ms (3 seconds)
                    disableOnInteraction: false, // Keep autoplay active after user interactions
                }}
            >
                {bannerImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img className="rounded-lg w-full" src={image.src} alt={image.alt} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
