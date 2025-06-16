import express from 'express';
import { getInboxesByUser } from '../controllers/inboxController.js';

const router = express.Router();

router.post('/get-inboxes', getInboxesByUser);

export default router;