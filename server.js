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


dotenv.config();
const app = express();
app.use(cors(

));
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
    res.send("Server is working");
});



const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} 🚀`));
  })
  .catch((err) => console.error(err));
