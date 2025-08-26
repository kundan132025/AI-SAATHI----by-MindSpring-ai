// Handles request → response flow

import { analyzeSentiment } from "../services/sentimentService.js";
import { getEmpatheticReply } from "../services/geminiService.js";

export async function chatHandler(req, res) {
  console.log("Gemini key loaded:", process.env.GEMINI_API_KEY?.slice(0, 5) + "...");
  try {
    const { message } = req.body;
    const emotion = await analyzeSentiment(message);
    const reply = await getEmpatheticReply(message, emotion);

    res.json({ emotion, reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI Saathi is having trouble." });
  }
}
