require("dotenv").config();
const mongoose = require("mongoose");
const Story = require("./models/Story");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ai-saathi";

const seedStories = [
  {
    title: "Small Steps",
    category: "motivational",
    content: "Every mountain climb starts with one small step.",
  },
  {
    title: "Morning Calm",
    category: "relaxing",
    content: "Breathe in. Breathe out. The day will unfold.",
  },
  {
    title: "A Letter to Myself",
    category: "healing",
    content: "You are allowed to heal. One day at a time.",
  },
  {
    title: "Sunrise Promise",
    category: "mood freshening",
    content: "New day, new light. You can start over.",
  },
  {
    title: "Love in Small Things",
    category: "love",
    content: "Love appears in small, ordinary moments.",
  },
  {
    title: "After the Storm",
    category: "overcoming sadness",
    content: "Clouds pass. You are still here.",
  },
  {
    title: "Quiet Strength",
    category: "overcoming depression",
    content: "Strength is quiet, not loud. Keep going.",
  },
  {
    title: "Gentle Patience",
    category: "soothing",
    content: "Give yourself the kindness you give others.",
  },
  {
    title: "Reset",
    category: "overcoming frustration",
    content: "Step back, breathe, try again with steady hands.",
  },
];

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("Connected to Mongo, seeding...");
    await Story.deleteMany({});
    await Story.insertMany(seedStories);
    console.log("Seed complete");
    mongoose.disconnect();
  })
  .catch((err) => console.error(err));
