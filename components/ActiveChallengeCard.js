import React from 'react';
import { useRouter } from 'next/router';

const ActiveChallengeCard = ({ challenge }) => {
    const router = useRouter();

    if (!challenge) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">No Active Challenge</h3>
                <p className="text-gray-500 text-sm mb-4">Join a challenge to boost your focus and earn badges.</p>
                <button
                    onClick={() => router.push('/challenges')}
                    className="w-full py-2 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors"
                >
                    Browse Challenges
                </button>
            </div>
        );
    }

    // Mock progress for now
    const progress = 20; // 20%
    const currentDay = 1;
    const totalDays = challenge.duration;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wide opacity-80">Current Challenge</span>
                        <h3 className="text-lg font-bold mt-1">{challenge.title}</h3>
                    </div>
                    <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold">
                        Day {currentDay}/{totalDays}
                    </span>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between text-xs font-medium mb-1 opacity-90">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl">
                        📝
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Today's Task</p>
                        <p className="text-sm font-bold text-gray-800">Sleep Audit</p>
                    </div>
                </div>

                <button
                    className="w-full py-2 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    onClick={() => alert('Opening today\'s task...')}
                >
                    <span>Start Task</span>
                    <span>→</span>
                </button>
            </div>
        </div>
    );
};

export default ActiveChallengeCard;
