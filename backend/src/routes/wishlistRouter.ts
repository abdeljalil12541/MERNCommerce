import express from 'express';
import { createWishlist, getWishlistByUser, removeFromWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

router.post('/add-to-wishlist', createWishlist);
router.post('/remove-from-wishlist', removeFromWishlist);
router.get('/:userId', getWishlistByUser);


export default router;