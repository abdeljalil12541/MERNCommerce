import { RequestHandler, Request } from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder: RequestHandler = async (req, res): Promise<void> => {
    const { userId, cartProducts, customerInfo, paymentMethod, totalPrice } = req.body;

    try {
        const newOrder = new Order({
            userId: userId || null,
            cartProducts,
            customerInfo,
            paymentMethod,
            totalPrice,
        });
    
        await newOrder.save();
        
        // ✅ Delete cart items for this user
        await Cart.deleteMany({ userId });
        
        res.status(201).json({ success: true, orderId: newOrder._id, orderData: newOrder });
    } catch (err: any) {
        res.status(400).json({ message: err.message || 'Failed to create order' });
    }
}

// routes/cart.ts (or wherever your routes are)
export const syncGuestCart: RequestHandler = async (req, res): Promise<void> => {
    try {
      const { products } = req.body;
  
      if (!products || !Array.isArray(products)) {
        res.status(400).json({ message: 'Invalid cart data' });
        return; 
      }
  
      const newCart = new Cart({
        userId: null, // guest user
        products,
      });
  
      await newCart.save();
  
      res.status(201).json({ cartId: newCart._id });
      return; 
    } catch (err) {
      console.error('Error syncing guest cart:', err);
      res.status(500).json({ message: 'Internal server error' });
      return; 
    }
  };
  