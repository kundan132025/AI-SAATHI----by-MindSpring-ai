// import { motion } from "framer-motion"

// export default function FloatingBackground() {
//   return (
//     <div className="absolute inset-0 overflow-hidden -z-10">
//       {/* Pink balls */}
//       <motion.div
//         className="absolute top-0 left-0 w-40 h-40 bg-pink-300 rounded-full filter blur-2xl opacity-70"
//         animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
//         transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute bottom-10 left-20 w-72 h-72 bg-pink-400 rounded-full filter blur-3xl opacity-70"
//         animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
//         transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute top-1/2 right-10 w-60 h-60 bg-pink-300 rounded-full filter blur-2xl opacity-60"
//         animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
//         transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
//       />
//     </div>
//   )
// }

import React from "react";
import "./bubbles.css";

export default function FloatingBubbles() {
  return (
    <div className="bokeh">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`bubble bubble-${i + 1}`}
          style={{
            left: `${(i + 1) * 10}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

