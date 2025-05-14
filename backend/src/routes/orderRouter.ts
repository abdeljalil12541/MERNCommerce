import express from 'express';
import { createOrder, syncGuestCart } from '../controllers/orderController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/sync-guest-cart', syncGuestCart);

export default router;