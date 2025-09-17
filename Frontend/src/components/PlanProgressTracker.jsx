export default function PlanProgressTracker({ plan }) {
  if (!plan) return <div>No active plan. Start one!</div>;
  return (
    <div>
      <div>{plan.type} Plan: Day {plan.currentDay} of {plan.totalDays}</div>
      <progress value={plan.currentDay} max={plan.totalDays}></progress>
    </div>
  );
}