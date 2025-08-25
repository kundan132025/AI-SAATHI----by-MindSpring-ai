import express from "express";
import fetch from "node-fetch";
import { GoogleAuth } from "google-auth-library";
import path from "path";

const router = express.Router();

const auth = new GoogleAuth({
  keyFile: path.join(process.cwd(), "key.json"), // your service account JSON
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Get access token
    const client = await auth.getClient();
    const token = await client.getAccessToken();

    // Call Gemini API
    const response = await fetch(
      "https://us-central1-aiplatform.googleapis.com/v1/projects/applied-might-469514-r9/locations/us-central1/publishers/google/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("API raw response:", data);

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't respond.";

    res.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
