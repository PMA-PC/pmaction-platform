import Link from 'next/link';
import '../styles/style.css';

export default function Profile() {
  // Mock user data with gamification stats
  const userStats = {
    name: 'Anonymous',
    email: '(Log in to see your email)',
    totalPoints: 0,
    longestStreak: 0,
    currentStreak: 0,
    habitsCompleted: 0,
    journalEntries: 0,
    moodLogs: 0
  };

  return (
    <main className="profile-container" style={{ maxWidth: 700, margin: '0 auto', padding: '2rem' }}>
      <h2 className="page-title">Your Profile</h2>
      
      <section className="profile-info" style={{ margin: '24px 0' }}>
        <img src="/logo.png" alt="PMA Logo" style={{ width: 80, marginBottom: 16 }} />
        <div className="user-info">
          <div><strong>Name:</strong> <span>{userStats.name}</span></div>
          <div><strong>Email:</strong> <span>{userStats.email}</span></div>
        </div>
      </section>
      
      {/* Gamification Stats Section */}
      <section className="gamification-stats" style={{ marginTop: 40 }}>
        <h3>Your Stats</h3>
        
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginTop: 20 }}>
          <div className="stat-card gradient-bg" style={{ padding: 16, borderRadius: 8, background: '#f0f8ff', textAlign: 'center' }}>
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6c5dd3' }}>{userStats.totalPoints}</div>
            <div className="stat-label" style={{ fontSize: '0.9rem', color: '#666' }}>Total Points</div>
          </div>
          
          <div className="stat-card gradient-bg" style={{ padding: 16, borderRadius: 8, background: '#fff0f5', textAlign: 'center' }}>
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e67e22' }}>{userStats.currentStreak}</div>
            <div className="stat-label" style={{ fontSize: '0.9rem', color: '#666' }}>Current Streak</div>
          </div>
          
          <div className="stat-card gradient-bg" style={{ padding: 16, borderRadius: 8, background: '#f0fff4', textAlign: 'center' }}>
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>{userStats.longestStreak}</div>
            <div className="stat-label" style={{ fontSize: '0.9rem', color: '#666' }}>Longest Streak</div>
          </div>
        </div>
        
        {/* Activity Breakdown */}
        <div className="activity-breakdown" style={{ marginTop: 30 }}>
          <h4>Activity Breakdown</h4>
          <div className="activity-list" style={{ marginTop: 16 }}>
            <div className="activity-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#f9f9f9', borderRadius: 6, marginBottom: 10 }}>
              <span>Habits Completed</span>
              <strong>{userStats.habitsCompleted}</strong>
            </div>
            <div className="activity-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#f9f9f9', borderRadius: 6, marginBottom: 10 }}>
              <span>Journal Entries</span>
              <strong>{userStats.journalEntries}</strong>
            </div>
            <div className="activity-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#f9f9f9', borderRadius: 6, marginBottom: 10 }}>
              <span>Mood Logs</span>
              <strong>{userStats.moodLogs}</strong>
            </div>
          </div>
        </div>
      </section>
      
      <Link href="/dashboard">
        <button className="btn btn-primary gradient-bg" style={{ padding: '12px 32px', borderRadius: 6, background: '#6c5dd3', color: '#fff', border: 'none', fontSize: '1rem', marginTop: 18, cursor: 'pointer' }}>
          Back to Dashboard
        </button>
      </Link>
    </main>
  );
}
