import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SmartFocusCard({ dailyStatus, onAction }) {
    const router = useRouter();
    const [timeOfDay, setTimeOfDay] = useState('morning'); // morning, midday, evening

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setTimeOfDay('morning');
        else if (hour < 17) setTimeOfDay('midday');
        else setTimeOfDay('evening');
    }, []);

    // Logic to determine what to show
    // If the "primary" task for the time of day is done, show the next one.
    let currentFocus = 'morning';

    if (timeOfDay === 'morning') {
        if (dailyStatus.win) currentFocus = 'midday'; // If morning win done, move to midday
    }
    if (timeOfDay === 'midday' || currentFocus === 'midday') {
        if (dailyStatus.selfCare) currentFocus = 'evening'; // If self-care done, move to evening
    }
    if (timeOfDay === 'evening' || currentFocus === 'evening') {
        if (dailyStatus.mood) currentFocus = 'complete'; // If mood done, all done!
    }

    // Content Definitions
    const content = {
        morning: {
            title: 'Morning Win',
            subtitle: 'Start small to win big.',
            icon: '🌅',
            actionLabel: 'Log a Small Win',
            action: () => onAction('win'),
            color: 'from-orange-400 to-pink-500'
        },
        midday: {
            title: 'Midday Reset',
            subtitle: 'Take a moment for yourself.',
            icon: '☀️',
            actionLabel: 'Do Self-Care',
            action: () => onAction('self_care'),
            color: 'from-blue-400 to-teal-400'
        },
        evening: {
            title: 'Evening Reflection',
            subtitle: 'How was your day?',
            icon: '🌙',
            actionLabel: 'Check Mood',
            action: () => onAction('mood'),
            color: 'from-indigo-500 to-purple-600'
        },
        complete: {
            title: 'All Caught Up!',
            subtitle: 'You are crushing it today.',
            icon: '🎉',
            actionLabel: 'View Reports',
            action: () => router.push('/report'),
            color: 'from-green-400 to-emerald-600'
        }
    };

    const activeContent = content[currentFocus] || content.morning;

    return (
        <div className={`bg-gradient-to-r ${activeContent.color} rounded-2xl shadow-lg text-white p-6 transform hover:scale-[1.02] transition-all`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                        {activeContent.icon} {activeContent.title}
                    </h2>
                    <p className="text-white/90 text-sm">{activeContent.subtitle}</p>
                </div>
                <span className="bg-white/20 px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-sm">
                    {currentFocus === 'complete' ? 'DONE' : 'FOCUS'}
                </span>
            </div>

            <button
                onClick={activeContent.action}
                className="w-full py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
                {activeContent.actionLabel} ➜
            </button>
        </div>
    );
}
