"use client";
import React, { useState, useRef, useEffect } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import {AcmeLogo} from "../app/fonts/AcmeLogo";
import { SwipeableDrawer } from '@mui/material';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { X } from 'lucide-react';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // State to manage drawer
  const searchRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);  // Close search when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, []);

  const toggleSearch = () => {
    setIsSearchVisible(prevState => !prevState);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const list = () => (
    <div
      style={{ width: 340 }}
      role="presentation"
    >
      <div className="text-gray-600 w-full pl-4 pr-2.5 py-3.5 font-light btn btn-primary flex justify-between">
        <p className="text-xl">Shoping Cart</p>
        <div className="border border-gray-400 p-1">
          <X size={30} className="cursor-pointer" strokeWidth={1.5} onClick={toggleDrawer(false)} />
        </div>
      </div>

      <div className="h-[350px] text-gray-600 mt-9 flex justify-center items-center">
        <p className="text-lg">no products in the cart</p>
      </div>

      <div className="w-full flex justify-center text-gray-600">
        <button className="border border-gray-600 uppercase px-14 py-2 rounded-full mt-36">continue shopping</button>
      </div>
    </div>
  );

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  const anchors = ['left', 'right', 'top', 'bottom'];

  return (
    <Navbar className="bg-black text-white py-4 font-semibold" onMenuOpenChange={setIsMenuOpen}>

      <NavbarContent className="hidden sm:flex gap-4 -ml-36" justify="center">
        <div className="relative">
          {/* Search Icon */}
          <button onClick={toggleSearch} className="text-white">
            {isSearchVisible? <FaTimes />: <FaSearch onClick={() => setIsSearchVisible(false)} />}
          </button>

          {/* Search Input */}
          <div
            ref={searchRef}
            className={`absolute top-[19px] left-0 transition-all duration-500 ease-in-out ${
              isSearchVisible ? 'w-48 opacity-100' : 'w-0 opacity-0'
            } overflow-hidden`}
          >
            <input
              type="text"
              placeholder="Search..."
              className="p-2 text-gray-800 text-sm focus:outline-none"
            />
          </div>
        </div>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
          CONCEPT
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
          ACCESSORIES
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
          OFF THE GRID
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            T-SHIRT
          </Link>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarContent className="ml-28 mr-96">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex">
          <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 cursor-pointer mx-2 h-auto">
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
          </svg>

          <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 cursor-pointer mx-2 h-auto">
            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
          </svg>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className=" -mr-6">
        <NavbarItem onClick={toggleDrawer(true)} className="-mr-14 flex cursor-pointer relative">
          <span className="absolute inline-flex items-center px-1 -top-2 -right-3 rounded-full text-xs bg-white text-black">0</span>
          <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" id="ast-bag-icon-svg" x="0px" y="0px" width="20" height="20" viewBox="826 826 140 140" enableBackground="new 826 826 140 140" style={{ display: 'inline-block' }}><path d="M960.758,934.509l2.632,23.541c0.15,1.403-0.25,2.657-1.203,3.761c-0.953,1.053-2.156,1.579-3.61,1.579H833.424c-1.454,0-2.657-0.526-3.61-1.579c-0.952-1.104-1.354-2.357-1.203-3.761l2.632-23.541H960.758z M953.763,871.405l6.468,58.29H831.77l6.468-58.29c0.15-1.203,0.677-2.218,1.58-3.045c0.903-0.827,1.981-1.241,3.234-1.241h19.254v9.627c0,2.658,0.94,4.927,2.82,6.807s4.149,2.82,6.807,2.82c2.658,0,4.926-0.94,6.807-2.82s2.821-4.149,2.821-6.807v-9.627h28.882v9.627c0,2.658,0.939,4.927,2.819,6.807c1.881,1.88,4.149,2.82,6.807,2.82s4.927-0.94,6.808-2.82c1.879-1.88,2.82-4.149,2.82-6.807v-9.627h19.253c1.255,0,2.332,0.414,3.235,1.241C953.086,869.187,953.612,870.202,953.763,871.405z M924.881,857.492v19.254c0,1.304-0.476,2.432-1.429,3.385s-2.08,1.429-3.385,1.429c-1.303,0-2.432-0.477-3.384-1.429c-0.953-0.953-1.43-2.081-1.43-3.385v-19.254c0-5.315-1.881-9.853-5.641-13.613c-3.76-3.761-8.298-5.641-13.613-5.641s-9.853,1.88-13.613,5.641c-3.761,3.76-5.641,8.298-5.641,13.613v19.254c0,1.304-0.476,2.432-1.429,3.385c-0.953,0.953-2.081,1.429-3.385,1.429c-1.303,0-2.432-0.477-3.384-1.429c-0.953-0.953-1.429-2.081-1.429-3.385v-19.254c0-7.973,2.821-14.779,8.461-20.42c5.641-5.641,12.448-8.461,20.42-8.461c7.973,0,14.779,2.82,20.42,8.461C922.062,842.712,924.881,849.519,924.881,857.492z"></path></svg>
        </NavbarItem>

        {/* Swipeable Drawer */}
        <SwipeableDrawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </NavbarContent>


      
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

    </Navbar>
  );
}
