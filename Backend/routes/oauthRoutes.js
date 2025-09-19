import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    // Determine frontend URL based on environment
    const frontendUrl = process.env.NODE_ENV === 'production' 
      ? 'https://ai-saathi-by-mind-spring-ai-ancu.vercel.app' 
      : 'http://localhost:5173';
    
    res.redirect(`${frontendUrl}/chat?token=${token}`); // frontend redirect with token
  }
);

export default router;
