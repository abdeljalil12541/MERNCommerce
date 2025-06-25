import { RequestHandler } from "express";
import { AuthRequest } from "../middleware/auth.js";
import recentlyViewedProducts from "../models/RecentlyVP.js";


export const createRecentlyVP: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
    const { userId, product } = req.body;

    try {
        // Check if THIS USER has already viewed THIS PRODUCT
        const existingRecentlyVP = await recentlyViewedProducts.findOne({ 
            userId, 
            product 
        });
        
        if (existingRecentlyVP) {
            // User already viewed this product, just return it
            res.status(200).json({ 
                message: "Product already in recently viewed", 
                recentlyVP: existingRecentlyVP 
            });
            return;
        }

        // Create new record for this user-product combination
        const newRecentlyVP = new recentlyViewedProducts({
            userId,
            product,
        });
        
        await newRecentlyVP.save();
        
        console.log("newRecentlyVP created successfully with ID:", newRecentlyVP._id);
        res.status(201).json({ 
            message: "Recently viewed product created successfully", 
            recentlyVP: newRecentlyVP 
        });

    } catch (error: unknown) {
        console.log("Error creating newRecentlyVP:", error);
        res.status(500).json({ 
            message: "Recently viewed product creation failed", 
            error: error instanceof Error ? error.message : 'Unknown error' 
        });
    }
}


export const getRecentlyVPByUser: RequestHandler = async (req, res): Promise<void> => {
    try {
        console.log("Request body:", req.body); // Debugging log
        const { userId } = req.body;
        
        if (!userId) {
            res.status(400).json({ message: 'userId is required' });
            return;
        }
        
        console.log("Looking for recently viewed products with user ID:", userId); // Debugging log
        
        // Find recently viewed products where user field matches the userId
        const recentlyVPs = await recentlyViewedProducts.find({ userId: userId })
        .populate({
            path: 'product',  // populate the product field
            model: 'Product', // Use 'Product' (capital P) to match your export
            populate: {
                path: 'category',
                model: 'Category', // Make sure this matches your Category model name
                }
            })
            .populate('userId')
            .lean(); // Using lean() for better performance
        
        console.log(`Found ${recentlyVPs.length} recently viewed products:`, recentlyVPs); // Debugging log
        
        res.status(200).json({
            recentlyViewedProducts: recentlyVPs.length > 0 ? recentlyVPs : []
        });
    } catch (err: any) {
        console.error("Error in getRecentlyVPByUser:", err); // Debugging log
        res.status(500).json({
            message: err.message || 'problem fetching recently viewed products'
        });
    }
}