import { synthesizeSpeech } from "../services/ttsService.js";

export async function ttsHandler(req, res) {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const audioBuffer = await synthesizeSpeech(text);

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(audioBuffer); // Send buffer directly
  } catch (err) {
    console.error("TTS Error:", err);
    res.status(500).json({ error: "Text-to-Speech failed" });
  }
}