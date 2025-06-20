import { RequestHandler, Request } from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Inbox from "../models/Inbox.js";

export const createOrder: RequestHandler = async (req, res): Promise<void> => {
  const { userId, cartProducts, customerInfo, paymentMethod, totalPrice } = req.body;

  try {
    // If cartProducts contains Cart _id(s), fetch full product snapshots from Cart(s)
    // For example, if you have just one cart ID:
    // (Adjust this logic if cartProducts contains multiple cart IDs)
    const fullCartData = await Cart.findOne({ _id: cartProducts[0] }); 

    if (!fullCartData) {
      res.status(400).json({ message: "Cart not found" });
      return; 
    }

    // Use products inside the cart as cartProducts for the order
    const orderCartProducts = fullCartData.products; // assuming Cart schema has 'products' field as an array of { productId, quantity, selectedSize }

    const newOrder = new Order({
      userId: userId || null,
      cartProducts: orderCartProducts,
      customerInfo,
      paymentMethod,
      totalPrice,
    });

    await newOrder.save();

    try {
      // Create inbox entry for order confirmation
      const newInbox = new Inbox({
        user: userId,
        status: 'orderUpcoming',
        message: `Your order #${String(newOrder._id).toUpperCase()} has been placed successfully! Total: $${totalPrice}`,
      });
      
      const savedInbox = await newInbox.save();
      console.log('Inbox entry saved successfully with ID:', savedInbox._id);

      // Optionally delete cart(s)
      await Cart.deleteMany({ userId });

      res.status(201).json({ 
        success: true, 
        orderId: newOrder._id, 
        orderData: newOrder,
        inbox: savedInbox
      });

    } catch (inboxError: unknown) {
      console.log("Error creating inbox entry:", inboxError);
      
      // Still respond with order created but note inbox error
      res.status(201).json({ 
        success: true, 
        orderId: newOrder._id, 
        orderData: newOrder,
        inboxError: inboxError instanceof Error ? inboxError.message : 'Unknown error'
      });
    }

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
  


 export const getOrdersByUser: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { userId } = req.body;

    const order = await Order.find({ userId })
      .populate({
        path: 'cartProducts.productId',  // populate productId inside each cartProduct
        model: 'Product',
        populate: {
          path: 'category',
          model: 'Category', // use your actual model name here
          select: 'name' // only get the category name (optional)
        }
      });

    res.status(201).json({ orders: order ? [order] : [] });
  } catch (err: any) {
    res.status(404).json({ message: err.message || 'problem fetching order objects' });
  }
}

  