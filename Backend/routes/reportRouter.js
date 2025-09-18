import express from "express";
import mongoose from "mongoose";
import Chat from "../models/chat.js";

const router = express.Router();

/**
 * 📊 Weekly Report
 * Groups chats by week & year, calculates avg sentiment score and stressLevel
 */
router.get("/weekly/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const weeklyReport = await Chat.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { week: { $week: "$createdAt" }, year: { $year: "$createdAt" } },
          avgScore: { $avg: "$sentiment.score" },
          avgStress: { $avg: "$sentiment.stressLevel" },
          totalChats: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.week": -1 } },
    ]);

    res.json({ weeklyReport });
  } catch (err) {
    console.error("Weekly Report Error:", err);
    res.status(500).json({ error: "Failed to generate weekly report" });
  }
});

/**
 * 📊 Monthly Report
 * Groups chats by month & year
 */
router.get("/monthly/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const monthlyReport = await Chat.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          avgScore: { $avg: "$sentiment.score" },
          avgStress: { $avg: "$sentiment.stressLevel" },
          totalChats: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
    ]);

    res.json({ monthlyReport });
  } catch (err) {
    console.error("Monthly Report Error:", err);
    res.status(500).json({ error: "Failed to generate monthly report" });
  }
});

export default router;


