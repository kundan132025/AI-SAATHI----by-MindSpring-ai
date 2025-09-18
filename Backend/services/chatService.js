import axios from "axios";

export const sendChatMessage = async (userId, message) => {
  const res = await axios.post("http://localhost:5000/api/chat/analyze", {
    userId,
    message,
  });
  return res.data;
};

export const getChatHistory = async (userId) => {
  const res = await axios.get(`http://localhost:5000/api/chat/history/${userId}`);
  return res.data;
};

router.get("/history/:userId", async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ chats });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});
