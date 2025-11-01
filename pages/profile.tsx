import Link from 'next/link';

export default function Profile() {
  return (
    <main style={{ maxWidth: 420, margin: '0 auto', padding: '2rem' }}>
      <h2>Your Profile</h2>
      <section style={{ margin: '24px 0' }}>
        <img src="/logo.png" alt="PMA Logo" style={{ width: 80, marginBottom: 16 }} />
        <div>
          <strong>Name:</strong> <span>Anonymous</span>
        </div>
        <div>
          <strong>Email:</strong> <span>(Log in to see your email)</span>
        </div>
      </section>
      <Link href="/dashboard">
        <button style={{ padding: '12px 32px', borderRadius: 6, background: '#6c5dd3', color: '#fff', border: 'none', fontSize: '1rem', marginTop: 18 }}>
          Back to Dashboard
        </button>
      </Link>
    </main>
  );
}
