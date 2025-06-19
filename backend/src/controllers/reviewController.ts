import { RequestHandler } from "express";
import Review from "../models/Review.js";
import { AuthRequest } from "../middleware/auth.js";
import Inbox from "../models/Inbox.js";

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

        const newInbox = new Inbox({
            user: userId,
            status: 'review',
            message: `Your review (${reviewTitle}) on [${product.title}] has been added successfully!`,
          });
          
        const savedInbox = await newInbox.save();
        console.log('Inbox entry saved successfully with ID:', savedInbox._id);

        res.status(201).json({ message: "review created successfully", newReview: newReview })
    } catch (error: unknown) {
        console.log("Error creating address:", error);
        res.status(201).json({ message: "review creation failed", error: error instanceof Error ? error.message : 'Unknown error' })
    }
}

export const getReviewByUser: RequestHandler = async (req, res): Promise<void> => {
    try {
        console.log("Request body:", req.body); // Debugging log
        const { userId } = req.body;
        
        if (!userId) {
            res.status(400).json({ message: 'userId is required' });
            return; 
        }
        
        console.log("Looking for reviews with user ID:", userId); // Debugging log
        
        // Find reviews where user field matches the userId
        const reviews = await Review.find({ user: userId })
            .populate('product')
            .populate('user')
            .lean(); // Using lean() for better performance
            
        console.log(`Found ${reviews.length} reviews:`, reviews); // Debugging log
            
        res.status(200).json({ // Changed from 201 to 200 for GET responses
            reviews: reviews.length > 0 ? [reviews] : [] 
        });
    } catch (err: any) {
        console.error("Error in getReviewByUser:", err); // Debugging log
        res.status(404).json({ 
            message: err.message || 'problem fetching review objects' 
        });
    }
}