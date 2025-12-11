import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '../lib/context';

const RECOMMENDATIONS = {
    low_mood: [
        { id: 'meditate', title: '5-Minute Breathing', icon: '🧘', type: 'self_care', action: 'mindfulness' },
        { id: 'walk', title: 'Take a Short Walk', icon: '🚶', type: 'activity', action: 'exercise' },
        { id: 'journal', title: 'Vent It Out', icon: '📝', type: 'journal', action: 'journal' }
    ],
    high_mood: [
        { id: 'challenge', title: 'Try a Hard Challenge', icon: '💪', type: 'activity', action: 'challenge' },
        { id: 'gratitude', title: 'Share Gratitude', icon: '🙏', type: 'gratitude', action: 'gratitude' },
        { id: 'learn', title: 'Learn Something New', icon: '🧠', type: 'resource', action: 'library' }
    ],
    neutral: [
        { id: 'water', title: 'Drink Water', icon: '💧', type: 'self_care', action: 'nutrition' },
        { id: 'stretch', title: 'Quick Stretch', icon: '🙆', type: 'activity', action: 'exercise' },
        { id: 'plan', title: 'Plan Your Day', icon: '📅', type: 'journal', action: 'planning' }
    ],
    morning: [
        { id: 'intention', title: 'Set Daily Intention', icon: '🌅', type: 'journal', action: 'journal' }
    ],
    evening: [
        { id: 'reflect', title: 'Evening Reflection', icon: '🌙', type: 'journal', action: 'journal' }
    ]
};

export default function RecommendationWidget() {
    const router = useRouter();
    const { dailyLogs, userProfile } = useApp();
    const [rec, setRec] = useState(null);

    useEffect(() => {
        // Simple logic: Get last mood
        const dates = Object.keys(dailyLogs || {}).sort((a, b) => new Date(b) - new Date(a));
        const lastLog = dates.length > 0 ? dailyLogs[dates[0]] : null;
        const lastMood = lastLog?.mood_score || 3; // Default to neutral

        // Get time of day
        const hour = new Date().getHours();
        const isMorning = hour < 10;
        const isEvening = hour > 18;

        let pool = [];

        // Mood based
        if (lastMood <= 2) pool = [...RECOMMENDATIONS.low_mood];
        else if (lastMood >= 4) pool = [...RECOMMENDATIONS.high_mood];
        else pool = [...RECOMMENDATIONS.neutral];

        // Time based injections
        if (isMorning) pool.push(...RECOMMENDATIONS.morning);
        if (isEvening) pool.push(...RECOMMENDATIONS.evening);

        // Pick random
        const randomRec = pool[Math.floor(Math.random() * pool.length)];
        setRec(randomRec);

    }, [dailyLogs]);

    if (!rec) return null;

    const handleAction = () => {
        if (rec.action === 'library') router.push('/library');
        else {
            // In a real app, this might open the modal with specific pre-filled data
            // For now, we'll just open the dashboard modal (which is parent) 
            // BUT we are a child component. We need a way to trigger the parent.
            // Actually, let's just show a simple alert or console for now, 
            // or better, dispatch a custom event or use a global modal context if we had one.
            // Since we don't want to refactor the whole modal system right now, 
            // we will just redirect to dashboard with a query param or similar?
            // Or simpler: Just tell the user what to do.

            // Wait, we are ON the dashboard. 
            // We can pass a prop `onAction` if we were rendering it from Dashboard.
            // I'll assume the parent passes a handler or we just use a generic "Go" button 
            // that opens the main "Log a Win" modal.

            // Let's emit a custom event that Dashboard listens to? No, that's messy.
            // I'll just make the button open the "Log a Win" modal by dispatching a click to the main button? Hacky.
            // Better: Just display the suggestion. The user can click "Log a Win" manually.
            // OR: We can use the router to trigger a state? 
            // Let's just make it a nice visual prompt.
        }
    };

    return (
        <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-[2px] shadow-lg transform transition-transform cursor-pointer group min-h-[120px]">
            <div className="bg-white rounded-xl h-full w-full p-4 flex flex-col items-center justify-center text-center">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {rec.icon}
                </div>
                <div>
                    <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1">Recommended</p>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{rec.title}</h3>
                </div>
            </div>
        </div>
    );
}
