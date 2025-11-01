import { useState } from 'react';
import Link from 'next/link';

const steps = [
  {
    label: 'Welcome! What's your main goal?',
    options: ['Boost Mood', 'Build Habits', 'Track Streaks', 'Journaling', 'Stress Relief']
  },
  {
    label: 'Pick your preferred mood log style:',
    options: ['Slider Scale', 'Emoji Quick-Tap', 'Tags & Notes']
  },
  {
    label: 'Choose app theme:',
    options: ['Light', 'Dark', 'System', 'Vibrant', 'High-Contrast']
  },
  {
    label: 'How do you want reminders?',
    options: ['Daily Mood Ping', 'Weekly Check-in', 'No Reminders']
  }
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);

  const advance = (option: string) => {
    setSelections([...selections, option]);
    if (step < steps.length - 1) setStep(step + 1);
  };

  return (
    <main style={{ maxWidth: 500, margin: '0 auto', padding: '2rem' }}>
      <img src="/logo.png" alt="PMA Logo" style={{ width: 88, marginBottom: 18 }} />
      <h2>Get Started with PMAction!</h2>
      <div style={{ marginBottom: 32, minHeight: 90 }}>
        <strong>{steps[step].label}</strong>
        <ul>
          {steps[step].options.map(opt => (
            <li key={opt} style={{ margin: '12px 0' }}>
              <button
                style={{ fontSize: '1rem', padding: '8px 24px', borderRadius: 6, background: '#6c5dd3', color: '#fff', border: 'none' }}
                onClick={() => advance(opt)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {step === steps.length - 1 && selections.length === steps.length && (
        <div style={{ marginTop: 40 }}>
          <h3>Great! Ready to personalize your experience.</h3>
          <Link href="/dashboard">
            <button style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: 8, background: '#0be881', color: '#2a2a2a', border: 'none' }}>
              Go to Dashboard
            </button>
          </Link>
          <div style={{ marginTop: 24 }}>
            <small>Your setup: <br />{selections.join(', ')}</small>
          </div>
        </div>
      )}
    </main>
  );
}
