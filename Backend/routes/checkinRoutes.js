import express from "express";
import Checkin from "../models/checkin.js";
import mongoose from "mongoose";
const router = express.Router();

// Submit daily check-in
router.post("/", async (req, res) => {
  const { userId, mood, sleep, stress } = req.body;
  const date = new Date().toISOString().slice(0, 10);
  // Only one check-in per user per day
  const existing = await Checkin.findOne({ userId: new mongoose.Types.ObjectId(userId), date });
  if (existing) return res.status(400).json({ error: "Already checked in today" });
  const checkin = await Checkin.create({ userId, date, mood, sleep, stress });
  res.json({ success: true, checkin });
});

// Get check-ins for user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const checkins = await Checkin.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ date: -1 });
  res.json({ checkins });
});

export default router;