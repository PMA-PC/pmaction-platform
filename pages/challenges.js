import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '../lib/context';
import { CHALLENGES } from '../lib/challengesData';
import ChallengeDetailModal from '../components/ChallengeDetailModal';

export default function ChallengeLibrary() {
    const router = useRouter();
    const { startChallenge, activeChallenge, userProfile } = useApp();
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [filterDuration, setFilterDuration] = useState('All');
    const [filterCategory, setFilterCategory] = useState('All');
    const [selectedChallenge, setSelectedChallenge] = useState(null);

    // Extract unique categories for filter (from all challenges)
    const allCategories = ['All', ...new Set(CHALLENGES.map(c => c.category))];
    const durations = ['All', '3 Days', '5 Days', '30 Days'];

    // Group challenges
    const groups = {
        balance: {
            title: 'Restore Balance',
            subtitle: 'Master Your Body & Emotions',
            icon: '🌿',
            color: 'from-green-500 to-emerald-600',
            textColor: 'text-green-700',
            bgColor: 'bg-green-50',
            challenges: CHALLENGES.filter(c => c.group === 'balance')
        },
        focus: {
            title: 'Build Focus',
            subtitle: 'Sharpen Your Mind & Executive Function',
            icon: '⚡',
            color: 'from-blue-500 to-indigo-600',
            textColor: 'text-blue-700',
            bgColor: 'bg-blue-50',
            challenges: CHALLENGES.filter(c => c.group === 'focus')
        },
        identity: {
            title: 'Find Yourself',
            subtitle: 'Connection, Identity & Authenticity',
            icon: '🎭',
            color: 'from-purple-500 to-fuchsia-600',
            textColor: 'text-purple-700',
            bgColor: 'bg-purple-50',
            challenges: CHALLENGES.filter(c => c.group === 'identity')
        }
    };

    // Filter function
    const filterChallenge = (challenge) => {
        const durationMatch = filterDuration === 'All' ||
            (filterDuration === '3 Days' && challenge.duration === 3) ||
            (filterDuration === '5 Days' && challenge.duration === 5) ||
            (filterDuration === '30 Days' && challenge.duration === 30);
        const categoryMatch = filterCategory === 'All' || challenge.category === filterCategory;
        return durationMatch && categoryMatch;
    };

    const handleStartChallenge = (challengeId) => {
        startChallenge(challengeId);
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <ChallengeDetailModal
                isOpen={!!selectedChallenge}
                onClose={() => setSelectedChallenge(null)}
                challenge={selectedChallenge}
                onStart={handleStartChallenge}
            />

            {/* My Journey Dashboard */}
            <div className="bg-white border-b border-gray-200 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">My Journey</h1>
                        <button onClick={() => router.push('/dashboard')} className="text-sm font-bold text-blue-600 hover:underline">
                            Back to Dashboard
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Active Challenge Card */}
                        <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-sm font-bold uppercase tracking-wider opacity-80 mb-1">Current Focus</h2>
                                {activeChallenge ? (
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">{activeChallenge.title}</h3>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="flex-1 bg-white/20 rounded-full h-2">
                                                <div className="bg-white h-full rounded-full" style={{ width: `${(activeChallenge.progress / activeChallenge.duration) * 100}%` }}></div>
                                            </div>
                                            <span className="font-bold text-sm">Day {activeChallenge.progress} / {activeChallenge.duration}</span>
                                        </div>
                                        <button onClick={() => router.push('/dashboard')} className="bg-white text-blue-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition">
                                            Continue Journey
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">No Active Challenge</h3>
                                        <p className="opacity-90 mb-4">Select a path below to start your mastery journey.</p>
                                    </div>
                                )}
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10 text-9xl transform translate-y-4 translate-x-4">
                                🏔️
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-center">
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Achievements</h2>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Completed</span>
                                <span className="text-2xl font-bold text-gray-900">{userProfile?.completed_challenges?.length || 0}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total XP</span>
                                <span className="text-2xl font-bold text-purple-600">{userProfile?.xp || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Library Header */}
            <div className="bg-gray-900 text-white py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-2">Challenge Library</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                        Select a track to start your mastery journey.
                    </p>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            {allCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            value={filterDuration}
                            onChange={(e) => setFilterDuration(e.target.value)}
                            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            {durations.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Main 3-Column Layout */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {Object.entries(groups).map(([key, group]) => (
                        <div key={key} className="flex flex-col h-full">
                            {/* Group Header Card */}
                            <div className={`rounded-t-2xl p-6 bg-gradient-to-r ${group.color} text-white shadow-lg relative overflow-hidden`}>
                                <div className="relative z-10">
                                    <div className="text-4xl mb-3">{group.icon}</div>
                                    <h2 className="text-2xl font-bold">{group.title}</h2>
                                    <p className="text-white/80 text-sm font-medium mt-1">{group.subtitle}</p>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                            </div>

                            {/* Challenge List for this Group */}
                            <div className="bg-white rounded-b-2xl shadow-sm border-x border-b border-gray-200 p-4 flex-1 space-y-4">
                                {group.challenges.filter(filterChallenge).length === 0 ? (
                                    <p className="text-center text-gray-400 py-8 text-sm">No challenges match filters.</p>
                                ) : (
                                    group.challenges.filter(filterChallenge).map(challenge => (
                                        <div
                                            key={challenge.id}
                                            className="group border border-gray-200 rounded-xl p-5 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer bg-white relative overflow-hidden shadow-sm"
                                            onClick={() => setSelectedChallenge(challenge)}
                                        >
                                            {/* ADHD Badge - Conditional */}
                                            {challenge.tags && challenge.tags.includes('adhd') && (
                                                <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                                                    ADHD FOCUSED
                                                </div>
                                            )}

                                            <div className="flex justify-between items-start mb-2 mt-2">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${group.bgColor} ${group.textColor}`}>
                                                    {challenge.duration} Days
                                                </span>
                                                {challenge.duration === 30 && (
                                                    <span className="text-[10px] font-bold text-purple-600 flex items-center gap-1 mr-16">
                                                        👑 Deep Dive
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors text-lg">
                                                {challenge.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">
                                                {challenge.description}
                                            </p>

                                            <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                                                <div className="flex gap-1 flex-wrap">
                                                    {challenge.tags.slice(0, 3).map(tag => (
                                                        <span key={tag} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="text-xs font-bold text-blue-500 group-hover:text-blue-700 transition-colors bg-blue-50 px-3 py-1 rounded-full">
                                                    View Details
                                                </span>
                                            </div>
                                        </div>
                                    )))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
