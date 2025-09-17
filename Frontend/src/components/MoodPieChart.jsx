import { PieChart, Pie, Cell, Legend } from "recharts";
const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];
export default function MoodPieChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No mood data available.</div>;
  }

  return (
    <PieChart width={200} height={200}>
      <Pie data={data} dataKey="value" nameKey="mood" cx="50%" cy="50%" outerRadius={60} label>
        {data.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
      </Pie>
      <Legend />
    </PieChart>
  );
}