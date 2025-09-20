import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/google", (req, res, next) => {
  console.log('🔍 Google OAuth initiated');
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});

router.get(
  "/google/callback",
  (req, res, next) => {
    console.log('🔄 Google OAuth callback received');
    passport.authenticate("google", { 
      failureRedirect: "/login",
      failureMessage: true 
    })(req, res, next);
  },
  (req, res) => {
    try {
      console.log('✅ Google OAuth successful, user:', req.user?.email);
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      
      // Determine frontend URL based on environment
      const frontendUrl = process.env.NODE_ENV === 'production' 
        ? 'https://ai-saathi-by-mind-spring-ai-ancu.vercel.app' 
        : 'http://localhost:5173';
      
      console.log('🔗 Redirecting to:', `${frontendUrl}/chat?token=${token}`);
      res.redirect(`${frontendUrl}/chat?token=${token}`);
    } catch (error) {
      console.error('❌ OAuth callback error:', error);
      res.redirect('/login?error=oauth_failed');
    }
  }
);

export default router;
