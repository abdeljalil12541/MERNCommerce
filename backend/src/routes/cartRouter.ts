// backend/src/routes/cart.ts
import express from 'express';
import { addProductToCart, getCart, removeCartItem, updateCartItemQuantity } from '../controllers/cartController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication middleware to protect these routes
router.post('/add', authenticateToken, addProductToCart);
router.get('/', authenticateToken, getCart);

router.post('/update-quantity', authenticateToken, updateCartItemQuantity);
router.post('/remove-item', authenticateToken, removeCartItem);

export default router;