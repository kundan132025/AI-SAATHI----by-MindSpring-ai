import express from "express";
import mongoose from "mongoose";
import Plan from "../models/plan.js";

const router = express.Router();

/**
 * 📌 Start a new plan (7-day or 30-day)
 */
router.post("/start", async (req, res) => {
  try {
    const { userId, type } = req.body;
    if (!["7-day", "30-day"].includes(type)) {
      return res.status(400).json({ error: "Invalid plan type" });
    }

    const days = type === "7-day" ? 7 : 30;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + days);

    const progress = Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      completed: false,
      feedback: "",
    }));

    const plan = new Plan({
      userId: new mongoose.Types.ObjectId(userId),
      type,
      startDate,
      endDate,
      progress,
    });

    await plan.save();
    res.json({ success: true, plan });
  } catch (err) {
    console.error("Start Plan Error:", err);
    res.status(500).json({ error: "Failed to start plan" });
  }
});

/**
 * 📌 Update daily progress
 */
router.post("/progress/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { day, completed, feedback } = req.body;

    const plan = await Plan.findOne({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });
    if (!plan) return res.status(404).json({ error: "No active plan found" });

    const progressDay = plan.progress.find((p) => p.day === day);
    if (!progressDay) return res.status(400).json({ error: "Invalid day" });

    progressDay.completed = completed ?? progressDay.completed;
    progressDay.feedback = feedback ?? progressDay.feedback;

    await plan.save();
    res.json({ success: true, plan });
  } catch (err) {
    console.error("Update Progress Error:", err);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

/**
 * 📌 Get active plan
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const plan = await Plan.findOne({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });

    if (!plan) return res.json({ message: "No active plan" });

    res.json({ plan });
  } catch (err) {
    console.error("Get Plan Error:", err);
    res.status(500).json({ error: "Failed to fetch plan" });
  }
});

export default router;
