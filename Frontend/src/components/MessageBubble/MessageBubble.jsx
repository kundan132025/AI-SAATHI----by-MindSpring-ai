function MessageBubble({ sender, text }) {
  return (
    <div
      className={`mb-3 p-3 rounded-xl max-w-[70%] ${
        sender === "user"
          ? "ml-auto bg-blue-500 text-white"
          : "mr-auto bg-gray-200 text-black"
      }`}
    >
      <p className="whitespace-pre-wrap break-words">{text}</p>
    </div>
  );
}

export default MessageBubble;
