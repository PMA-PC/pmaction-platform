import { useState } from 'react';

export default function Habits() {
  const [habit, setHabit] = useState('');
  const [habits, setHabits] = useState<string[]>([]);

  const addHabit = () => {
    if (!habit.trim()) return;
    setHabits([...habits, habit]);
    setHabit('');
  };

  return (
    <main style={{ maxWidth: 460, margin: '0 auto', padding: '2rem' }}>
      <h2>Your Habits</h2>
      <input
        type="text"
        value={habit}
        onChange={e => setHabit(e.target.value)}
        placeholder="Add new habit"
        style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', width: '75%', marginRight: 10 }}
      />
      <button
        onClick={addHabit}
        style={{ padding: '10px 20px', borderRadius: 6, background: '#27ae60', color: '#fff', border: 'none', fontSize: '1rem' }}
      >
        Add
      </button>
      <ul style={{ marginTop: 28 }}>
        {habits.map((h, i) => (
          <li key={i} style={{ fontSize: '1.08rem', margin: '8px 0', background: '#f0f8ff', padding: '8px 20px', borderRadius: 4 }}>{h}</li>
        ))}
      </ul>
    </main>
  );
}
