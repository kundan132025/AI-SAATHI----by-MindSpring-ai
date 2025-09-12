// Backend/controllers/speechController.js
import fs from "fs";
import speech from "@google-cloud/speech";

const client = new speech.SpeechClient({
  keyFilename: "google-credentials.json", // downloaded key
});

export async function transcribeAudio(req, res) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No audio uploaded" });

    const audioBytes = fs.readFileSync(file.path).toString("base64");

    const request = {
  config: {
    encoding: "WEBM_OPUS",
    // sampleRateHertz: 48000,
    languageCode: "en-IN",  // Indian English
    alternativeLanguageCodes: ["hi-IN"], // fallback Hindi
  },
  audio: {
    content: audioBytes,
  },
};

    const [response] = await client.recognize(request);
    const transcript = response.results.map(r => r.alternatives[0].transcript).join("\n");

    res.json({ transcript });
  } catch (err) {
    console.error("Speech-to-Text error:", err);
    res.status(500).json({ error: "Speech recognition failed" });
  }
}
