import axios from "axios";

// Determine the API base URL based on environment
const getBaseURL = () => {
  // Use environment variable in production, fallback to localhost in development
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true, // Important for sessions/cookies
});

export default axiosInstance;
