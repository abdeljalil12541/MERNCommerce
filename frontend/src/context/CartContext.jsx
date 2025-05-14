"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../lib/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartProduct, setCartProduct] = useState([]);
  const [forceSync, setForceSync] = useState(false);
  const { isAuthenticated } = useAuth();
  const [cartId, setCartId] = useState('');

  // Load cart from localStorage only on initial mount or when not authenticated
  useEffect(() => {
    const loadCart = async () => {
      // If authenticated, load from MongoDB
      if (isAuthenticated) {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;
          
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const response = await api.get('/cart', config);
          setCartProduct(response.data.products || []);
          setCartId(response.data._id);
        } catch (err) {
          console.log('Failed to load cart from MongoDB:', err);
        }
      } 
      // If not authenticated, load from localStorage
      else {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCartProduct(JSON.parse(storedCart));
        }
      }
    };

    loadCart();
  }, [isAuthenticated]);

  // Sync to localStorage only when not authenticated
  useEffect(() => {
    if (!isAuthenticated && cartProduct.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartProduct));
    }
  }, [cartProduct, isAuthenticated]);

  // Function to trigger a force sync (used after login)
  const triggerSync = () => {
    setForceSync(prev => !prev); // Toggle to trigger useEffect in CartSync
  };

  // Clear force sync flag after 2 seconds
  useEffect(() => {
    if (forceSync) {
      const timer = setTimeout(() => {
        setForceSync(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [forceSync]);

  console.log('cart products: ', cartProduct)

  return (
    <CartContext.Provider value={{ 
      cartProduct, 
      setCartProduct, 
      forceSync, 
      triggerSync ,
      cartId,
      setCartId
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}