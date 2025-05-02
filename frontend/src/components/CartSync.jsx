"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../lib/api';

const CartSync = () => {
  const { isAuthenticated, logout } = useAuth();
  const { cartProduct, setCartProduct } = useCart();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
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
            headers: { Authorization: `Bearer ${token}` },
          };

          // Fetch the current MongoDB cart
          const response = await api.get('/cart', config);
          const mongoCart = response.data.products || [];

          // Validate and filter localStorage items
          const itemsToAdd = cartProduct.filter((localItem) => {
            const isValid = localItem._id && localItem.quantity > 0 && localItem.selectedSize;
            if (!isValid) {
              console.warn('Invalid item skipped:', localItem);
              return false;
            }
            // Check if item already exists in MongoDB cart
            return !mongoCart.some(
              (mongoItem) =>
                mongoItem.productId._id.toString() === localItem._id.toString() &&
                mongoItem.selectedSize === localItem.selectedSize
            );
          });

          // Add only new items to MongoDB
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
              console.error('Failed to add item:', itemError.response?.data || itemError.message);
              // Continue with other items instead of failing the entire sync
            }
          }

          // Clear localStorage after attempting sync
          localStorage.removeItem('cart');

          // Refresh the MongoDB cart and update context
          const updatedCartResponse = await api.get('/cart', config);
          setCartProduct(updatedCartResponse.data.products || []);
          console.log('LocalStorage cart synced to MongoDB');
        } catch (err) {
          console.log('Error syncing cart:', err.response?.data || err.message);
          if (err.response?.status === 401) {
            alert('Authentication failed. Please log in again.');
            localStorage.removeItem('token');
            localStorage.removeItem('cart');
            logout();
          } else if (err.response?.status === 400) {
            alert('Invalid cart item data. Please clear your cart and try again.');
            localStorage.removeItem('cart');
          } else {
            alert('Failed to sync cart. Please try again later.');
          }
        } finally {
          setIsSyncing(false);
        }
      };

      syncLocalCartToMongoDB();
    }
  }, [isAuthenticated, cartProduct, setCartProduct, logout]);

  return null;
};

export default CartSync;