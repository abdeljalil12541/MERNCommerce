"use client";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import axios from "axios";
import {
  User,
  Package,
  Mail,
  MessageSquare,
  Ticket,
  Heart,
  Store,
  Clock,
  Settings,
  MapPin,
  Bell,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname

export default function SideBar() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const currentPath = usePathname(); // Get the current path (e.g., "/account/index")

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const menuItems = [
    { icon: <User size={18} />, text: "Votre compte Jumia", href: "/account/index" },
    { icon: <Package size={18} />, text: "Vos commandes", href: "/account/orders" },
    { icon: <Mail size={18} />, text: "Boîte de réception", href: "/account/inbox" },
    { icon: <MessageSquare size={18} />, text: "Vos avis en attente", href: "/account/reviews" },
    { icon: <Heart size={18} />, text: "Favoris", href: "/account/wishlist" },
    { icon: <Clock size={18} />, text: "Vus récemment", href: "/account/recently-viewed-products" },
  ];

  const accountSettings = [
    { icon: <Settings size={16} />, text: "Gérez votre Compte", href: "/account/settings" },
    { icon: <MapPin size={16} />, text: "Adresses", href: "/account/address" },
    { icon: <Bell size={16} />, text: "Préférences de communication", href: "/account/newsletter/manage" },
  ];

  const logOut = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log("Token sent to backend:", token);

      // Uncomment and adjust this if you need to call a logout API
      // if (!token) {
      //   throw new Error("No token found in localStorage");
      // }
      // const response = await axios.post(
      //   "http://localhost:5000/api/users/logout",
      //   {},
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //     withCredentials: true,
      //   }
      // );
      // console.log("Backend response:", response.data);

      localStorage.removeItem("token");
      Toast.fire({
        icon: "success",
        title: "Logged out successfully",
      });
      router.push("/login");
    } catch (error) {
      console.log("Error while logging out...", error);
      Toast.fire({
        icon: "error",
        title: "Failed to log out",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-100 rounded-md shadow-sm">
      {/* Menu items with icons */}
      <ul className="px-2 py-1">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>
              <button
                className={`w-full flex items-center py-2 px-3 my-1 hover:bg-gray-200 rounded-md text-left ${
                  currentPath === item.href ? "bg-gray-200" : ""
                }`}
              >
                <span className="mr-3 text-gray-600">{item.icon}</span>
                <span className="text-sm text-gray-700">{item.text}</span>
              </button>
            </Link>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="border-t border-gray-300 my-2"></div>

      {/* Account settings */}
      <ul className="px-2 py-1">
        {accountSettings.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>
              <button
                className={`w-full flex items-center py-2 px-3 my-1 hover:bg-gray-200 rounded-md text-left ${
                  currentPath === item.href ? "bg-gray-200" : ""
                }`}
              >
                <span className="mr-3 text-gray-600">{item.icon}</span>
                <span className="text-sm text-gray-700">{item.text}</span>
              </button>
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t border-gray-300 mt-2"></div>

      {/* Logout button */}
      <div>
        <Button
          onPress={logOut}
          variant="faded"
          color="danger"
          className="py-6 border-none rounded-none w-full flex items-center justify-center font-medium"
        >
          <LogOut size={16} />
          <span>Déconnexion</span>
        </Button>
      </div>

      {loading && <Loader />}
    </div>
  );
}