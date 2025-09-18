import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
export default function StressLineChart({ data }) {
  return (
    <LineChart width={300} height={180} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#eee" />
      <Line type="monotone" dataKey="stress" stroke="#8884d8" />
    </LineChart>
  );
}