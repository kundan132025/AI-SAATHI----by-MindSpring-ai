import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/user.js";

const callbackURL = process.env.NODE_ENV === 'production' 
  ? "https://ai-saathi-backend.onrender.com/api/auth/google/callback"
  : "http://localhost:5000/api/auth/google/callback";

console.log('🔗 Google OAuth callback URL:', callbackURL);
console.log('🌍 Environment:', process.env.NODE_ENV);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: "google",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
