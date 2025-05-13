import { RequestHandler } from "express";
import Product from "../models/Product.js";

export const getAllProducts: RequestHandler = async (req, res): Promise<void> => {
    try {
        const products = await Product.find().select('-createdAt');
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "error fetching products", err });
    }
}