🌸 AI Saathi – Your Confidential Mental Wellness Companion

AI Saathi is an empathetic, AI-powered mental wellness assistant designed for youth in India.
It provides anonymous, stigma-free, multilingual support to help students and young adults manage stress, anxiety, and emotional challenges.

Built with Google Gemini AI (Generative AI on Vertex AI), AI Saathi goes beyond a generic chatbot — it listens with empathy, detects emotions, and guides users toward better mental well-being.


✨ Features
🟢 Essential (MVP)

🤖 Anonymous AI Chat – Youth can share feelings without judgment.

❤️ Empathetic Responses – Tailored supportive replies instead of generic chatbot text.

😔 Emotion & Sentiment Detection – Detects moods (happy, sad, stressed, anxious, angry, neutral).

🌐 Multilingual Support – Works in English + Hindi (with scope for regional languages).

🚨 Crisis Detection – If severe distress is detected, AI provides helpline resources instantly.

📱 Simple Chat UI – Clean, mobile-friendly chat interface.


🌟 Extra (Wow Factor)

📖 Journaling Mode – Write daily reflections, AI summarizes weekly mood trends.

🔔 Daily Wellness Nudges – Motivational tips, breathing reminders, positivity quotes, Weekly Report.

🎮 Gamification – Streaks, badges, and rewards for self-care.

🧘 Guided Self-Help Activities – AI suggests mindfulness or gratitude exercises.

🔊 Voice-to-Text + AI Voice Reply – Talk instead of typing.

📊 Anonymous Analytics (For NGOs/Experts) – Helps track youth mental health trends.




Frontend (React/Next.js) → Express Backend → Gemini AI API
         ↑                                      ↓
  User Messages → Emotion Detection → Empathetic Reply


Frontend: React (Chat UI, Emotion icons, Multilingual toggle)

Backend: Node.js + Express (API wrapper, routing, safety filters)

AI Core: Google Gemini (@google/generative-ai SDK) for chat + emotion detection

Database: MongoDB / Firebase (for journaling, analytics)


```
ai-saathi/
│── backend/                 
│   │── server.js
│   │── package.json
│   │── .env                # API key (ignored in Git)
│   │
│   ├── routes/
│   │   └── chat.js
│   ├── controllers/
│   │   └── chatController.js
│   ├── services/
│   │   ├── geminiService.js
│   │   └── sentimentService.js
│   └── utils/
│       └── logger.js
│
│── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   └── EmotionIcon.jsx
│   │   └── pages/Home.jsx
│   └── package.json
│
│── docs/
│   ├── architecture.png
│   └── README.md
│
│── .gitignore
│── README.md
```


Getting Started :-
1. Clone Repo
git clone https://github.com/your-username/ai-saathi.git
cd ai-saathi/backend

2. Install Dependencies
npm install

3. Setup .env
GEMINI_API_KEY=your_api_key_here
PORT=5000

4. Run Server
node server.js

Backend runs at → http://localhost:5000/api/chat

Test API (Postman)

POST → http://localhost:5000/api/chat
Body:
{ "message": "I feel exam stress" }
Response:
{
  "emotion": "stressed",
  "reply": "It's normal to feel exam stress. Take breaks, breathe deeply, and trust yourself."
}

🛠️ Tech Stack

Frontend: React / Next.js, Tailwind CSS

Backend: Node.js + Express

AI Core: Google Gemini (@google/generative-ai)

Database (optional): MongoDB / Firebase

Deployment: Vercel (frontend), Render/Google Cloud Run (backend)

🔒 Security & Ethics

✅ Anonymous by default – no personal info collected.

✅ Safety filters – block harmful or abusive AI replies.

✅ Crisis support – integrates helpline numbers in India.

👥 Team

Mindspring Ai – Hackathon 2025 (GenAI Exchange)

🌍 Impact

AI Saathi aims to destigmatize mental health for Indian youth by providing:

Confidential, stigma-free support

Affordable, always-available AI guidance

Early detection of emotional distress

⚡ “AI Saathi is not a replacement for professional help. It is a supportive companion that encourages self-care, positivity, and reaching out when needed.”
