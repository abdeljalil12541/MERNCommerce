import { RequestHandler } from "express";
import Inbox from "../models/Inbox.js";

export const getInboxesByUser: RequestHandler = async (req, res): Promise<void> => {
    try {
      const { userId } = req.body;
  
      const inbox = await Inbox.find({ user: userId }).sort({ createdAt: -1 })
  
      res.status(201).json({ inboxes: inbox ? [inbox] : [] });
    } catch (err: any) {
      res.status(404).json({ message: err.message || 'problem fetching order objects' });
    }
  }