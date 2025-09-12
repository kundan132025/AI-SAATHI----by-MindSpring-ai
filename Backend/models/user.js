import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for OAuth
  provider: { type: String, default: "local" }, // local | google
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
