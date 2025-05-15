import express from 'express';
import { createOrder, getOrdersByUser, syncGuestCart } from '../controllers/orderController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/sync-guest-cart', syncGuestCart);
router.post('/get-orders', getOrdersByUser);

export default router;