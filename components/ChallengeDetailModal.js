import React from 'react';

export default function ChallengeDetailModal({ isOpen, onClose, challenge, onStart }) {
    if (!isOpen || !challenge) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
                {/* Header with Image/Gradient */}
                <div className={`p-8 text-white bg-gradient-to-r ${challenge.group === 'balance' ? 'from-green-500 to-emerald-600' : challenge.group === 'focus' ? 'from-blue-500 to-indigo-600' : 'from-purple-500 to-fuchsia-600'}`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold uppercase">{challenge.duration} Days</span>
                                <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold uppercase">{challenge.category}</span>
                            </div>
                            <h2 className="text-3xl font-bold mb-2">{challenge.title}</h2>
                            <p className="text-white/90 text-lg">{challenge.description}</p>
                        </div>
                        <button onClick={onClose} className="text-white/70 hover:text-white p-2 rounded-full transition text-2xl">
                            ✕
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">The Journey</h3>
                        <div className="space-y-4">
                            {challenge.phases.map((phase) => (
                                <div key={phase.id} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                            {phase.id}
                                        </div>
                                        <div className="w-0.5 h-full bg-blue-50 my-1"></div>
                                    </div>
                                    <div className="pb-6">
                                        <h4 className="font-bold text-gray-800">Days {phase.days[0]}-{phase.days[1]}: {phase.title}</h4>
                                        <p className="text-gray-600 text-sm">{phase.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Why this matters</h3>
                        <div className="flex flex-wrap gap-2">
                            {challenge.tags.map(tag => (
                                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onStart(challenge.id)}
                        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 hover:scale-[1.02] transition-all"
                    >
                        Start Challenge
                    </button>
                </div>
            </div>
        </div>
    );
}
