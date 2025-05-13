import Stripe from 'stripe';
import { Request, Response } from 'express';
import { RequestHandler } from 'express';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51OpZiJFHs1Gmgtcb4tfLJoVlcY6c15ZasfouYa4U0Pp4688mU7ZpwHrq1NcyjP9jnWnshfsPTFQ41kuZNxDTctLI00WW1PCIuT', {
  apiVersion: '2025-04-30.basil',
});

export const handleWebhook: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  let event: Stripe.Event;

  try {
    const rawBody = req.body.toString();
    const signature = req.headers['stripe-signature'];

    if (!signature) {
      console.error('Missing Stripe signature');
      res.status(400).json({ error: 'Missing Stripe signature' });
      return;
    }

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook error:', err);
    res.status(400).json({ error: `Webhook Error: ${errorMessage}` });
    return;
  }

  const permittedEvents = ['payment_intent.succeeded'];

  if (permittedEvents.includes(event.type)) {
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          const data = event.data.object as Stripe.PaymentIntent;
          console.log(`Payment succeeded. Status: ${data.status}, Amount: ${data.amount}`);
          // You can add logic here to update your DB or trigger emails
          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.error('Webhook handler error:', error);
      res.status(500).json({ error: 'Webhook handler failed' });
      return;
    }
  }

  res.status(200).json({ message: 'Received' });
};



// controller (paymentController.ts)

export const createPaymentIntent: RequestHandler = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // already in cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Failed to create payment intent', err);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};