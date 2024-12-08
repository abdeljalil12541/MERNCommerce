"use client";
import React, { useState, useRef, useEffect } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import {AcmeLogo} from "../app/fonts/AcmeLogo";
import { SwipeableDrawer } from '@mui/material';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { X } from 'lucide-react';
import { GoSearch } from "react-icons/go";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@nextui-org/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // State to manage drawer
  const [drawerSearchOpen, setDrawerSearchOpen] = useState(false); // State to manage drawer
  const searchRef = useRef(null);


  const toggleSearchDrawer = (open) => () => {
    setDrawerSearchOpen(open);
  };


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

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const searchBar = () => (
    <div className="w-full flex justify-center items-center bg-white h-28">
  <div className="w-[50%] flex items-center border rounded-none relative">
    <input
      type="text"
      placeholder="Search"
      className="w-full pl-8 pr-8 py-2 outline-none"
    />
      <GoSearch className="h-5 w-5 absolute left-2 text-gray-500" />
    <button className="absolute right-2 text-gray-500 hover:text-black">
      <X onClick={() => setDrawerSearchOpen(false)} strokeWidth={1.25} />
    </button>
  </div>
</div>

  )

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
    <Navbar className="bg-white flex justify-between text-black py-4 font-semibold" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
      
      <NavbarContent className="">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>


      <NavbarContent>
        <NavbarItem className="flex cursor-pointer mr-2">
          <div onClick={toggleSearchDrawer(true)}>
            <GoSearch size={22} className="text-gray-700" />
          </div>
        </NavbarItem>

        {/* Swipeable Drawer */}
        <SwipeableDrawer
          anchor="top"
          open={drawerSearchOpen}
          onClose={toggleSearchDrawer(false)}
          onOpen={toggleSearchDrawer(true)}
        >
          {searchBar()}
        </SwipeableDrawer>
      </NavbarContent>

      <NavbarContent>
        <NavbarItem className="flex cursor-pointer">
            <svg width="20px" height="20px" fill="#000000" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="icon icon-account tw-w-6 tw-h-6" viewBox="0 0 18 19">
              <path fillRule="evenodd" clipRule="evenodd" d="M6 4.5a3 3 0 116 0 3 3 0 01-6 0zm3-4a4 4 0 100 8 4 4 0 000-8zm5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15zM9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35z" fill="currentColor">
              </path>
            </svg>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="">
        <NavbarItem onClick={toggleDrawer(true)} className="-mr-14 flex cursor-pointer relative">
          <span className="absolute inline-flex items-center px-1 right-0 rounded-full text-xs bg-black text-white">0</span>
            <svg width="40px" height="40px" fill="#000000" className="icon icon-cart-empty tw-w-14 tw-h-14 tw-text-white" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <path d="m15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.78-11.61zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1 -9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z" fill="currentColor" fillRule="evenodd"></path>
          </svg>        
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
