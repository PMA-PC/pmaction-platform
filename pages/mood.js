import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useApp } from '../lib/context';
import { MoodChart } from '../components/MoodChart';
import { MoodHeatmap } from '../components/MoodHeatmap';
import { TagCorrelationChart } from '../components/TagCorrelationChart';
import MoodLoggerModal from '../components/MoodLoggerModal';
import { NotificationProvider } from '../components/Notification';

export default function MoodPage() {
    const { wins } = useApp();
    const [moods, setMoods] = useState([]);
    const [isLoggerOpen, setIsLoggerOpen] = useState(false);

    useEffect(() => {
        // Filter wins for mood entries
        if (wins) {
            const moodEntries = wins.filter(w => w.type === 'mood').map(w => ({
                id: w.id,
                date: w.created_at,
                mood: w.mood, // Assuming this is stored as JSON
                comment: w.content,
                tags: w.tags || [] // Assuming tags are stored
            }));
            setMoods(moodEntries);
        }
    }, [wins]);

    return (
        <NotificationProvider>
            <div className="min-h-screen bg-gray-50 pb-20">
                <Head>
                    <title>Mood Tracker | PMAction</title>
                </Head>

                <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Mood Tracker</h1>
                            <p className="text-gray-600 mt-1">Understand your emotional patterns.</p>
                        </div>
                        <button
                            onClick={() => setIsLoggerOpen(true)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            Log Mood
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <MoodChart moods={moods} />
                        <TagCorrelationChart moods={moods} />
                    </div>

                    <div className="mb-8">
                        <MoodHeatmap moods={moods} />
                    </div>

                    {/* Recent Entries List (Optional, but good for detail) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Recent Entries</h3>
                        <div className="space-y-4">
                            {moods.slice(0, 5).map(entry => (
                                <div key={entry.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                                    <div className="text-3xl">{entry.mood?.emoji}</div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-gray-800">{entry.mood?.name}</span>
                                            <span className="text-xs text-gray-400">• {new Date(entry.date).toLocaleString()}</span>
                                        </div>
                                        {entry.comment && <p className="text-gray-600 text-sm">{entry.comment}</p>}
                                        {entry.tags && entry.tags.length > 0 && (
                                            <div className="flex gap-2 mt-2">
                                                {entry.tags.map(tag => (
                                                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">#{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {moods.length === 0 && <p className="text-gray-500 text-center py-4">No mood entries yet.</p>}
                        </div>
                    </div>
                </main>

                {isLoggerOpen && (
                    <MoodLoggerModal onClose={() => setIsLoggerOpen(false)} />
                )}
            </div>
        </NotificationProvider>
    );
}
