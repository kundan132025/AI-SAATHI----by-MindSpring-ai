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
      
      // Create a simple HTML page that handles the token and redirects
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Completing Login...</title>
        </head>
        <body>
          <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial;">
            <div style="text-align: center;">
              <h2>Completing Login...</h2>
              <p>Please wait while we complete your authentication.</p>
            </div>
          </div>
          <script>
            console.log('🔐 OAuth Callback: Storing user data...');
            
            // Store token
            localStorage.setItem('token', '${token}');
            
            // Store user data in the format expected by AuthContext
            const userData = {
              id: '${req.user._id}',
              _id: '${req.user._id}',
              email: '${req.user.email}',
              name: '${req.user.name}',
              token: '${token}',
              provider: 'google'
            };
            
            localStorage.setItem('user', JSON.stringify(userData));
            
            console.log('✅ OAuth Callback: Stored user:', userData);
            console.log('✅ OAuth Callback: Stored token:', '${token}'.substring(0, 20) + '...');
            
            // Redirect after a short delay
            setTimeout(() => {
              console.log('🔗 OAuth Callback: Redirecting to chat...');
              window.location.href = '${frontendUrl}/chat';
            }, 1500);
          </script>
        </body>
        </html>
      `;
      
      res.send(html);
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
