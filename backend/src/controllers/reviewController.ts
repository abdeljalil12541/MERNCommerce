import { RequestHandler } from "express";
import Review from "../models/Review.js";
import Order from "../models/Order.js";
import { AuthRequest } from "../middleware/auth.js";

export const createReview: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
    const { userId, product, reviewCount, reviewTitle, reviewDescription, image } = req.body;

    try {
        const newReview = new Review({ 
            user: userId, 
            product,
            reviewCount,
            reviewTitle, 
            reviewDescription, 
            image })
        await newReview.save();
        console.log("review created successfully with ID:", newReview._id);
        res.status(201).json({ message: "review created successfully", newReview: newReview })
    } catch (error: unknown) {
        console.log("Error creating address:", error);
        res.status(201).json({ message: "review creation failed", error: error instanceof Error ? error.message : 'Unknown error' })
    }
}

