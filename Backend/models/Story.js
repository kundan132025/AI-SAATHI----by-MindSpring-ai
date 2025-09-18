const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true, index: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Story", StorySchema);
