//Emotion/Sentiment detection
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();

// Verify API key is loaded
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY not found in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeSentiment(message) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  Classify the user's emotion: "${message}"
  Options: [happy, sad, stressed, anxious, angry, neutral].
  Respond with only one word.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text().trim().toLowerCase();
}

async function languageDetection(message) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt_for_lang=`
  Classify the user's language from this text:"${message}"`;

  const result= await model.generateContent(prompt_for_lang);

  return result.response.text().trim().toLowerCase();
}