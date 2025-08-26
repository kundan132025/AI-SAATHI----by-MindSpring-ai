// Handles Gemini API calls

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getEmpatheticReply(message, emotion) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  // const language= await languageDetection(message);

  const prompt = `
  The user feels ${emotion}.
  
  Reply empathetically in simple, supportive language like a friend or big brother and also provide some solution to overcome his/her problem keep it simple not use high level of vocabalay.
  Keep response encouraging.
  User said: "${message}"
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
