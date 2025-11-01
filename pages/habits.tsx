import { useState } from 'react';
import '../styles/style.css';

export default function Habits() {
  const [habit, setHabit] = useState('');
  const [habits, setHabits] = useState<string[]>([]);

  const addHabit = () => {
    if (!habit.trim()) return;
    setHabits([...habits, habit]);
    setHabit('');
  };

  return (
    <main className="habits-container" style={{ maxWidth: 700, margin: '0 auto', padding: '2rem' }}>
      <h2 className="page-title">Your Habits</h2>
      
      {/* Streak indicator for habits */}
      <div className="streak-indicator gradient-bg" style={{ marginBottom: 20 }}>
        <span className="streak-value">{habits.length}</span>
        <span className="streak-label">Active Habits</span>
      </div>
      
      {/* Progress bar for habit completion */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${Math.min(habits.length * 10, 100)}%` }}></div>
      </div>
      
      <div className="input-group" style={{ marginTop: 20 }}>
        <input
          type="text"
          className="form-input"
          value={habit}
          onChange={e => setHabit(e.target.value)}
          placeholder="Add new habit"
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', width: '75%', marginRight: 10 }}
        />
        <button
          className="btn btn-primary gradient-bg"
          onClick={addHabit}
          style={{ padding: '10px 20px', borderRadius: 6, background: '#27ae60', color: '#fff', border: 'none', fontSize: '1rem' }}
        >
          Add
        </button>
      </div>
      
      <ul className="habit-list" style={{ marginTop: 28 }}>
        {habits.map((h, i) => (
          <li key={i} className="habit-card" style={{ fontSize: '1.08rem', margin: '8px 0', background: '#f0f8ff', padding: '8px 20px', borderRadius: 4 }}>{h}</li>
        ))}
      </ul>
    </main>
  );
}
