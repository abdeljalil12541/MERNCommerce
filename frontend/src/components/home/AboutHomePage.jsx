import { Noto_Serif, Playfair } from 'next/font/google';
import { Button } from '@nextui-org/react';
const notoSerif = Playfair({
    subsets: ['latin'],
    weight: ['500'],
});

export default function FashionHeroSection() {
    return (
        <section className="w-full pl-20 flex justify-center items-center h-[80vh] bg-neutral-950 text-gray-100">
            <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-4">
                {/* Left Content */}
                <div className="col-span-4 flex flex-col justify-center">
                    <p className="text-[#ff481f] text-sm font-semibold uppercase tracking-wider">
                        the process
                    </p>
                    <div className="mt-2">
                        <h1 className={`${notoSerif.className} text-7xl leading-tight`}>
                            HIGH CLASS
                            <br />
                            <span className="inline-block relative">
                                <span className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c9c] to-[#ffffff] bg-clip-text text-transparent">
                                    STYLE
                                </span>
                                {/* This is a fallback for browsers that don't support background-clip */}
                                <span className="opacity-0">STYLE</span>
                            </span>
                        </h1>
                    </div>
                </div>

                {/* Center Fashion Item Image */}
                <div className="col-span-3 -ml-[100px] flex justify-center items-center">
                    <img 
                        src="https://yeatofficial.com/cdn/shop/files/LYFESTYLE_HOODIE_SIGNED_VINYL_2-id24oX6_540x.png?v=1729179532" 
                        alt="Designer Hoodie" 
                        className="w-full max-w-md transform hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Right Content */}
                <div className="col-span-5 -ml-4 flex flex-col justify-center">
                    <h2 className={`${notoSerif.className} text-5xl mb-4`}>
                        EXCLUSIVE <span className="text-[#ff481f]">STREET</span> WEAR
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Elevate Your Style With Our Premium Collection Of Street Fashion. Each Piece Is Crafted For Those Who Appreciate Authentic Urban Design.
                    </p>
                    <Button className="flex items-center gap-2 text-white border border-white px-6 py-6 w-fit hover:bg-white hover:text-black transition-colors duration-300">
                        SHOP NOW
                        <svg 
                            className="w-4 h-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Button>
                </div>
            </div>
        </section>
    );
}