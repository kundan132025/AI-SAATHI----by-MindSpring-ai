import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["7-day", "30-day"], required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  progress: [
    {
      day: Number,
      completed: { type: Boolean, default: false },
      feedback: String,
    },
  ],
});

export default mongoose.model("Plan", PlanSchema);
