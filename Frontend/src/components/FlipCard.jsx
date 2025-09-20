import React, { useState } from "react";

export default function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  const playVoice = async (text, event) => {
    event.stopPropagation(); // Prevent card from flipping
    
    try {
      if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        utterance.volume = 0.8;
        
        // Try to find a female voice
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('female') || 
          voice.name.toLowerCase().includes('zira') ||
          voice.name.toLowerCase().includes('susan')
        );
        
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.error("TTS Error:", err);
    }
  };

  return (
    <div
      className="relative w-full h-[160px] cursor-pointer perspective"
      onClick={() => setFlipped(f => !f)}
    >
      <div className={`transition-transform duration-500 w-full h-full ${flipped ? "rotate-y-180" : ""} relative preserve-3d`}>
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center bg-white rounded-2xl shadow p-4">
          <span className="text-green-900 italic text-sm sm:text-base text-center leading-tight break-words overflow-hidden flex-1 flex items-center">{front}</span>
          <button 
            onClick={(e) => playVoice(front, e)}
            className="mt-2 text-green-600 hover:text-green-800 text-xl"
            title="Listen to title"
          >
            🔊
          </button>
        </div>
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center bg-green-50 rounded-2xl shadow p-4">
          <span className="text-green-900 text-xs sm:text-sm text-center leading-tight break-words overflow-hidden max-h-full overflow-y-auto flex-1 flex items-center">{back}</span>
          <button 
            onClick={(e) => playVoice(back, e)}
            className="mt-2 text-green-600 hover:text-green-800 text-xl"
            title="Listen to story"
          >
            🔊
          </button>
        </div>
      </div>
      <style>{`
        .perspective { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}