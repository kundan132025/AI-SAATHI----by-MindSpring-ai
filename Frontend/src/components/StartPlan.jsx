import React from "react";
import axios from "axios";

const StartPlan = ({ userId, refreshPlan }) => {
  const startPlan = async (type) => {
    try {
      await axios.post("http://localhost:5000/api/plan/start", {
        userId,
        type,
      });
      refreshPlan(); // re-fetch plan after creation
    } catch (err) {
      console.error("Start Plan error:", err);
    }
  };

  return (
    <div>
      <h3>Start a New Plan</h3>
      <button onClick={() => startPlan("7-day")}>Start 7-Day Plan</button>
      <button onClick={() => startPlan("30-day")}>Start 30-Day Plan</button>
    </div>
  );
};

export default StartPlan;
