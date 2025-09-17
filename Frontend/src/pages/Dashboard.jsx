// src/pages/Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import WeeklyReport from "../components/WeeklyReport";
import MonthlyReport from "../components/MonthlyReport";
import { Navigate } from "react-router-dom";
import StressLineChart from "../components/StressLineChart";
import SleepBarChart from "../components/SleepBarChart";
import MoodPieChart from "../components/MoodPieChart";
import PlanProgressTracker from "../components/PlanProgressTracker";
import Achievements from "../components/Achievements";
import AIInsights from "../components/AIInsights";
import Reminders from "../components/Reminders";
import ChatHistory from "../components/ChatHistory";
import DailyCheckinForm from "../components/DailyCheckinForm";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [stressData, setStressData] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [activePlan, setActivePlan] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [achievements, setAchievements] = useState({});
  const [aiInsights, setAIInsights] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedInToday, setCheckedInToday] = useState(false);

  // Fetch all dashboard data
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    async function fetchDashboard() {
      try {
        const userId = user._id || user.id;
        const res = await axios.get(`/dashboard/${userId}`);
        setWeeklyData(res.data.weeklyData || []);
        setMonthlyData(res.data.monthlyData || []);
        setStressData(res.data.stressData || []);
        setSleepData(res.data.sleepData || []);
        setMoodData(res.data.moodData || []);
        setActivePlan(res.data.activePlan ||[]);
        setAchievements(res.data.achievements || {});
        setAIInsights(res.data.aiInsights || []);
        setRecentChats(res.data.recentChats || []);
      } catch (err) {
        // fallback: show nothing or error
        setWeeklyData([]);
        setMonthlyData([]);
        setStressData([]);
        setSleepData([]);
        setMoodData([]);
        setActivePlan(null);
        setReminders([]);
        setAchievements({});
        setAIInsights([]);
        setRecentChats([]);
      }
      setLoading(false);
    }
    fetchDashboard();
    // Poll every 15s for real-time updates
    const interval = setInterval(fetchDashboard, 15000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    async function checkCheckin() {
      const res = await axios.get(`/checkin/${user._id || user.id}`);
      const today = new Date().toISOString().slice(0, 10);
      setCheckedInToday(res.data.checkins.some(c => c.date === today));
    }
    checkCheckin();
  }, [user]);

  if (!user) return <Navigate to="/login" />;
  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  return (
    <div className="bg-gray-100 min-h-screen w-screen px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">AI Chat Sentiment Dashboard</h1>
      <p className="mb-6 text-lg text-gray-600">An overview of your conversational sentiment analysis.</p>

      {/* AI Insights */}
      <AIInsights insights={aiInsights || []} />

      {/* Graphs/Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Stress Level (7 days)</h3>
          <StressLineChart data={stressData || []} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Sleep Hours</h3>
          <SleepBarChart data={sleepData || []} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Mood Trends</h3>
          <MoodPieChart data={moodData || []} />
        </div>
      </div>

      {/* Weekly/Monthly Reports */}
      <div className="flex flex-col md:flex-row gap-6 w-full mb-8">
        <div className="flex-1">
          <WeeklyReport weeklyData={weeklyData || []} />
        </div>
        <div className="flex-1">
          <MonthlyReport monthlyData={monthlyData || []} />
        </div>
      </div>

      {/* Plans/Reminders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold text-lg mb-2">🗓️ Active Plan</h2>
          <PlanProgressTracker plan={activePlan} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold text-lg mb-2">Reminders & Tips</h2>
          <Reminders reminders={reminders || []} />
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="font-bold text-lg mb-2">🏆 Achievements</h2>
        <Achievements streaks={achievements || {}} />
      </div>

      {/* Chat History (optional) */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="font-bold text-lg mb-2">Recent Conversations</h2>
        {recentChats.length === 0 ? (
          <div className="text-gray-500 flex items-center gap-2">
            <span role="img" aria-label="chat">💬</span> No recent chats yet. Start a conversation!
          </div>
        ) : (
          <ChatHistory chats={recentChats} />
        )}
      </div>

      {/* Daily Check-in Form */}
      {!checkedInToday && (
        <DailyCheckinForm userId={user._id || user.id} onSubmit={() => setCheckedInToday(true)} />
      )}
    </div>
  );
}

