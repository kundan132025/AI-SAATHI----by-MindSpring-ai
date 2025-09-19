import axios from "axios";

// Determine the API base URL based on environment
const getBaseURL = () => {
  // In production (Vercel), use environment variable or default production URL
  if (process.env.NODE_ENV === 'production') {
    return process.env.VITE_API_URL || 'https://your-render-service.onrender.com';
  }
  // In development, use local server
  return 'http://localhost:5000';
};

export default axios.create({
  baseURL: getBaseURL(),
  withCredentials: true, // Important for sessions/cookies
});
