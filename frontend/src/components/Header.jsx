"use client";
import React, { useState, useRef, useEffect } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import { SwipeableDrawer } from '@mui/material';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { ChevronDown, X } from 'lucide-react';
import { GoSearch } from "react-icons/go";
import { Goldman } from 'next/font/google';
import { Minus, Plus, Trash2 } from 'lucide-react';
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useDrawerState } from '../context/DrawerContext.jsx';  // Add useDrawerState
import { useCart } from '../context/CartContext'; // Add useCart

const GoldmanFont = Goldman({
    subsets: ['latin'],
    weight: ['400'],
});
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [drawerOpen, setDrawerOpen] = useState(false); // State to manage drawer
  // const [cartProduct, setCartProduct] = useState([]);
  const { drawerOpen, setDrawerOpen } = useDrawerState();
  const { cartProduct, setCartProduct } = useCart(); // Use shared cart state
  const [drawerSearchOpen, setDrawerSearchOpen] = useState(false); // State to manage drawer
  const searchRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter(); // If using Next.js

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/users/me');
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const destination = isAuthenticated ? '/account/index' : '/login';
    router.push(destination); // For Next.js
    // Or for regular navigation: window.location.href = destination;
  };

  
  // const [cartProduct, setCartProduct] = useState([]);
  // const { drawerOpen, setDrawerOpen } = useDrawerState();
  
  useEffect(() => {
    const fetchCartProducts = () => {
      const storedCartProduct = localStorage.getItem('cart');
      if (storedCartProduct) {
        try {
          const parsedCartProduct = JSON.parse(storedCartProduct); // Parse the JSON string
          setCartProduct(parsedCartProduct); // Update state with parsed data
          console.log('parsed cart product:', parsedCartProduct);
        } catch (error) {
          console.log('Error parsing cart data:', error);
        }
      } else {
        console.log('No cart data found in localStorage');
      }
    };

    fetchCartProducts();
  }, []);

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
          <GoSearch onClick={handleSearchClick} className="h-5 cursor-pointer w-5 absolute left-2 text-gray-500" />
        <button className="absolute right-2 text-gray-500 hover:text-black">
          <X onClick={handleClearSearch} strokeWidth={1.25} />
        </button>
      </div>
    </div>
  )
  const cartProducts = [
    { title: "3D BOLT HOODIE - BLACK", price: 299, size: "2Y", img: "https://mrbeast.store/cdn/shop/files/0091_0007_377.jpg?v=1714499554&width=1250" },
    { title: "3D BOLT HOODIE - BLACK", price: 299, size: "2Y", img: "https://mrbeast.store/cdn/shop/files/0091_0007_377.jpg?v=1714499554&width=1250" },
    { title: "3D BOLT HOODIE - BLACK", price: 299, size: "2Y", img: "https://mrbeast.store/cdn/shop/files/0091_0007_377.jpg?v=1714499554&width=1250" },
    { title: "3D BOLT HOODIE - BLACK", price: 299, size: "2Y", img: "https://mrbeast.store/cdn/shop/files/0091_0007_377.jpg?v=1714499554&width=1250" },
  ] 

  // Example: Implement decrement, increment, and delete (adjust as needed)
  // Updated cart management functions

// Updated increment function with fixed API path
const increment = async (productId, selectedSize) => {
  try {
    // Find current item to get its quantity
    const currentItem = cartProduct.find(
      item => item.productId._id === productId && item.selectedSize === selectedSize
    );
    
    if (!currentItem) return;
    
    const newQuantity = currentItem.quantity + 1;
    
    // If authenticated, update in MongoDB first
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Check URL path first - log it for debugging
      console.log('Sending request to update quantity at path:', '/cart/update-quantity');
      
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await api.post('/cart/update-quantity', {
        productId: currentItem.productId._id,
        selectedSize,
        quantity: newQuantity
      }, config);
      
      // Update cart from response
      if (response.data && response.data.products) {
        setCartProduct(response.data.products);
        return; // Exit early as the state is already updated
      }
    }
    
    // If not authenticated or API call failed, update local state
    const updatedCart = cartProduct.map((item) =>
      item.productId._id === productId && item.selectedSize === selectedSize
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartProduct(updatedCart);
  } catch (err) {
    console.log('Error increasing quantity:', err);
    console.log('Error details:', err.response?.data || err.message);
    toast?.error('Failed to update cart. Please try again.') || alert('Failed to update cart. Please try again.');
  }
};

// Updated decrement function with fixed API path
const decrement = async (productId, selectedSize) => {
  try {
    // Find current item to get its quantity
    const currentItem = cartProduct.find(
      item => item.productId._id === productId && item.selectedSize === selectedSize
    );
    
    if (!currentItem) return;
    
    const newQuantity = currentItem.quantity > 1 ? currentItem.quantity - 1 : 1;
    
    // If authenticated, update in MongoDB first
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await api.post('/cart/update-quantity', {
        productId: currentItem.productId._id,
        selectedSize,
        quantity: newQuantity
      }, config);
      
      // Update cart from response
      if (response.data && response.data.products) {
        setCartProduct(response.data.products);
        return; // Exit early as the state is already updated
      }
    }
    
    // If not authenticated or API call failed, update local state
    const updatedCart = cartProduct.map((item) =>
      item.productId._id === productId && item.selectedSize === selectedSize && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartProduct(updatedCart);
  } catch (err) {
    console.log('Error decreasing quantity:', err);
    console.log('Error details:', err.response?.data || err.message);
    toast?.error('Failed to update cart. Please try again.') || alert('Failed to update cart. Please try again.');
  }
};

// Updated handleDelete function with fixed API path
const handleDelete = async (productId, selectedSize) => {
  try {
    // If authenticated, remove from MongoDB first
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // FIXED PATH: Removed '/api' prefix to match backend routes
      const response = await api.post('/cart/remove-item', {
        productId,
        selectedSize
      }, config);
      
      // Update cart from response
      if (response.data && response.data.products) {
        setCartProduct(response.data.products);
        return; // Exit early as the state is already updated
      }
    }
    
    // If not authenticated or API call failed, update local state
    const updatedCart = cartProduct.filter(
      (item) => !(item.productId._id === productId && item.selectedSize === selectedSize)
    );
    setCartProduct(updatedCart);
  } catch (err) {
    console.log('Error removing item from cart:', err);
    console.log('Error details:', err.response?.data || err.message);
    toast?.error('Failed to remove item from cart. Please try again.') || alert('Failed to remove item from cart. Please try again.');
  }
};

  const list = () => (
    <div style={{ width: 340 }} role="presentation">
      <div className="text-gray-600 w-full pl-4 pr-2.5 py-3.5 font-light btn btn-primary flex justify-between">
        <p className="text-xl">Shopping Cart</p>
        <div className="border-gray-400 pr-2">
          <X size={30} className="cursor-pointer" strokeWidth={1.5} onClick={toggleDrawer(false)} />
        </div>
      </div>

      <div className="overflow-auto h-[80vh]">
        {cartProduct.length > 0 ? cartProduct.map((product, index) => (
          <div key={index} className="w-full grid px-4 grid-cols-2 my-2">
            <div className="col-span-1">
              <img className="h-52 object-cover rounded-xl" src={product?.mainSrc || (product?.productId && product.productId.mainSrc)} alt="" />
            </div>
            <div className="col-span-1 flex flex-col">
              <p>{product.title}</p>
              <p className="pt-1 text-gray-700">{product?.currentPrice?.toFixed(2) || (product?.productId && product.productId.currentPrice.toFixed(2))} DH</p>
              <div className="my-3">
                <hr className="border-gray-500" />
                <div className="flex py-1.5 text-gray-600 justify-between">
                  <p>SIZE</p>
                  <p>{product.selectedSize}</p>
                </div>
                <hr className="border-gray-500" />
              </div>
              <p className="text-gray-700 uppercase text-xs">item sub-total</p>
              <p className="text-gray-700 uppercase text-xs flex justify-end">
                {Number(
                  product?.currentPrice && product?.quantity 
                    ? (product.currentPrice * product.quantity).toFixed(2)
                    : product?.productId?.currentPrice && product?.quantity
                      ? (product.productId.currentPrice * product.quantity).toFixed(2)
                      : 0
                  ).toLocaleString()
                } DH
              </p>
              <div className="flex items-center border rounded-lg w-fit">
              <button
                onClick={() => decrement(product.productId._id, product.selectedSize)}
                className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="w-12 text-center border-x px-2 py-1">{product.quantity}</div>
              <button
                onClick={() => increment(product.productId._id, product.selectedSize)}
                className="p-2 hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(product.productId._id, product.selectedSize)}
                className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                aria-label="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="h-[350px] text-gray-600 mt-9 flex justify-center items-center">
            <p className="text-lg">No products in the cart</p>
          </div>
        )}
      </div>

      <div className="w-full absolute bottom-3 flex justify-center text-gray-600">
        <Button className="uppercase px-10 py-2 rounded-full mt-36 text-gray-500 text-[17px] border-gray-400" variant="bordered">
          {cartProduct.length > 0 ? 
            <Link className="text-gray-700" href="/checkouts">Go to cart</Link>
            : 
            <Link className="text-gray-700" href="/">Continue Shopping</Link>
          }
        </Button>
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
    { country: "Morocco", currency: "MAD" },
    { country: "France", currency: "EUR" }
  ];

  const currencyDropDownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside filter section
      if (currencyDropDownRef.current && !currencyDropDownRef.current.contains(event.target)) {
        setOpenCurrencyDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Add openDropdown as dependency
  
  const [searchVal, setSearchVal] = useState("");
  function handleSearchClick() {
    if (searchVal === "") { setProducts(productList); return; }
    const filterBySearch = productList.filter((item) => {
        if (item.toLowerCase()
            .includes(searchVal.toLowerCase())) { return item; }
    })
    setProducts(filterBySearch);
  }


  const logo = "https://mrbeast.store/cdn/shop/files/mrbeaststore_logo_19e042b0-02a5-4a87-9185-9e89c3ed3095.png?v=1707751347&width=160";
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <div style={{zIndex: '999'}} className="bg-[#E74683] relative w-full flex justify-center items-center text-white font-semibold py-2">The ONLY Official MrBeast Merch Store</div>

    <Navbar className={`bg-white z-[999] flex justify-between text-black font-semibold transition-all duration-300 ${isScrolled? 'py-2' : 'py-4'}`} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link href="/">
          <img 
            className={`max-w-none transition-all duration-300 ease-in-out ${
              isScrolled ? 'h-[38px] mr-9' : 'h-[49px]'
            }`}
            src={logo} 
            alt="Logo" 
          />
        </Link>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-6 " justify="center">
        <NavbarItem className="bg-[#17C964] hover:bg-[#40ff93] duration-300 py-[2px] text-white px-3 rounded-full">
          <Link 
              href="news"
                className={`${GoldmanFont.className} text-[12px] text-dark font-medium no-underline hover:opacity-100 active:opacity-100 transition-none after:duration-300`}
          >
            NEW
          </Link>
        </NavbarItem>

        {navLinks.map((link) => (
          <NavbarItem key={link.name}>
            <Link 
              href={link.href}
              className={`${GoldmanFont.className} text-[12px] text-dark font-medium no-underline relative after:absolute after:bottom-[1px] after:left-0 after:w-full after:h-[1px] after:bg-[#E74683] hover:text-[#E74683] after:scale-x-0 hover:after:scale-x-100 after:transition-transform hover:opacity-100 active:opacity-100 transition-none after:duration-300`}
            >
              {link.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="ml-32">
        <div className="flex items-center gap-4">
          {/* Currency Selector */}
          <div ref={currencyDropDownRef} className="relative flex">
            <div className={`${GoldmanFont.className} tracking-wider flex items-center gap-2`}>
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
                    <span className={`${GoldmanFont.className}`}>{option.country} ({option.currency})</span>
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

      <NavbarItem className="flex cursor-pointer">
        <div onClick={handleClick}>
          <svg width="20px" height="20px" fill="#000000" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="icon icon-account tw-w-6 tw-h-6" viewBox="0 0 18 19">
            <path fillRule="evenodd" clipRule="evenodd" d="M6 4.5a3 3 0 116 0 3 3 0 01-6 0zm3-4a4 4 0 100 8 4 4 0 000-8zm5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15zM9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35z" fill="currentColor">
            </path>
          </svg>
        </div>
      </NavbarItem>

      <NavbarContent className="">
        <NavbarItem onClick={toggleDrawer(true)} className="-mr-14 flex cursor-pointer relative">
          <span className="bg-[#fff] border border-[#E74683] absolute inline-flex items-center px-1 -right-1 -top-0 font-serif rounded-full text-xs text-[#E74683]">{cartProduct.length}</span>
          <div className="absolute -z-10 bg-[#E74683] top-[5px] right-0 px-5 h-8 w-10 rounded-3xl"></div>
          <svg width="42px" height="42px" fill="#ffffff" className="!fill-white rounded-xl" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <path d="m15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.78-11.61zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1 -9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z" fill="#fff" fillRule="evenodd"></path>
          </svg>        
        </NavbarItem>

        {/* Swipeable Drawer */}
        <SwipeableDrawer
          anchor="right"
          className="relative"
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
