import express from "express";
import { chatHandler } from "../controllers/chatController.js";

const router = express.Router();

// POST /api/chat - Main chat endpoint
router.post("/", chatHandler);

// GET /api/chat/history/:userId - Get chat history
router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // For now, return empty history - you can implement this based on your Chat model
    res.json({ chats: [] });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// POST /api/chat/reset - Reset chat
router.post("/reset", async (req, res) => {
  try {
    // Implement chat reset logic here
    res.json({ message: 'Chat reset successfully' });
  } catch (error) {
    console.error('Error resetting chat:', error);
    res.status(500).json({ error: 'Failed to reset chat' });
  }
});

export default router;


