import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true, index: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Story", StorySchema);
