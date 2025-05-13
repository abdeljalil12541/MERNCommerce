import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { createUser, loginUser, getAllUsers, listUsers, getUserByEmail, getCurrentUser, logOut, updateAddress, updateUserInfo, updatePassword, updateNewsLetterStatus } from '../controllers/userController.js';
import { verifyToken, JwtPayload } from '../utils/jwt.js';

const router = express.Router();

// // Middleware to authenticate requests
// const authenticateToken: RequestHandler = (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     res.status(401).json({ message: 'No token provided or invalid format' });
//     return;
//   }

//   const token = authHeader.split(' ')[1];
//   const decoded = verifyToken(token);
//   if (!decoded) {
//     res.status(401).json({ message: 'Invalid token' });
//     return;
//   }

//   req.user = decoded;
//   next();
// };

// Public routes
router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/logout', logOut); // Keep only this one logout route

// Protected routes
// router.use(authenticateToken);
router.get('/list', getAllUsers);
router.get('/list-view', listUsers);
router.get('/email/:email', getUserByEmail);
router.get('/me', getCurrentUser);


// Protected routes (require authentication)
router.put('/me/address/:addressId', updateAddress); // Update existing address
router.put('/me/user-info/:userId', updateUserInfo); // Update user informations
router.put('/me/update-password/:userId', updatePassword);
router.put('/me/update-user-newsletter-status/:userId', updateNewsLetterStatus);

export default router;