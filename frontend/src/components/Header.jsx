"use client";
import React, { useState, useRef, useEffect } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import { SwipeableDrawer } from '@mui/material';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { ChevronDown, X } from 'lucide-react';
import { GoSearch } from "react-icons/go";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // State to manage drawer
  const [drawerSearchOpen, setDrawerSearchOpen] = useState(false); // State to manage drawer
  const searchRef = useRef(null);


  const toggleSearchDrawer = (open) => () => {
    setDrawerSearchOpen(open);
    if (open) {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 0); // Ensure input is focused after drawer renders
    }
  };

  const navLinks = [
    { name: 'DEALS', href: '#deals' },
    { name: 'ACTIVE', href: '#active' },
    { name: 'ORIGINALS', href: '#originals' },
    { name: 'TOPS', href: '#tops' },
    { name: 'BOTTOMS', href: '#bottoms' },
    { name: 'KIDS', href: '#kids' },
    { name: 'ACCESSORIES', href: '#accessories' },
    { name: 'ALL', href: '#all' }
  ];


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

  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);

  const handleClearSearch = () => {
    setSearchValue('');
    inputRef.current.focus(); // Focus the input field
  };

  const searchBar = () => (
    <div className="w-full flex justify-center items-center bg-white h-28">
      <div className="w-[50%] flex items-center border rounded-none relative">
        <input
          ref={inputRef}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search"
          className="w-full pl-8 pr-8 py-2 outline-none"
        />
          <GoSearch className="h-5 cursor-pointer w-5 absolute left-2 text-gray-500" />
        <button className="absolute right-2 text-gray-500 hover:text-black">
          <X onClick={handleClearSearch} strokeWidth={1.25} />
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
  const [openCurrencyDropdown, setOpenCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    country: "Morocco",
    currency: "MAD"
  });
  
  const toggleCurrencyDropdown = () => {
    setOpenCurrencyDropdown(!openCurrencyDropdown);
  };
  
  const handleCurrencySelect = (option) => {
    setSelectedCurrency(option);
    setOpenCurrencyDropdown(false); // Close dropdown after selection
  };
  
  const currencyOptions = [
    { country: "United States", currency: "USD" },
    { country: "France", currency: "EUR" },
    { country: "Morocco", currency: "MAD" }
  ];
  

  return (
    <>
    <div className="bg-[#E74683] w-full  flex justify-center items-center text-white font-semibold py-2">The ONLY Official MrBeast Merch Store</div>

    <Navbar className="bg-white flex justify-between text-black py-4 font-semibold" onMenuOpenChange={setIsMenuOpen}>
    <NavbarContent className="">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <img className="max-w-none" src="https://mrbeast.store/cdn/shop/files/mrbeaststore_logo_19e042b0-02a5-4a87-9185-9e89c3ed3095.png?v=1707751347&width=160" alt="Logo" />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
      <NavbarItem className="bg-[#17C964] py-[2px] text-white px-3 rounded-full">
        <Link 
            href="news"
            className="text-sm font-medium no-underline relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform hover:opacity-100 active:opacity-100 transition-none after:duration-300"
        >
          NEW
        </Link>
      </NavbarItem>

        {navLinks.map((link) => (
          <NavbarItem key={link.name}>
            <Link 
              href={link.href}
              className="text-sm font-medium no-underline relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#E74683] after:scale-x-0 hover:after:scale-x-100 after:transition-transform hover:opacity-100 active:opacity-100 transition-none after:duration-300"
            >
              {link.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="ml-32">
        <div className="flex items-center gap-4">
          {/* Currency Selector */}
          <div className="relative flex">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="-mt-[4px] w-4 h-4" />
              <button
                onClick={toggleCurrencyDropdown}
                className="flex items-center gap-2 text-sm hover:text-gray-600"
              >
                <span className="-mx-1">{selectedCurrency.country}</span>
                <span className="-mr-1">|</span>
                <span className="mt-[1px]">{selectedCurrency.currency}</span>

                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openCurrencyDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            {openCurrencyDropdown && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 shadow-sm py-1 z-10">
                {currencyOptions.map((option) => (
                  <button
                    key={option.currency}
                    onClick={() => handleCurrencySelect(option)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      selectedCurrency.currency === option.currency &&
                      selectedCurrency.country === option.country
                        ? "font-bold text-gray-800"
                        : "text-gray-600"
                    }`}
                  >
                    {option.country} ({option.currency})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
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
          <span className="bg-[#fff] border border-[#E74683] absolute inline-flex items-center px-1 -right-1 -top-0 rounded-full text-xs text-[#E74683]">0</span>
          <div className="absolute -z-10 bg-[#E74683] top-[7px] right-0 px-5 h-7 w-10 rounded-3xl"></div>
          <svg width="40px" height="40px" fill="#ffffff" className="!fill-white rounded-xl" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <path d="m15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.78-11.61zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1 -9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z" fill="#fff" fillRule="evenodd"></path>
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
    </>
  );
}
