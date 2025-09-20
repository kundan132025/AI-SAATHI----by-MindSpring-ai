import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/google", (req, res, next) => {
  console.log('🔍 Google OAuth initiated - Version 2.0 (Loop Fixed)');
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});

router.get(
  "/google/callback",
  (req, res, next) => {
    console.log('🔄 Google OAuth callback received');
    console.log('📋 Session ID:', req.sessionID);
    console.log('📋 Query params:', req.query);
    
    passport.authenticate("google", { 
      failureRedirect: "/login",
      failureMessage: true 
    })(req, res, next);
  },
  (req, res) => {
    try {
      if (!req.user) {
        console.error('❌ No user found in request after OAuth');
        const frontendUrl = process.env.NODE_ENV === 'production' 
          ? 'https://ai-saathi-by-mind-spring-ai-ancu.vercel.app' 
          : 'http://localhost:5173';
        return res.redirect(`${frontendUrl}/login?error=no_user`);
      }

      console.log('✅ Google OAuth successful, user:', req.user?.email);
      
      if (!process.env.JWT_SECRET) {
        console.error('❌ JWT_SECRET not found');
        throw new Error('JWT_SECRET not configured');
      }

      const token = jwt.sign({ 
        id: req.user._id,
        email: req.user.email,
        name: req.user.name 
      }, process.env.JWT_SECRET, { expiresIn: "7d" });
      
      // Determine frontend URL based on environment
      const frontendUrl = process.env.NODE_ENV === 'production' 
        ? 'https://ai-saathi-by-mind-spring-ai-ancu.vercel.app' 
        : 'http://localhost:5173';
      
      // Create URL with both token and user data as parameters
      const userData = encodeURIComponent(JSON.stringify({
        id: req.user._id,
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        provider: 'google'
      }));
      
      const redirectUrl = `${frontendUrl}/auth/callback?token=${token}&user=${userData}`;
      
      console.log('🔗 Redirecting to auth callback with token and user data - Loop Fix Applied');
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('❌ OAuth callback error:', error);
      const frontendUrl = process.env.NODE_ENV === 'production' 
        ? 'https://ai-saathi-by-mind-spring-ai-ancu.vercel.app' 
        : 'http://localhost:5173';
      res.redirect(`${frontendUrl}/login?error=oauth_failed&message=${encodeURIComponent(error.message)}`);
    }
  }
);

export default router;
