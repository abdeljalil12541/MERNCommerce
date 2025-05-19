import express from 'express';
import { createReview, getReviewByUser } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/create-review', createReview);
router.post('/get-reviews', getReviewByUser);


export default router;