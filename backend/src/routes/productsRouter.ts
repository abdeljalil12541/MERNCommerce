import express from 'express';
import { getAllProducts, getProductBySlug } from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:slug', getProductBySlug);


export default router;