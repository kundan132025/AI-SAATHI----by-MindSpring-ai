import axios from "../utils/axios";
import { API_BASE_URL } from "../config/api";

// Send message + trigger sentiment analysis
export const sendChatMessage = async (userId, message) => {
  const res = await axios.post(`${API_BASE_URL}/api/chat/analyze`, {
    userId,
    message,
  });
  return res.data;
};

// Fetch chat history for dashboard
export const getChatHistory = async (userId) => {
  const res = await axios.get(`${API_BASE_URL}/api/chat/history/${userId}`);
  return res.data;
};
