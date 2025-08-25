import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("Api key");

async function analyzeSentiment(message) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  Classify the user's emotion from this text: "${message}"
  Categories: [happy, sad, stressed, anxious, angry, neutral].
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

async function replyWithEmpathy(message) {
  const emotion = await analyzeSentiment(message);
  const language= await languageDetection(message);
  const responsePrompt = `
  The user feels ${emotion}.
  user will want to chat in ${language}.
  Reply empathetically in simple, supportive language like a friend or big brother and also provide some solution to overcome his/her problem keep it simple not use high level of vocabalay.
  Keep response encouraging.
  User said: "${message}"
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(responsePrompt);

  console.log("Detected Emotion:", emotion);
  console.log("AI Reply:", result.response.text());
}

replyWithEmpathy("mujhe aapne career ko leke stress ho raha hai").catch(console.error);