import React from "react";
import StoryCard from "./StoryCard";

export default function FlashcardGrid({ stories = [] }) {
  if (!stories.length) return <div className="empty">No stories found.</div>;

  return (
    <div className="grid">
      {stories.map((s) => (
        <StoryCard key={s._id} story={s} />
      ))}
    </div>
  );
}
