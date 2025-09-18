export default function Achievements({ streaks }) {
  if (!streaks) return null;
  return (
    <div>
      <div>Meditation Streak: {streaks.meditation || 0} days</div>
      <div>Journaling Streak: {streaks.journaling || 0} days</div>
      <div>Stress Check-in Streak: {streaks.stressCheck || 0} days</div>
    </div>
  );
}