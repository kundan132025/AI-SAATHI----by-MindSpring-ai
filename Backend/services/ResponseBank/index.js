
import { sadResponses } from "./Sad.js";
import { stressResponses } from "./stress.js";
import { happyResponses } from "./happy.js";
import { crisisResponses } from "./crisis.js";

// Add microIdeas: small, creative, motivational ideas
const microIdeas = [
  "Try writing down one thing you're grateful for today.",
  "Step outside for 2 minutes and notice 3 things you see or hear.",
  "Send a quick 'hi' to a friend you haven't talked to in a while.",
  "Change your phone wallpaper to something that makes you smile!",
  "Do a silly dance for 30 seconds—no one is watching!",
  "Drink a glass of water and stretch your arms above your head.",
  "Write a positive note to yourself and keep it in your pocket.",
  "Try a 1-minute breathing exercise: inhale, hold, exhale slowly.",
  "Look at the sky for a moment and take a deep breath.",
  "Give yourself a small reward for making it through the day."
];

export const responseBank = {
  sad: sadResponses,
  stress: stressResponses,
  happy: happyResponses,
  crisis: crisisResponses,
  microIdeas
};
