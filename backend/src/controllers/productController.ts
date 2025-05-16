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



export const getProductBySlug: RequestHandler = async (req, res): Promise<void> => {
    try {
      const { slug } = req.params;
      const product = await Product.findOne({ slug });
  
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
  
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: "Error fetching product", err });
    }
  };
  