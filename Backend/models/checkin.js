import mongoose from "mongoose";

const checkinSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, // e.g. "2025-09-16"
  mood: { type: String, required: true },
  sleep: { type: Number, required: true }, // hours
  stress: { type: Number, required: true }, // 1-10
});

export default mongoose.model("Checkin", checkinSchema);