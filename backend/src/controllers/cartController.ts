import { RequestHandler, Request } from 'express';
import mongoose from 'mongoose';
import Cart from '../models/Cart.js';

// Define the ICartItem interface directly in this file
interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  selectedSize: string;
}

// Extend the Express Request type to include user property
interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const addProductToCart: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
  const { productId, quantity, selectedSize } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (!productId || !quantity || !selectedSize) {
    res.status(400).json({ message: 'Missing required fields: productId, quantity, or selectedSize' });
    return;
  }

  try {
    let cart = await Cart.findOne({ userId }) || new Cart({ userId, products: [] });

    const itemIndex = cart.products.findIndex(
      (item: ICartItem) => item.productId.toString() === productId && item.selectedSize === selectedSize
    );

    if (itemIndex !== -1) {
      cart.products[itemIndex].quantity += quantity;
    } else {
      cart.products.push({ productId: new mongoose.Types.ObjectId(productId), quantity, selectedSize });
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('products.productId');
    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Error adding product to cart', err });
  }
};

export const getCart: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    res.status(200).json(cart || { userId, products: [] });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', err });
  }
};






// Add these functions to your cartController.ts file

export const updateCartItemQuantity: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
  const { productId, selectedSize, quantity } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (!productId || !selectedSize || quantity === undefined) {
    res.status(400).json({ message: 'Missing required fields: productId, selectedSize, or quantity' });
    return;
  }

  try {
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    const itemIndex = cart.products.findIndex(
      (item: ICartItem) => 
        item.productId.toString() === productId && 
        item.selectedSize === selectedSize
    );

    if (itemIndex === -1) {
      res.status(404).json({ message: 'Product not found in cart' });
      return;
    }

    // Update quantity
    cart.products[itemIndex].quantity = quantity;

    // Remove item if quantity is 0
    if (quantity <= 0) {
      cart.products.splice(itemIndex, 1);
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('products.productId');
    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart item quantity', err });
  }
};

export const removeCartItem: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
  const { productId, selectedSize } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (!productId || !selectedSize) {
    res.status(400).json({ message: 'Missing required fields: productId or selectedSize' });
    return;
  }

  try {
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    // Find the item index
    const itemIndex = cart.products.findIndex(
      (item: ICartItem) => 
        item.productId.toString() === productId && 
        item.selectedSize === selectedSize
    );

    if (itemIndex === -1) {
      res.status(404).json({ message: 'Product not found in cart' });
      return;
    }

    // Remove the item from the cart
    cart.products.splice(itemIndex, 1);

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('products.productId');
    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Error removing cart item', err });
  }
};