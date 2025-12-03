import React, { useState } from 'react';
import { CHALLENGES } from '../lib/challengesData';

export default function ChallengeLibrary() {
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterDuration, setFilterDuration] = useState('All');

    // Extract unique categories for filter
    const categories = ['All', ...new Set(CHALLENGES.map(c => c.category))];
    const durations = ['All', '3 Days', '5 Days', '30 Days'];

    const filteredChallenges = CHALLENGES.filter(challenge => {
        const categoryMatch = filterCategory === 'All' || challenge.category === filterCategory;
        const durationMatch = filterDuration === 'All' ||
            (filterDuration === '3 Days' && challenge.duration === 3) ||
            (filterDuration === '5 Days' && challenge.duration === 5) ||
            (filterDuration === '30 Days' && challenge.duration === 30);
        return categoryMatch && durationMatch;
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Challenge Library</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Gamify your growth with research-backed challenges designed for the ADHD brain.
                        Master skills, build habits, and unlock your potential.
                    </p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filterCategory === cat
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-sm font-bold text-gray-500">Duration:</span>
                        <select
                            value={filterDuration}
                            onChange={(e) => setFilterDuration(e.target.value)}
                            className="bg-gray-100 border-none rounded-lg text-sm font-bold text-gray-700 focus:ring-2 focus:ring-blue-500"
                        >
                            {durations.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Challenge Grid */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredChallenges.map(challenge => (
                        <div key={challenge.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                            <div className={`h-2 w-full ${challenge.duration === 30 ? 'bg-purple-500' :
                                    challenge.duration === 5 ? 'bg-blue-500' : 'bg-green-500'
                                }`} />

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${challenge.duration === 30 ? 'bg-purple-100 text-purple-700' :
                                            challenge.duration === 5 ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                        }`}>
                                        {challenge.duration} Days
                                    </span>
                                    <span className="text-xs font-bold text-gray-400">
                                        {challenge.category}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 flex-1">{challenge.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {challenge.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    className="w-full py-3 rounded-xl font-bold text-white bg-gray-900 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                    onClick={() => alert(`Starting challenge: ${challenge.title}`)}
                                >
                                    <span>🚀 Start Challenge</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredChallenges.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-gray-800">No challenges found</h3>
                        <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                        <button
                            onClick={() => { setFilterCategory('All'); setFilterDuration('All'); }}
                            className="mt-4 text-blue-600 font-bold hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
