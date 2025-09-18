export default function AIInsights({ insights }) {
  if (!insights || !insights.length) return null;
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-8">
      <h2 className="font-bold text-lg mb-2">AI Insights</h2>
      <ul className="list-disc pl-6">
        {insights.map((msg, idx) => <li key={idx}>{msg}</li>)}
      </ul>
    </div>
  );
}