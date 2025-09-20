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
      
      // Try callback route first, fallback to chat route
      const callbackUrl = `${frontendUrl}/auth/callback?token=${token}`;
      const fallbackUrl = `${frontendUrl}/chat?token=${token}`;
      
      console.log('🔗 Primary redirect to:', callbackUrl);
      console.log('🔗 Fallback would be:', fallbackUrl);
      
      // For now, use direct chat redirect as it's more reliable
      res.redirect(fallbackUrl);
    } catch (error) {
      console.error('❌ OAuth callback error:', error);
      const frontendUrl = process.env.NODE_ENV === 'production' 
        ? 'https://ai-saathi-by-mind-spring-ai-ancu.vercel.app' 
        : 'http://localhost:5173';
      res.redirect(`${frontendUrl}/login?error=oauth_failed`);
    }
  }
);

export default router;
