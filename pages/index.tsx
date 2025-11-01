import Link from 'next/link';
import '../styles/style.css';

export default function Landing() {
  return (
    <main className="landing-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      {/* Hero Section with Gradient Background */}
      <div className="hero-section" style={{
        maxWidth: '900px',
        textAlign: 'center',
        marginTop: '3rem',
        marginBottom: '3rem'
      }}>
        <img 
          src="/logo.png" 
          alt="PMA Logo" 
          style={{ 
            width: 140, 
            marginBottom: 32,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
          }} 
        />
        
        {/* Large Headline - ADHD-friendly and motivational */}
        <h1 className="page-title" style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          color: '#ffffff',
          marginBottom: '1rem',
          lineHeight: '1.2',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          Take Control of Your Mental Wellness
        </h1>
        
        {/* Subheadline - Clear and supportive */}
        <p className="landing-description" style={{
          fontSize: '1.4rem',
          color: '#f0f0ff',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6',
          marginBottom: '2.5rem'
        }}>
          Track moods, build habits, and journal your journey—all in one ADHD-friendly platform designed to keep you motivated and on track.
        </p>

        {/* CTA Buttons - Clear and actionable */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          <Link href="/onboarding">
            <button className="btn btn-primary" style={{
              background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
              color: '#ffffff',
              fontSize: '1.2rem',
              padding: '1rem 2.5rem',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: '700',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              🚀 Get Started Free
            </button>
          </Link>
          
          <Link href="/login">
            <button className="btn btn-secondary" style={{
              background: 'rgba(255,255,255,0.2)',
              color: '#ffffff',
              fontSize: '1.2rem',
              padding: '1rem 2.5rem',
              border: '2px solid rgba(255,255,255,0.5)',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: '600',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s'
            }}>
              Log In
            </button>
          </Link>
        </div>
      </div>

      {/* Feature Highlights - 4 gradient cards */}
      <section className="features-section" style={{
        marginTop: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1000px',
        width: '100%'
      }}>
        {/* Card 1: Track Moods */}
        <div className="feature-card" style={{
          padding: '2rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          transition: 'transform 0.3s'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: '#2d3748',
            marginBottom: '0.5rem'
          }}>
            Track Moods
          </h3>
          <p style={{ 
            fontSize: '1rem', 
            color: '#4a5568',
            lineHeight: '1.5'
          }}>
            Log your daily emotions with quick, visual mood tracking
          </p>
        </div>

        {/* Card 2: Smart Journaling */}
        <div className="feature-card" style={{
          padding: '2rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          transition: 'transform 0.3s'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: '#2d3748',
            marginBottom: '0.5rem'
          }}>
            Smart Journaling
          </h3>
          <p style={{ 
            fontSize: '1rem', 
            color: '#4a5568',
            lineHeight: '1.5'
          }}>
            Write with AI-powered tag suggestions and prompts
          </p>
        </div>

        {/* Card 3: Build Habits */}
        <div className="feature-card" style={{
          padding: '2rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          transition: 'transform 0.3s'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: '#2d3748',
            marginBottom: '0.5rem'
          }}>
            Build Habits
          </h3>
          <p style={{ 
            fontSize: '1rem', 
            color: '#4a5568',
            lineHeight: '1.5'
          }}>
            Create healthy routines with simple habit tracking
          </p>
        </div>

        {/* Card 4: Earn Streaks */}
        <div className="feature-card" style={{
          padding: '2rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          transition: 'transform 0.3s'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔥</div>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: '#2d3748',
            marginBottom: '0.5rem'
          }}>
            Earn Streaks
          </h3>
          <p style={{ 
            fontSize: '1rem', 
            color: '#4a5568',
            lineHeight: '1.5'
          }}>
            Stay motivated with gamification and rewards
          </p>
        </div>
      </section>

      {/* ADHD-Friendly Motivation Message */}
      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        maxWidth: '700px',
        textAlign: 'center'
      }}>
        <p style={{
          color: '#ffffff',
          fontSize: '1.1rem',
          lineHeight: '1.6',
          margin: 0
        }}>
          ✨ <strong>Built for busy minds:</strong> Short tasks, clear goals, instant feedback. Start small, build momentum, celebrate wins.
        </p>
      </div>

      {/* Footer Note */}
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <small style={{ color: '#e0e0ff', fontSize: '0.95rem' }}>
          No credit card required • Free to start • ADHD-optimized design
        </small>
      </div>
    </main>
  );
}
