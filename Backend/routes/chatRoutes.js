import express from "express";
import Chat from "../models/chat.js";
import axios from "axios";
import { getAIResponse } from "../services/replyService.js";

const router = express.Router();

// POST chat message + run sentiment analysis
router.post("/analyze", async (req, res) => {
  try {
    const { userId, message } = req.body;

    // --- Call a cloud NLP API (Example: Google Cloud Natural Language API) ---
    const response = await axios.post(
      `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${process.env.GOOGLE_API_KEY}`,
      {
        document: {
          type: "PLAIN_TEXT",
          content: message,
        },
        encodingType: "UTF8",
      }
    );

    const sentiment = response.data.documentSentiment;
    const score = sentiment.score; // -1 (negative) to 1 (positive)
    const magnitude = sentiment.magnitude;

    // Convert into stressLevel for dashboard (example scale)
    let stressLevel = Math.round((1 - score) * 5 + magnitude);

    // 2. Get AI response (simulate or call your AI service)
    // Example: Call your own AI service or use a dummy reply
    // Replace this with your actual AI logic
    const aiResult = await getAIResponse(message); // <-- implement this function
    // aiResult = { emotion, intent, reply }

    // Save in DB
    const chat = new Chat({
      userId,
      message,
      response: aiResult.reply, // <-- Save AI reply
      sentiment: {
        mood: score > 0.2 ? "positive" : score < -0.2 ? "negative" : "neutral",
        score,
        stressLevel,
        emotion: aiResult.emotion,
      },
    });

    await chat.save();

    res.json({ success: true, chat });
  } catch (err) {
    console.error("Sentiment analysis error:", err.response?.data || err.message || err);
    res.status(500).json({ error: "Sentiment analysis failed" });
  }
});

router.get("/history/:userId", async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ chats });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

export default router;

