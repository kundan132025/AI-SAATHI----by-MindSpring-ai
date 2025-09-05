import { GoogleGenerativeAI } from "@google/generative-ai";
import { responseBank } from "../services/ResponseBank/index.js";
import { isSimilar } from "./utils/novelty.js";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Simple intent detection (regex-based)
async function detectIntent(message) {
  // If message looks like a request for a plan/steps/solution, mark as solution intent
  const isSolution = /plan|guide|steps?|kaise|how to|solution|roadmap|improve|fix|help|problem|resolve|process|method|strategy/i.test(message);
  return {
    intent: isSolution ? "solution" : "vent",
    login_nudge: isSolution
  };
}


export async function getEmpatheticReply(message, emotion, history = [], session = {}) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 800,
      },
    });

    // Intent detection (use real Gemini, fallback regex only if needed)
    let { intent, login_nudge } = await detectIntent(message);
    if (!intent) {
      const isSolution = /plan|guide|steps?|kaise|how to/i.test(message);
      intent = isSolution ? "solution" : "vent";
      login_nudge = isSolution;
    }

    const conversation = history
      .map((h) => `${h.role === "user" ? "User" : "AI"}: ${h.content}`)
      .join("\n");

    const flavor =
      responseBank[emotion] &&
      responseBank[emotion][Math.floor(Math.random() * responseBank[emotion].length)];

    let replyPrompt = `
You are AI Saathi — dost + elder brother + light counsellor.  
Tone: friendly, empathetic, casual Hinglish. Always natural.

Conversation so far:
${conversation}

User just said: "${message}"  
Mood: ${emotion}  
Intent: ${intent}  

Rules:
- Sad → empathy + support + 1 coping tip + ${flavor}.
- Stressed → 1 quick relief + ask reason of stress + small strategy.
- Happy → celebrate 🎉, tease, motivate.
- Crisis → empathy + value reminder + trusted person + helpline (1800-599-0019 India). No casual jokes.

Guided practice: sometimes give a 30-sec mini exercise (breathing / grounding).
Roadmap: if intent=solution, reveal **Day 1 step only**. Next days only if user asks.
Variation: don’t repeat exact solutions. Add human touches.
Now reply:
    `;

    const result = await model.generateContent(replyPrompt);
    let raw = result?.response?.text()?.trim() || "";

    // // 💡 Inject Novel Idea sometimes (stressed/vent only)
    // if (emotion === "stressed" || intent === "vent") {
    //   const idea = pickNovelIdea(session, session.context || "general");
    //   raw += `\n\n💡 Extra idea: ${idea}`;
    // }

    // 🔄 Rotate login nudge only after Step 1 of a plan
    if (intent === "solution" && login_nudge && (session.stepIndex || 0) === 1) {
      raw += `\n\n${getNextNudge(session)}`;
    }

    return { intent, login_nudge, reply: raw };
  } catch (err) {
    console.error("Gemini error:", err);
    return { intent: "vent", login_nudge: false, reply: "Mujhe thoda issue aa raha hai 🚧, par tu tension mat le." };
  }
}


function pickNovelIdea(session, context) {
  const pool = responseBank.microIdeas || [];
  for (const idea of pool) {
    const used = session.usedIdeas || [];
    const dup = used.some(u => isSimilar(u, idea));
    if (!dup) {
      session.usedIdeas = [...used, idea].slice(-50);
      return idea;
    }
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

const LOGIN_NUDGES = [
  "Bhai, agar tu login kare toh main daily progress track karke aur customised steps bhej dunga 🙂.",
  "Soch, tujhe ek dashboard mile jisme progress dikh raha ho. Login karke dekh na 👀.",
  "Login se tera plan safe rahega aur main reminders bhej dunga — helpful hoga!",
  "Waise login karega toh main teri progress ko dekh ke aage ka plan aur precise bana dunga."
];

function getNextNudge(session){
  session.nudgeIdx = (session.nudgeIdx || 0) % LOGIN_NUDGES.length;
  const n = LOGIN_NUDGES[session.nudgeIdx];
  session.nudgeIdx = (session.nudgeIdx + 1) % LOGIN_NUDGES.length;
  return n;
}
