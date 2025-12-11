import React from 'react';

export const MoodHeatmap = ({ moods }) => {
    // Simplified representation.
    const moodColor = (value) => {
        switch (value) {
            case 1: return 'bg-red-300';
            case 2: return 'bg-yellow-300';
            case 3: return 'bg-blue-300';
            case 4: return 'bg-green-300';
            case 5: return 'bg-green-500';
            default: return 'bg-gray-200';
        }
    }

    const moodData = {};
    if (moods) {
        moods.forEach(mood => {
            const date = new Date(mood.date).toISOString().split('T')[0];
            // Use the last mood value for the day for simplicity
            moodData[date] = mood.mood?.value || 0;
        });
    }

    const today = new Date();
    const days = Array.from({ length: 90 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        return d;
    }).reverse();

    return (
        <div className="p-4 bg-white rounded-lg shadow border border-gray-100">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Mood Heatmap (90 Days)</h3>
            <div className="grid grid-cols-12 gap-1">
                {days.map(day => {
                    const dateString = day.toISOString().split('T')[0];
                    const moodValue = moodData[dateString];
                    return (
                        <div
                            key={dateString}
                            className={`w-6 h-6 rounded-sm ${moodValue ? moodColor(moodValue) : 'bg-gray-100'}`}
                            title={moodValue ? `Mood: ${moodValue} on ${day.toLocaleDateString()}` : `No entry on ${day.toLocaleDateString()}`}
                        />
                    )
                })}
            </div>
        </div>
    );
};
