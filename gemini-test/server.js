// server.js
import express from "express";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";

dotenv.config();
const app = express();

app.use(express.json()); // to parse JSON request body

// Routes
app.use("/api", chatRoutes);

app.get("/", (req, res) => {
  res.send("✅ AI Saathi Backend is Running!");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
