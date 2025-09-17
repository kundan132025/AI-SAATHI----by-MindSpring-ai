import express from "express";
import Chat from "../models/chat.js";
const router = express.Router();

// Helper: group chats by day for the last 7 days
function getWeeklyData(chats) {
  const days = {};
  chats.forEach(chat => {
    const day = chat.createdAt.toISOString().slice(0, 10);
    if (!days[day]) days[day] = [];
    days[day].push(chat);
  });
  return Object.entries(days).map(([date, chats]) => ({
    date,
    avgSentiment: (
      chats.reduce((sum, c) => sum + (c.sentiment?.score || 0), 0) / chats.length
    ).toFixed(2),
    avgStress: (
      chats.reduce((sum, c) => sum + (c.sentiment?.stressLevel || 0), 0) / chats.length
    ).toFixed(2),
    count: chats.length,
  }));
}

// Helper: mood pie chart data
function getMoodData(chats) {
  const moodCounts = {};
  chats.forEach(chat => {
    const mood = chat.sentiment?.mood || "neutral";
    moodCounts[mood] = (moodCounts[mood] || 0) + 1;
  });
  return Object.entries(moodCounts).map(([mood, value]) => ({ mood, value }));
}

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const chats = await Chat.find({ userId }).sort({ createdAt: -1 });

  // Weekly data (last 7 days)
  const weeklyData = getWeeklyData(chats.slice(0, 30)); // last 30 chats for demo

  // Mood data for pie chart
  const moodData = getMoodData(chats);

  // Recent chats
  const recentChats = chats.slice(0, 7).map(chat => ({
    date: chat.createdAt,
    message: chat.message,
    response: chat.response,
    sentiment: chat.sentiment,
  }));

  // Example placeholders for other sections
  const monthlyData = []; // implement if needed
  const stressData = weeklyData.map(d => ({ date: d.date, stress: d.avgStress }));
  const sleepData = []; // if you collect sleep info
  const aiInsights = ["This week, your average stress is lower than last week."];
  const reminders = ["Daily meditation at 8pm"];
  const achievements = { meditation: 5, journaling: 3, stressCheck: 7 };
  const activePlan = null; // implement if you have plans

  res.json({
    weeklyData,
    monthlyData,
    stressData,
    sleepData,
    moodData,
    recentChats,
    aiInsights,
    reminders,
    achievements,
    activePlan,
  });
});

export default router;