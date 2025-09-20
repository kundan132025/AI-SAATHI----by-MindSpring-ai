import express from "express";
import dotenv from "dotenv";
import chatRoutes from "./Backend/routes/chat.js";
import cors from "cors";
import speechRoutes from "./Backend/routes/speechRoutes.js";
import ttsRoutes from "./Backend/routes/index.js";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
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
  "http://localhost:3000", // Alternative local development
  "https://ai-saathi-by-mind-spring-ai-ancu.vercel.app", // Your main Vercel URL
];

// Add environment variable for production
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({ 
  origin: function (origin, callback) {
    console.log('🌍 Request origin:', origin);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check exact matches first
    if (allowedOrigins.includes(origin)) {
      console.log('✅ CORS allowed for:', origin);
      return callback(null, true);
    }
    
    // Check for Vercel preview URLs
    if (origin.includes('vercel.app') && origin.includes('ai-saathi-by-mind-spring')) {
      console.log('✅ CORS allowed for Vercel preview:', origin);
      return callback(null, true);
    }
    
    console.log('❌ CORS blocked origin:', origin);
    console.log('📝 Allowed origins:', allowedOrigins);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET || "ai-saathi-fallback-secret", 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      touchAfter: 24 * 3600, // lazy session update
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // HTTPS in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
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
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    corsOrigins: allowedOrigins
  });
});

// Debug endpoint to check OAuth configuration
app.get('/api/debug/oauth', (req, res) => {
  res.json({
    nodeEnv: process.env.NODE_ENV,
    callbackURL: process.env.NODE_ENV === 'production' 
      ? "https://ai-saathi-backend.onrender.com/api/auth/google/callback"
      : "http://localhost:5000/api/auth/google/callback",
    googleClientId: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET'
  });
});

// CORS test endpoint with detailed debugging
app.get('/api/test-cors', (req, res) => {
  console.log('🔍 CORS Test endpoint hit');
  console.log('📥 Origin:', req.headers.origin);
  console.log('📥 User-Agent:', req.headers['user-agent']);
  console.log('📥 All headers:', req.headers);
  
  res.json({
    message: "CORS test successful",
    origin: req.headers.origin,
    timestamp: new Date().toISOString(),
    corsEnabled: true
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
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`� CORS enabled for: ${allowedOrigins.join(', ')}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
