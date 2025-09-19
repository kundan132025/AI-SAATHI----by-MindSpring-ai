import axios from "axios";

// Determine the API base URL based on environment
const getBaseURL = () => {
  // In production, use the Render backend URL
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://ai-saathi-backend.onrender.com';
  }
  // In development, use localhost
  return 'http://localhost:5000';
};

export default axios.create({
  baseURL: getBaseURL(),
  withCredentials: true, // Important for sessions/cookies
});
