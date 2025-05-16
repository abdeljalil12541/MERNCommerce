import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRouter.js';
import categoriesRouter from './routes/categoriesRouter.js';
import productRouter from './routes/productsRouter.js';
import paymentRouter from './routes/paymentRouter.js';
import orderRouter from './routes/orderRouter.js';
import reviewRouter from './routes/reviewRouter.js';
import User from './models/User.js';
import { verifyToken, JwtPayload } from './utils/jwt.js';
import Address from './models/Address.js';

// Extend Express Request type
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend origin
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
// Handle preflight requests explicitly (optional, for debugging)
app.options('*', cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Log all incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Requested route:', req.method, req.url);
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Simple test route to get username
const testUsernameHandler: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided or invalid format' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  try {
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ username: user.username });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err });
  }
};

export const createTestAddress: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, street, city, postalCode, phone } = req.body;

    const newAddress = new Address({
      name: name || 'Default Tester',
      street: street || '456 Unique Lane',
      city: city || 'Sampleton',
      postalCode: postalCode || '98765',
      phone: phone || '111-222-3333',
    });

    await newAddress.save();

    res.status(201).json({
      message: 'Test address created',
      address: newAddress,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating test address', error });
  }
};

// Mount the route
app.get('/api/test-username', testUsernameHandler);

// Existing routes
app.use('/api/users', userRoutes);
app.use('/api', categoriesRouter);
app.use('/api', productRouter);
app.use('/api/cart', cartRoutes);
app.use('/api', paymentRouter);
app.use('/api/orders', orderRouter);
app.use('/api/reviews', reviewRouter);
console.log('User routes mounted at /api/users');

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Backend is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});