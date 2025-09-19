import express from "express";
import dotenv from "dotenv";
import chatRoutes from "./Backend/routes/chat.js";
import cors from "cors";
import speechRoutes from "./Backend/routes/speechRoutes.js";
import ttsRoutes from "./Backend/routes/index.js";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import authRoutes from "./Backend/routes/authRoutes.js";
import oauthRoutes from "./Backend/routes/oauthRoutes.js";
import "./Backend/config/passport.js"; // load passport config
import chatRoutes2 from "./Backend/routes/chatRoutes.js";
import reportRouter from "./Backend/routes/reportRouter.js";
import planRouter from "./Backend/routes/planRouter.js";
import dashboardRoutes from "./Backend/routes/dashboardRoutes.js"; // Import the dashboard routes
import checkinRoutes from "./Backend/routes/checkinRoutes.js";
import storiesRoutes from "./Backend/routes/stories.js";
import { ttsHandler } from "./Backend/controllers/ttsController.js";

dotenv.config();
const app = express();

// Configure CORS for both development and production
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://your-vercel-app.vercel.app", // Replace with your actual Vercel URL
  process.env.FRONTEND_URL // Environment variable for production
].filter(Boolean);

app.use(cors({ 
  origin: allowedOrigins,
  credentials: true 
}));
app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET, 
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use("/api/chat", chatRoutes);
app.use("/api", speechRoutes);
app.use("/api", ttsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth", oauthRoutes);
app.get("/api/auth/google", (req, res, next) => {
  console.log("Google auth route hit");
  next();
}, passport.authenticate("google", { scope: ["profile", "email"] }));
app.get('/' , (req,res)=>{
  res.json({
    message: "AI Saathi Backend API is running!",
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "healthy",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/chat", chatRoutes2);
app.use("/api/report", reportRouter);
app.use("/api/plan", planRouter);
app.use("/api/dashboard", dashboardRoutes); // Use the dashboard routes
app.use("/api/checkin", checkinRoutes);
app.use("/api/stories", storiesRoutes);
app.post("/api/tts", ttsHandler);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected ✅");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
  })
  .catch((err) => console.error(err));
