import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
export default function SleepBarChart({ data }) {
  return (
    <BarChart width={300} height={180} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#eee" />
      <Bar dataKey="hours" fill="#82ca9d" />
    </BarChart>
  );
}