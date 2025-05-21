import { RequestHandler } from "express";
import { AuthRequest } from "../middleware/auth.js";
import Wishlist from "../models/Wishlist.js";

export const createWishlist: RequestHandler = async (req, res): Promise<void> => {
    const { userId, product } = req.body;

    try {
        const newWishlist = new Wishlist({ 
            userId, 
            product
        })
        await newWishlist.save();
        console.log("wishlist created successfully with ID:", newWishlist._id);
        res.status(201).json({ message: "wishlist created successfully", newWishlist: newWishlist })
    } catch (error: unknown) {
        console.log("Error creating address:", error);
        res.status(201).json({ message: "wishlist creation failed", error: error instanceof Error ? error.message : 'Unknown error' })
    }
}


export const removeFromWishlist: RequestHandler = async (req, res): Promise<void> => {
    const { userId, product } = req.body;
  
    try {
      const deletedItem = await Wishlist.findOneAndDelete({ userId, product });
  
      if (!deletedItem) {
        res.status(404).json({ message: "Wishlist item not found" });
        return;
      }
  
      console.log("Wishlist item removed with ID:", deletedItem._id);
      res.status(200).json({ message: "Wishlist item removed successfully", deletedItem });
    } catch (error: unknown) {
      console.error("Error removing wishlist item:", error);
      res.status(500).json({
        message: "Failed to remove wishlist item",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
  

  export const getWishlistByUser: RequestHandler = async (req, res): Promise<void> => {
    const { userId } = req.params;
  
    try {
      const wishlist = await Wishlist.find({ userId }).populate('product'); // optionally populate
      res.status(200).json(wishlist);
    } catch (error: unknown) {
      console.error("Error fetching wishlist:", error);
      res.status(500).json({
        message: "Failed to fetch wishlist",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
  