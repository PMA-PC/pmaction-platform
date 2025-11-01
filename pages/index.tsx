import Link from 'next/link';

export default function Landing() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem' }}>
      <img src="/logo.png" alt="PMA Logo" style={{ width: 120, marginBottom: 24 }} />
      <h1>Welcome to PMAction!</h1>
      <p>
        Your mental action platform for mood tracking, journaling, habits, and personal growth.
      </p>
      <Link href="/onboarding">
        <button style={{ marginTop: 32, padding: '12px 32px', fontSize: '1.15rem', borderRadius: 8, background: '#6c5dd3', color: '#fff', border: 'none' }}>
          Get Started
        </button>
      </Link>
      <div style={{ marginTop: 40 }}>
        <small>
          <strong>Already have an account?</strong> <a href="/login">Log in</a>
        </small>
      </div>
    </main>
  );
}
