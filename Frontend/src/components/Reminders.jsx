export default function Reminders({ reminders }) {
  if (!reminders || !reminders.length) return <div>No reminders.</div>;
  return (
    <ul className="list-disc pl-6">
      {reminders.map((r, idx) => <li key={idx}>{r}</li>)}
    </ul>
  );
}