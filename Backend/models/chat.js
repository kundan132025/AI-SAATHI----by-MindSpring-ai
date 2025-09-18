import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    response: { type: String }, // <-- AI reply
    sentiment: {
      mood: String,
      score: Number,
      stressLevel: Number,
      emotion: String,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
