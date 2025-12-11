import React from 'react';

export const MoodChart = ({ moods }) => {
    if (!moods || moods.length === 0) {
        return <div className="text-center p-4 bg-gray-50 rounded-lg"><p>Log your mood to see your chart.</p></div>;
    }

    // This is a very simple representation.
    return (
        <div className="p-4 bg-white rounded-lg shadow border border-gray-100">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Your Mood Over Time</h3>
            <div className="flex items-end h-48 space-x-2 border-l border-b border-gray-300 p-2">
                {moods.slice(-30).map(mood => ( // Show last 30 entries
                    <div
                        key={mood.id}
                        className="flex-1 bg-teal-400 hover:bg-teal-600 transition-colors rounded-t-sm"
                        style={{ height: `${(mood.mood?.value || 3) * 20}%` }}
                        title={`${mood.mood?.name || 'Mood'} on ${new Date(mood.date).toLocaleDateString()}`}
                    >
                    </div>
                ))}
            </div>
        </div>
    );
};
