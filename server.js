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
      touchAfter: 24 * 3600,
      mongoOptions: {
        serverSelectionTimeoutMS: 60000,
        socketTimeoutMS: 60000,
        connectTimeoutMS: 60000,
        retryWrites: true,
        retryReads: true,
      },
      // Allow fallback to memory if MongoDB fails
      fallbackMemory: false, // Set to false to force MongoDB usage
      autoReconnect: true,
      lazyConnect: true, // Connect only when needed
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware to check database connection for routes that need it
const checkDBConnection = (req, res, next) => {
  // Temporarily disable DB check to allow app to function
  // TODO: Re-enable once MongoDB connection is stable
  /*
  const dbRequired = req.path.includes('/api/auth') || 
                    req.path.includes('/api/stories') || 
                    req.path.includes('/api/chat') ||
                    req.path.includes('/api/checkin') ||
                    req.path.includes('/api/dashboard') ||
                    req.path.includes('/api/plan') ||
                    req.path.includes('/api/report');
  
  if (dbRequired && mongoose.connection.readyState !== 1) {
    console.log(`⚠️ Database required for ${req.path} but not connected`);
    return res.status(503).json({ 
      error: "Database temporarily unavailable", 
      message: "Please try again in a moment",
      retryAfter: 10 
    });
  }
  */
  
  next();
};

app.use(checkDBConnection);


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
  const dbStatus = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'disconnected',
    1: 'connected', 
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.status(200).json({
    status: "healthy",
    server: "running",
    database: dbStatusMap[dbStatus] || 'unknown',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Simple root endpoint for basic health check
app.get('/', (req, res) => {
  res.json({
    message: "AI Saathi Backend is running!",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// Test endpoint that doesn't require database
app.get('/api/test', (req, res) => {
  res.json({
    message: "API is working",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
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
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET',
    jwtSecret: process.env.JWT_SECRET ? 'SET' : 'NOT SET',
    mongoUri: process.env.MONGO_URI ? 'SET' : 'NOT SET',
    sessionId: req.sessionID,
    user: req.user || 'No user in session'
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

// Start server immediately, don't wait for MongoDB
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for: ${allowedOrigins.join(', ')}`);
});

// Connect to MongoDB with timeout and retry logic
const connectWithRetry = () => {
  const mongoOptions = {
    serverSelectionTimeoutMS: 60000, // 60 seconds timeout
    socketTimeoutMS: 60000, // 60 seconds socket timeout
    connectTimeoutMS: 60000, // 60 seconds to establish connection
    maxPoolSize: 50, // Maintain up to 50 socket connections
    retryWrites: true,
    retryReads: true,
  };

  console.log('🔗 Attempting to connect to MongoDB...');
  console.log('🌐 MongoDB URI exists:', !!process.env.MONGO_URI);
  
  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI environment variable is not set');
    setTimeout(connectWithRetry, 5000);
    return;
  }
  
  mongoose
    .connect(process.env.MONGO_URI, mongoOptions)
    .then(() => {
      console.log("✅ MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
      console.log("🔄 Retrying MongoDB connection in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    });
};

// Initial connection attempt
connectWithRetry();

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose.connection.on('disconnected', () => {
  console.log('📴 MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 MongoDB error:', err);
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected successfully');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📤 SIGTERM received');
  server.close(() => {
    console.log('🔄 Process terminated');
    mongoose.connection.close(false, () => {
      console.log('📴 MongoDB connection closed');
      process.exit(0);
    });
  });
});
