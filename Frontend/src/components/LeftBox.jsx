import React, { useState, useEffect, useRef } from "react";

const thoughts = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Happiness depends upon ourselves.", author: "Aristotle" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { text: "Don’t count the days, make the days count.", author: "Muhammad Ali" },
  { text: "Knowledge is power.", author: "Francis Bacon" },
  { text: "The purpose of life is a life of purpose.", author: "Robert Byrne" },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  { text: "Change your thoughts and you change your world.", author: "Norman Vincent Peale" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
  { text: "Opportunities don’t happen. You create them.", author: "Chris Grosser" },
  { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Failure is success in progress.", author: "Albert Einstein" },
  { text: "Your time is limited, don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { text: "The harder I work, the luckier I get.", author: "Gary Player" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "An unexamined life is not worth living.", author: "Socrates" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", author: "William Butler Yeats" },
];



export default function LeftBox() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % thoughts.length);
      }, 3000); // ⏱️ change every 3 sec
    }
    return () => clearInterval(intervalRef.current);
  }, [paused]);
     return (
    <div className="w-1/2 bg-blue-300 flex flex-col items-center justify-center relative p-6 text-center">
      <div className="absolute top-5 left-5">
        <span className="bg-white border border-gray-400 rounded-full px-4 py-1 text-sm font-semibold shadow">
          AI SAATHI
        </span>
      </div>

      {/* Quote Box */}
          <div
        className="flex flex-col justify-center items-center bg-purple-100 rounded-lg shadow-md w-60 h-72 p-4 text-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <p className="text-md italic font-serif text-gray-700 leading-relaxed break-words flex-1 flex items-center justify-center">
          “{thoughts[index].text}”
        </p>
        <p className="mt-3 text-sm font-semibold text-gray-900">
          — {thoughts[index].author}
        </p>
      </div>
    </div>
  );
}
