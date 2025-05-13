import express from 'express';
import { createPaymentIntent, handleWebhook } from '../controllers/paymentController.js';

const router = express.Router();

// Only keep the Stripe webhook route
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }), // Required for Stripe signature verification
  handleWebhook
);
router.post('/create-payment-intent', express.json(), createPaymentIntent);


export default router;
