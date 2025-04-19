"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../lib/api';

const CartSync = () => {
  const { isAuthenticated } = useAuth();
  const { cartProduct, setCartProduct } = useCart();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Only run this once when the user logs in
    if (isAuthenticated && cartProduct.length > 0 && !isSyncing) {
      const syncLocalCartToMongoDB = async () => {
        setIsSyncing(true);
        try {
          // Get the token
          const token = localStorage.getItem('token');
          if (!token) {
            console.log('No token found');
            setIsSyncing(false);
            return;
          }

          // Setup authorization header
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };

          for (const item of cartProduct) {
            await api.post('/cart/add', {
              productId: item._id,
              quantity: item.quantity,
              selectedSize: item.selectedSize,
            }, config);
          }

          const response = await api.get('/cart', config);
          setCartProduct(response.data.products || []);
          localStorage.removeItem('cart');
          console.log('LocalStorage cart synced to MongoDB');
        } catch (err) {
          console.log('Error syncing cart:', err);
          alert('Failed to sync cart. Please try again.');
        } finally {
          setIsSyncing(false);
        }
      };

      syncLocalCartToMongoDB();
    }
  }, [isAuthenticated]); // Only depend on authentication state

  return null;
};

export default CartSync;