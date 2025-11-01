import Link from 'next/link';

export default function Dashboard() {
  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem' }}>
      <img src="/logo.png" alt="PMA Logo" style={{ width: 60, marginBottom: 22 }} />
      <h2>Dashboard</h2>
      <section>
        <h3>Your Actions:</h3>
        <ul>
          <li><Link href="/mood-log"><a>Mood Log</a></Link></li>
          <li><Link href="/habits"><a>Habits</a></Link></li>
          <li><Link href="/journal"><a>Journal</a></Link></li>
          <li><Link href="/profile"><a>Profile</a></Link></li>
        </ul>
      </section>
      <section style={{ marginTop: 40 }}>
        <h3>Recent Activity</h3>
        <div>
          <p>No activity yet. Start by logging your mood or adding a small habit!</p>
        </div>
      </section>
    </main>
  );
}
