import React, { useState } from "react";
import axios from "../utils/axios";

export default function DailyCheckinForm({ userId, onSubmit }) {
  const [mood, setMood] = useState("");
  const [sleep, setSleep] = useState("");
  const [stress, setStress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/checkin", { userId, mood, sleep, stress });
      setSuccess(true);
      onSubmit && onSubmit();
    } catch (err) {
      setError(err.response?.data?.error || "Error submitting check-in");
    }
  };

  if (success) return <div className="mb-4 text-green-600">Check-in complete! 🎉</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="font-bold text-lg mb-2">Daily Check-In</h2>
      <div className="mb-2">
        <label>Mood: </label>
        <select value={mood} onChange={e => setMood(e.target.value)} required>
          <option value="">Select mood</option>
          <option value="happy">Happy</option>
          <option value="neutral">Neutral</option>
          <option value="sad">Sad</option>
          <option value="stressed">Stressed</option>
        </select>
      </div>
      <div className="mb-2">
        <label>Sleep (hours): </label>
        <input type="number" min="0" max="24" value={sleep} onChange={e => setSleep(e.target.value)} required />
      </div>
      <div className="mb-2">
        <label>Stress (1-10): </label>
        <input type="number" min="1" max="10" value={stress} onChange={e => setStress(e.target.value)} required />
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}