"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Import Auth context

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartProduct, setCartProduct] = useState([]);
  const { isAuthenticated } = useAuth(); // Get authentication state

  // Load cart from localStorage only on initial mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartProduct(JSON.parse(storedCart));
    }
  }, []);

  // Sync localStorage whenever cartProduct changes, but only if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(cartProduct));
    }
  }, [cartProduct, isAuthenticated]);

  return (
    <CartContext.Provider value={{ cartProduct, setCartProduct }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}