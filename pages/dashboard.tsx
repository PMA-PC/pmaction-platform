import Link from 'next/link';
import '../styles/style.css';

export default function Dashboard() {
  return (
    <main className="dashboard-container" style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <img src="/logo.png" alt="PMA Logo" style={{ width: 60, marginBottom: 22 }} />
      <h2 className="page-title">Dashboard</h2>
      
      {/* Gamification Elements */}
      <section className="gamification-section">
        <div className="points-streak-container">
          <div className="points-indicator gradient-bg">
            <span className="points-value">0</span>
            <span className="points-label">Points</span>
          </div>
          <div className="streak-indicator gradient-bg">
            <span className="streak-value">0</span>
            <span className="streak-label">Day Streak</span>
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: '0%' }}></div>
        </div>
      </section>
      
      <section className="actions-section">
        <h3>Your Actions:</h3>
        <ul className="action-list">
          <li className="action-card"><Link href="/mood-log"><a className="card-link">Mood Log</a></Link></li>
          <li className="action-card"><Link href="/habits"><a className="card-link">Habits</a></Link></li>
          <li className="action-card"><Link href="/journal"><a className="card-link">Journal</a></Link></li>
          <li className="action-card"><Link href="/profile"><a className="card-link">Profile</a></Link></li>
        </ul>
      </section>
      
      <section className="recent-activity" style={{ marginTop: 40 }}>
        <h3>Recent Activity</h3>
        <div className="activity-card">
          <p>No activity yet. Start by logging your mood or adding a small habit!</p>
        </div>
      </section>
    </main>
  );
}
