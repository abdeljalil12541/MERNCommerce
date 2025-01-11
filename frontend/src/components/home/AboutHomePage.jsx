import { Noto_Serif, Playfair } from 'next/font/google';
import { Button } from '@nextui-org/react';
const notoSerif = Playfair({
    subsets: ['latin'],
    weight: ['500'],
});

export default function FashionHeroSection() {
    return (
        <section className="w-full pl-14 flex justify-center items-center h-[75vh] bg-neutral-950 text-gray-100">
            <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-4">
                {/* Left Content */}
                <div className="col-span-4 flex flex-col justify-center  relative z-50">
                    <p className="text-[#E74683] text-sm font-semibold uppercase tracking-wider">
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
                <div className="col-span-3 -ml-[60px] flex justify-center items-center">
                    <img 
                        src="https://media-hosting.imagekit.io//b772c47ed51e4839/download%20(1).png?Expires=1831225412&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=m5eHId5fGEGlgvvHMfuWTACM3PTH6iG3UwBBtN6-oxhV~CT4ShE2I2F88pR5sAl1Sj-Lzzc31hQia1hEgVqPYhom1H4GoVy9egkqnGsXUt9mjQnTxrWfIIpKPNu92XYpklPWeobz0vW~X9onUezAMZJzieBcAAoY3nx7rwKzkq2ZTEcOnDfE6bTm3R-brA7ZJs4tomn2nF~isnB2gCfB0piM9foUCnrLPuufL2p47Rs3kxacNWToFnocS6y6UmDYb5QhNbww1Zk~g0Zwgb8acVRt4KDYknI~cXeb~26BOvtmHgCQ54-Pu0J-PlmNQfcZxrKlaV9xHIkvrMlPb6Q2ig__" 
                        alt="Designer Hoodie" 
                        className="w-[400px] max-w-md transform hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Right Content */}
                <div className="col-span-5 -ml-2 flex flex-col justify-center">
                    <h2 className={`${notoSerif.className} text-5xl mb-4`}>
                        EXCLUSIVE <span className="text-[#E74683]">STREET</span> WEAR
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Elevate Your Style With Our Premium Collection Of Street Fashion. Each Piece Is Crafted For Those Who Appreciate Authentic Urban Design.
                    </p>
                    <div className='w-full flex justify-center'>
                        <Button color='primary' className='uppercase !py-6 !px-6 !rounded-lg'>
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
            </div>
        </section>
    );
}