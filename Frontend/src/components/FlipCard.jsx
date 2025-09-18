import React, { useState } from "react";

export default function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-[120px] cursor-pointer perspective"
      onClick={() => setFlipped(f => !f)}
    >
      <div className={`transition-transform duration-500 w-full h-full ${flipped ? "rotate-y-180" : ""} relative preserve-3d`}>
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-white rounded-2xl shadow p-6">
          <span className="text-green-900 italic text-lg text-center">{front}</span>
        </div>
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-green-50 rounded-2xl shadow p-6">
          <span className="text-green-900 text-lg text-center">{back}</span>
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