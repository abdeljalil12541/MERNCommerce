import express from 'express';
import { createRecentlyVP, getRecentlyVPByUser } from '../controllers/recentlyVPController.js';

const router = express.Router();

router.post('/create-recently-viewed-products', createRecentlyVP);
router.post('/get-recently-viewed-products', getRecentlyVPByUser);


export default router;