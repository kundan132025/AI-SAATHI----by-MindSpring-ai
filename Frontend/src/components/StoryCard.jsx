import React, { useState } from "react";

export default function StoryCard({ story }) {
  const [flipped, setFlipped] = useState(false);

  if (!story) return null; // Defensive: skip if story is undefined/null

  return (
    <div
      className={`card ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") setFlipped((v) => !v);
      }}
    >
      <div className="card-front">
        <h3>{story.title || "No Title"}</h3>
        <p className="category">{story.category || "No Category"}</p>
      </div>
      <div className="card-back">
        <p>{story.content}</p>
      </div>
    </div>
  );
}
