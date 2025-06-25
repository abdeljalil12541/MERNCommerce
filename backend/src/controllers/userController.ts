import User from '../models/User.js';
import Address from '../models/Address.js';
import bcrypt from 'bcryptjs';
import { Request, Response, RequestHandler } from 'express';
import { generateToken, verifyToken, JwtPayload } from '../utils/jwt.js';
import mongoose from 'mongoose';
import Inbox from '../models/Inbox.js';

export const createUser: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    console.log("User created successfully with ID:", newUser._id);

    try {
      // Check if connection is established before checking collections
      if (mongoose.connection.readyState === 1) {  // 1 = connected
        const db = mongoose.connection.db as any; // Type assertion
        const collections = await db.listCollections({ name: 'addresses' }).toArray();
        console.log("Address collection exists:", collections.length > 0);
      }

      // Auto-create blank address with better error handling
      const newAddress = new Address({
        user: newUser._id,  // Mongoose automatically handles this conversion
        name: "",
        street: "",
        city: "",
        postalCode: "",
        phone: ""
      });
      
      console.log("Address object created:", newAddress);
      const savedAddress = await newAddress.save();
      console.log("Address saved successfully with ID:", savedAddress._id);
      
      // Verify address was created with a direct query
      const verifyAddress = await Address.findById(savedAddress._id);
      console.log("Address verification result:", verifyAddress ? "Found" : "Not found");

      // Create inbox entry for registration
      const newInbox = new Inbox({
        user: newUser._id,
        status: 'register',
        message: `Welcome, ${username}! Your account has been created successfully.`,
      });
      const savedInbox = await newInbox.save();
      console.log('Inbox entry saved successfully with ID:', savedInbox._id);
      
      // Response
      res.status(201).json({
        message: 'User created with default address and inbox entry',
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email
        },
        address: savedAddress,
        inbox: savedInbox
      });
    } catch (addressOrInboxError: unknown) {
      console.log("Error creating address or inbox:", addressOrInboxError);
      
      // Still respond with user created but note address or inbox error
      res.status(201).json({
        message: 'User created but address or inbox creation failed',
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email
        },
        addressOrInboxError: addressOrInboxError instanceof Error ? addressOrInboxError.message : 'Unknown error'
      });
    }
  } catch (error: unknown) {
    console.log("Error in createUser:", error);
    res.status(500).json({ 
      message: 'Error creating user', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};


// Login user and return JWT
export const loginUser: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    const token = generateToken({
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin ?? false,
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Find all users (JSON API)
export const getAllUsers: RequestHandler = async (req, res): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Find all users (List View for EJS, JWT-protected)
export const listUsers: RequestHandler = async (req, res): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      res.status(401).render('error', { message: 'Unauthorized - Please log in' });
      return;
    }
    const users = await User.find().select('-password');
    res.render('users', { users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Find user by email
export const getUserByEmail: RequestHandler = async (req, res): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const { email } = req.params;
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};



export const getCurrentUser: RequestHandler = async (req, res): Promise<void> => {
  try {
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

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Fetch user's addresses
    const addresses = await Address.find({ user: decoded.id });

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      newsLetter: user.newsLetter,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      addresses, // Include addresses in the response
    });
  } catch (error) {
    console.log("Error in getCurrentUser:", error);
    res.status(500).json({ message: 'Error fetching user', error });
  }
};


// Logout route
export const logOut: RequestHandler = async (req: Request & { user?: JwtPayload }, res: Response) => {
  try {
    console.log('Logout request received:', req.headers.authorization); // Debug
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
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error });
  }
};



























// Update an address (unchanged, already works directly with Address)
export const updateAddress: RequestHandler = async (req, res): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided or invalid format' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token); // <-- Properly define decoded here
    if (!decoded) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    const { addressId } = req.params;
    const { name, street, city, postalCode, phone } = req.body;

    const address = await Address.findOne({ _id: addressId, user: decoded.id });
    if (!address) {
      res.status(404).json({ message: 'Address not found or not authorized' });
      return;
    }

    address.name = name || address.name;
    address.street = street || address.street;
    address.city = city || address.city;
    address.postalCode = postalCode || address.postalCode;
    address.phone = phone || address.phone;

    await address.save();
    res.status(200).json({ message: 'Address updated', address });
  } catch (error) {
    res.status(500).json({ message: 'Error updating address', error });
  }
};


export const updateUserInfo : RequestHandler = async (req, res): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided or invalid format' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token); // <-- Properly define decoded here
    if (!decoded) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    const { username, email } = req.body;
    
    const userInfo = await User.findOne({ _id: decoded.id });
    if (!userInfo) {
      res.status(404).json({ message: 'user info not found or not authorized'});
      return;
    }

    userInfo.username = username || userInfo.username;
    userInfo.email = email || userInfo.email;

    await userInfo.save();

    const newInbox = new Inbox({
      user: decoded.id, // Use the decoded user ID
      status: 'updatePersoInfos', // Changed from 'review' to 'info' since this is about profile updates
      message: `Your profile has been updated successfully!`,
    });

    const savedInbox = await newInbox.save();
    console.log('Inbox entry saved successfully with ID:', savedInbox._id);

    res.status(200).json({ message: 'user info updated', userInfo });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user info', err });
  }
}



export const updatePassword: RequestHandler = async (req, res): Promise<void> => {
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

  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findOne({ _id: decoded.id });
  if (!user) {
    res.status(404).json({ message: 'User not found or not authorized' });
    return;
  }

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  if (newPassword !== confirmPassword) {
    res.status(400).json({ message: 'New password and confirmation do not match' });
    return;
  }

  // Hash the new password manually
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

   // Create inbox notification for password update
   try {
    const newInbox = new Inbox({
      user: decoded.id,
      status: 'passwordChanged', // Different status for password updates
      message: `Your password has been updated successfully! Your account is now more secure.`,
    });

    const savedInbox = await newInbox.save();
    console.log('Password update inbox entry saved successfully with ID:', savedInbox._id);
  } catch (inboxError) {
    console.error('Error creating inbox notification for password update:', inboxError);
    // Continue with the response since password update was successful
  }

  res.status(200).json({ message: 'Password updated successfully' });
};



export const updateNewsLetterStatus: RequestHandler = async (req, res): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided or invalid format' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token); // <-- Properly define decoded here
    if (!decoded) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    const { newsLetter } = req.body;
    
    const userNewsLetterStatus = await User.findOne({ _id: decoded.id });
    if (!userNewsLetterStatus) {
      res.status(404).json({ message: 'user status not found or not authorized'});
      return;
    }

    userNewsLetterStatus.newsLetter = newsLetter || userNewsLetterStatus.newsLetter;

    await userNewsLetterStatus.save();
    res.status(200).json({ message: 'user status updated', userNewsLetterStatus });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user status', err });
  }
}