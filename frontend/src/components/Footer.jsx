import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Truck, Shield, Clock, Mail, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-neutral-950 relative text-gray-300 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <h2 className="text-white text-2xl font-bold">LUXRIO</h2>
                        </Link>
                        <div className="space-y-2">
                            <p>ADDRESS : 966 Munich Expressway</p>
                            <p>Sue 700 Germany, TX 7859</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <Mail size={16} />
                                <span>support@luxrio.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} />
                                <span>+1 234 567 890</span>
                            </div>
                        </div>
                    </div>

                    {/* Shopping Links */}
                    <div className="space-y-4">
                        <h3 className="text-white font-bold text-xl">SHOPPING</h3>
                        <ul className="space-y-2">
                            <li><Link href="/gift-card" className="hover:text-white transition-colors">Gift Card</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/delivery" className="hover:text-white transition-colors">Delivery</Link></li>
                        </ul>
                    </div>

                    {/* About Store */}
                    <div className="space-y-4">
                        <h3 className="text-white font-bold text-xl">ABOUT STORE</h3>
                        <ul className="space-y-2">
                            <li><Link href="/shopping" className="hover:text-white transition-colors">Shopping</Link></li>
                            <li><Link href="/cart" className="hover:text-white transition-colors">Order Cart</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/help" className="hover:text-white transition-colors">Help</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-white font-bold text-xl">SUBSCRIBE FOR <span className="text-[#E74683]">NEWSLETTER</span></h3>
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="bg-transparent border border-gray-700 px-4 py-2 flex-grow focus:outline-none focus:border-gray-500"
                            />
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-2">FOLLOW</h4>
                            <div className="flex gap-3">
                                <Link href="#" className="bg-blue-600 p-2 rounded hover:opacity-80 transition-opacity">
                                    <Facebook size={20} />
                                </Link>
                                <Link href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded hover:opacity-80 transition-opacity">
                                    <Instagram size={20} />
                                </Link>
                                <Link href="#" className="bg-blue-400 p-2 rounded hover:opacity-80 transition-opacity">
                                    <Twitter size={20} />
                                </Link>
                                <Link href="#" className="bg-blue-700 p-2 rounded hover:opacity-80 transition-opacity">
                                    <Linkedin size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-16 text-center border-t border-gray-800 pt-8">
                    <p>COPYRIGHT © 2024 <span className="text-white">LUXRIO</span>. ALL RIGHTS RESERVED BY <span className="text-white">VECURO</span></p>
                </div>
            </div>
        </footer>
    );
}