import axios from "../utils/axios";

// Send message + trigger sentiment analysis
export const sendChatMessage = async (userId, message) => {
  const res = await axios.post("http://localhost:5000/api/chat/analyze", {
    userId,
    message,
  });
  return res.data;
};

// Fetch chat history for dashboard
export const getChatHistory = async (userId) => {
  const res = await axios.get(`http://localhost:5000/api/chat/history/${userId}`);
  return res.data;
};
