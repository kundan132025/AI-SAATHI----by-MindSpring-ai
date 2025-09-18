// src/components/MonthlyReport.jsx
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MonthlyReport({ monthlyData }) {
  if (!Array.isArray(monthlyData) || monthlyData.length === 0) {
    return <div>No monthly data available.</div>;
  }

  const chartData = {
    labels: monthlyData.map((m) => `Month ${m.month}`),
    datasets: [
      {
        label: "Avg Sentiment Score",
        data: monthlyData.map((m) => m.avgSentiment),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Avg Stress Level",
        data: monthlyData.map((m) => m.avgStress),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg w-full md:w-1/2">
      <h2 className="font-bold text-lg mb-2">📊 Monthly Mental Health Report</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}
