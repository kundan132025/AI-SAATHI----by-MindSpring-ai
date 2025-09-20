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
        console.log('🔍 Processing Google OAuth profile:', profile.emails?.[0]?.value);
        
        if (!profile.emails || !profile.emails[0]) {
          return done(new Error('No email found in Google profile'), null);
        }

        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          console.log('👤 Creating new user:', profile.emails[0].value);
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: "google",
          });
        } else {
          console.log('👤 Found existing user:', user.email);
        }

        return done(null, user);
      } catch (err) {
        console.error('❌ Passport strategy error:', err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('🔐 Serializing user:', user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log('🔓 Deserializing user:', id);
    const user = await User.findById(id);
    if (!user) {
      console.log('❌ User not found during deserialization:', id);
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    console.error('❌ Deserialization error:', err);
    done(err, null);
  }
});
