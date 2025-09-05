import { useState } from "react";
import MessageBubble from "../components/MessageBubble/MessageBubble";
import TypingIndicator from "../components/TypingIndicator";
import { Menu, X } from "lucide-react"; // icons
import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import Navbar2 from "../components/Navbar/Navbar2";


function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSend = async () => {
  if (!input.trim()) return;

  // add user message
  setMessages((prev) => [...prev, { sender: "user", text: input }]);
  const userMessage = input;  // save before clearing
  setInput("");
  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Response JSON:", data);

    if (data.reply) {
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
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


  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-r from-pink-100 via-blue-100 to-pink-100">
          <Navbar2  />
    <div className="flex h-screen w-screen bg-white">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 bg-gray-900 text-white flex flex-col p-4">
          <h2 className="text-xl font-bold mb-4">History</h2>
          <div className="flex-1 overflow-y-auto space-y-2">
            {/* Example chat history */}
            <button className="w-full text-left px-3 py-2 rounded bg-gray-800 hover:bg-gray-700">
              Previous Chat 1
            </button>
            <button className="w-full text-left px-3 py-2 rounded bg-gray-800 hover:bg-gray-700">
              Previous Chat 2
            </button>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="mt-4 flex items-center justify-center px-3 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            <X size={18} className="mr-2" /> Close
          </button>
        </div>
      )}

      {/* Main chat area */}
      <div className="flex flex-col flex-1 h-screen">
        {/* Header */}
        <div className="sticky top-0 z-20 p-4 bg-gray-100 shadow flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            <Menu size={20} />
          </button>
          <h2 className="text-lg font-semibold">Chat Anonymous</h2>
          <button className="px-4 py-2 bg-linear-gradient(180deg, rgba(255,255,255,0.9), rgba(250,250,250,0.85)) text-black rounded-full border border-4 border-[rgba(0,0,0,0.7)] shadow-lg">
            AI SAATHI
          </button>
        </div>

        {/* Chat container */}
        <div className="flex-1 flex justify-center bg-[#e6e6fa]">
          <div className="w-full max-w-3xl flex flex-col">
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
        <div className="p-4 border-t bg-gray-100 rounded-full mb-10 flex items-center gap-2 shadow-lg sticky bottom-6">
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
        </div>

        <button
            onClick={() => {
            setMessages([]);
            fetch("http://localhost:5000/api/chat/reset", { method: "POST" }); 
        }}
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          New Chat
        </button>


            </div>
          </div>
        </div>
        </div>
      </div>
  );
}

export default Chat;
