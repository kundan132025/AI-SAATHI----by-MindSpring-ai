// Handles request → response flow

// chatController.js
import { analyzeSentiment } from "../services/sentimentService.js";
import { getEmpatheticReply } from "../services/geminiService.js";

// Temporary in-memory storage (per session)
let chatHistory = [];

export async function chatHandler(req, res) {
  try {
     const { message } = req.body;


    // push user message into history
    chatHistory.push({ role: "user", content: message });

    const emotion = await analyzeSentiment(message);

    // Combine history into a prompt
    const { intent, reply, login_nudge } = await getEmpatheticReply(
        message,
        emotion,
        chatHistory
    );

    // push AI reply into history
    chatHistory.push({ role: "ai", content: reply });

    let finalReply = reply;
        if (login_nudge) {
          finalReply += "\n\n(👀 Waise bhai, login karega toh main tere progress track karke daily steps de paunga 🙂)";
        }

    res.json({ emotion, intent, reply: finalReply });

    
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI Saathi is having trouble." });
  }
}

export function resetChat(req, res) {
  chatHistory = [];
  res.json({ success: true });
}