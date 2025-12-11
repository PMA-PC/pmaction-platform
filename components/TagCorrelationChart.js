import React from 'react';

export const TagCorrelationChart = ({ moods }) => {
    const tagMoods = {};

    if (moods) {
        moods.forEach(mood => {
            mood.tags?.forEach(tag => {
                if (!tagMoods[tag]) {
                    tagMoods[tag] = [];
                }
                if (mood.mood?.value) {
                    tagMoods[tag].push(mood.mood.value);
                }
            });
        });
    }

    const tagAverages = Object.entries(tagMoods).map(([tag, values]) => ({
        tag,
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        count: values.length
    })).filter(t => t.count > 0).sort((a, b) => b.avg - a.avg);

    return (
        <div className="p-4 bg-white rounded-lg shadow border border-gray-100">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Tag & Mood Correlation</h3>
            {tagAverages.length > 0 ? (
                <div className="space-y-3">
                    {tagAverages.slice(0, 5).map(({ tag, avg }) => (
                        <div key={tag}>
                            <div className="flex justify-between text-sm font-semibold mb-1">
                                <span className="text-gray-700 capitalize">{tag}</span>
                                <span className="text-gray-500">{avg.toFixed(1)}/5</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className={`h-2.5 rounded-full ${avg >= 4 ? 'bg-green-500' : avg >= 3 ? 'bg-blue-400' : 'bg-yellow-400'}`}
                                    style={{ width: `${(avg / 5) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-4 text-sm">Add tags to your mood entries to see correlations.</p>
            )}
        </div>
    );
};
