import { RequestHandler } from "express";
import Category from "../models/Category.js";

export const getAllCategories: RequestHandler = async (req, res): Promise<void> => {
    try {
        const categories = await Category.find().select('-createdAt');
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: "error fetching categories", err });
    }
}