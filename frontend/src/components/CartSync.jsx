"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../lib/api';

const CartSync = () => {
  const { isAuthenticated, logout } = useAuth();
  const { cartProduct, setCartProduct, forceSync } = useCart(); // Added forceSync from updated CartContext
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);

  // Function to fetch cart from MongoDB
  const fetchMongoDBCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await api.get('/cart', config);
      return response.data;
    } catch (err) {
      console.error('Error fetching cart:', err);
      if (err.response?.status === 401) {
        logout();
      }
      return null;
    }
  };

  // Sync local cart to MongoDB
  const syncToMongoDB = async () => {
    if (!isAuthenticated || isSyncing) return;
    
    setIsSyncing(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsSyncing(false);
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await api.get('/cart', config);
      const mongoCart = response.data.products || [];

      // Get local cart items
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Find unique items to add
      const itemsToAdd = localCart.filter((localItem) => {
        const isValid = localItem._id && localItem.quantity > 0 && localItem.selectedSize;
        if (!isValid) return false;
        
        return !mongoCart.some(
          (mongoItem) =>
            mongoItem.productId._id.toString() === localItem._id.toString() &&
            mongoItem.selectedSize === localItem.selectedSize
        );
      });

      // Add items to MongoDB
      for (const item of itemsToAdd) {
        try {
          await api.post(
            '/cart/add',
            {
              productId: item._id,
              quantity: item.quantity,
              selectedSize: item.selectedSize,
            },
            config
          );
        } catch (itemError) {
          console.error('Failed to add item:', itemError);
        }
      }

      // Clear localStorage cart
      localStorage.removeItem('cart');
      
      // Fetch updated cart from MongoDB
      const updatedCart = await fetchMongoDBCart();
      if (updatedCart) {
        setCartProduct(updatedCart.products || []);
      }
      
      setHasSynced(true);
      console.log('Cart synced successfully');
    } catch (err) {
      console.error('Sync error:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Sync when authenticated with local cart items
  useEffect(() => {
    if (isAuthenticated && !hasSynced && cartProduct.length > 0) {
      syncToMongoDB();
    }
  }, [isAuthenticated, hasSynced, cartProduct.length]);

  // Reset sync flag when logged out
  useEffect(() => {
    if (!isAuthenticated) {
      setHasSynced(false);
    }
  }, [isAuthenticated]);

  // Handle forced sync requests from CartContext
  useEffect(() => {
    if (forceSync && isAuthenticated) {
      // Reset hasSynced to allow a new sync
      setHasSynced(false);
    }
  }, [forceSync, isAuthenticated]);

  return null;
};

export default CartSync;