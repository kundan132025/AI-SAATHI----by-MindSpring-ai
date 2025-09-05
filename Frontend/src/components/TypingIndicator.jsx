function TypingIndicator() {
  return (
    <div className="mr-auto bg-gray-200 text-black px-3 py-2 rounded-xl flex gap-1">
      <span className="animate-bounce">.</span>
      <span className="animate-bounce delay-150">.</span>
      <span className="animate-bounce delay-300">.</span>
    </div>
  );
}

export default TypingIndicator;
