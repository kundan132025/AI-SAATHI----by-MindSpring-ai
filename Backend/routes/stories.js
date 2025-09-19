import express from "express";
import Story from "../models/Story.js";

const router = express.Router();

// GET /api/stories?category=motivational
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== "all") filter.category = category;

    const stories = await Story.find(filter).sort({ createdAt: -1 }).limit(500);
    // Also return distinct categories for the client
    const categories = await Story.distinct("category");

    res.json({ stories, categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/stories (for admin or seed)
router.post("/", async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category)
      return res.status(400).json({ error: "Missing fields" });
    const story = new Story({ title, content, category });
    await story.save();
    res.status(201).json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
