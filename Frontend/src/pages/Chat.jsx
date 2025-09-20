import { useState, useContext, useEffect, useRef } from "react";
import MessageBubble from "../components/MessageBubble/MessageBubble";
import TypingIndicator from "../components/TypingIndicator";
import { Menu, X } from "lucide-react";
import Navbar2 from "../components/Navbar/Navbar2";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axios";
import { API_BASE_URL } from "../config/api";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);
  const messagesEndRef = useRef(null);
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Handle OAuth token - BACKUP FALLBACK for direct /chat?token= URLs
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      console.log('🔑 OAuth token received in Chat component (fallback):', token);
      try {
        localStorage.setItem('token', token);
        login(token);
        console.log('✅ User logged in successfully via OAuth fallback');
        // Clean up URL
        navigate('/chat', { replace: true });
      } catch (error) {
        console.error('❌ Failed to login with OAuth token:', error);
        navigate('/login?error=oauth_failed', { replace: true });
      }
    }
  }, [searchParams, navigate, login]);

  // Fetch previous chats for the user (simulate or fetch from backend)
  useEffect(() => {
    async function fetchChats() {
      if (!user) return;
      // Replace this with your real API endpoint for chat history
      const res = await fetch(`${API_BASE_URL}/api/chat/history/${user.id || user._id}`);
      if (res.ok) {
        const data = await res.json();
        setPreviousChats(data.chats || []);
      }
    }
    fetchChats();
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      login(token);
      // Remove token from URL for cleanliness
      window.history.replaceState({}, document.title, "/chat");
      // Optionally, navigate to /chat to refresh the component
      navigate("/chat", { replace: true });
    }
  }, [login, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const playVoice = async (text) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  } catch (err) {
    console.error("TTS Play Error:", err);
  }
};


  const handleSend = async () => {
  if (!input.trim()) return;

  // add user message
  setMessages((prev) => [...prev, { sender: "user", text: input }]);
  const userMessage = input;  // save before clearing
  setInput("");
  setLoading(true);



  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        userId: user?.id || user?._id, 
        message: userMessage 
      }),
    });

    const response_data = await fetch(`${API_BASE_URL}/api/chat/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        userId:  user?.id || user?._id, 
        message: userMessage 
      }),
    });

    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Response JSON:", data);

    if (data.reply) {
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
      playVoice(data.reply);
    } else {
      setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ No reply from AI." }]);
    }
  } catch (err) {
    console.error("Fetch error:", err);
    setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ Error connecting to server." }]);
  } finally {
    setLoading(false);
  }
};

  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null); // <-- add this
  let audioChunks = useRef([]);          // <-- add this

  const toggleRecording = async () => {
    if (!recording) {
      // Start recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "audio/webm" });
      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        audioChunks.current = [];

        const formData = new FormData();
        formData.append("audio", blob, "speech.webm");

        const response = await fetch(`${API_BASE_URL}/api/speech`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.transcript) {
          setInput(data.transcript);
          handleSend(); // send like text
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } else {
      // Stop recording
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };


  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home or login page
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-r from-blue-100 to-purple-100">
      <Navbar2 onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
      <div className="flex w-screen bg-white min-h-screen">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col p-4 z-50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold">Menu</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 bg-gray-900 rounded hover:bg-gray-700 border-none focus:outline-none"
              >
                <X size={18} />
              </button>
            </div>
            {/* Back to Home Button */}
            <Link to="/" className="mb-4">
              <button
                className="w-full flex items-center gap-2 px-3 py-2 rounded bg-white text-blue-700 font-semibold hover:bg-blue-100 border-none focus:outline-none"
              >
                <span className="text-lg">←</span> Back to Home
              </button>
            </Link>
            {user && (
              <button
                onClick={handleLogout}
                className="w-full mb-4 px-3 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold border-none focus:outline-none"
              >
                Logout
              </button>
            )}
            <h2 className="text-lg font-semibold mb-2">Previous Chats</h2>
            <div className="flex-1 overflow-y-auto space-y-2">
              {previousChats.length === 0 ? (
                <div className="text-gray-400">No previous chats yet.</div>
              ) : (
                previousChats.map((chat, idx) => (
                  <button
                    key={chat._id || idx}
                    className="w-full text-left px-3 py-2 rounded bg-gray-800 hover:bg-gray-700"
                  >
                    {chat.title || `Chat ${idx + 1}`}
                  </button>
                ))
              )}
            </div>
            {/* New Chat and Go to Dashboard at the bottom */}
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => {
                  setMessages([]);
                  fetch(`${API_BASE_URL}/api/chat/reset`, { method: "POST" });
                }}
                className="w-full px-3 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold border-none focus:outline-none"
              >
                New Chat
              </button>
              <div className="mt-auto">
                <Link to="/dashboard">
                  <button className="w-full px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold border-none focus:outline-none">
                    Go to Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main chat area */}
        <div className="flex flex-col flex-1">
          {/* Sidebar open button */}
          {/* Chat container */}
          <div className="flex-1 flex flex-col justify-end items-center bg-[#e6e6fa] pt-20">
            <div className="w-full max-w-3xl flex flex-col flex-1">
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, i) => (
                  <MessageBubble key={i} sender={msg.sender} text={msg.text} />
                ))}

                {loading && <TypingIndicator />}

                 {/* Dummy div for auto-scroll */}
                <div ref={messagesEndRef} />
            </div>
              {/* Input Bar */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl z-50 p-4 border-t bg-gray-100 rounded-full flex items-center gap-2 shadow-lg">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault(); // prevent newline
                        handleSend();       // just call it ✅
                    }
                }}
                placeholder="Ask Anything..."
                rows={1}
                className="flex-1 resize-none px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 overflow-hidden"
                style={{ minHeight: "40px", maxHeight: "150px" }}

            />

            <button
                onClick={handleSend}
                className="px-4 py-2 bg-pink-500 text-white rounded-2xl hover:bg-pink-600"
            >
                Send
            </button>
          <button
              onClick={toggleRecording}
              className={`px-4 py-2 ${recording ? "bg-red-500" : "bg-blue-500"} text-white rounded-2xl hover:bg-blue-600`}
            >
            {recording ? "⏹️ Stop" : "🎤 Speak"}
          </button>

        </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  );
}

export default Chat;
