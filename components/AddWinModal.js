import React, { useState, useEffect } from 'react';
import { SELF_CARE_ACTIVITIES, SELF_CARE_CATEGORIES } from '../lib/selfCareData';

const WIN_TYPES = {
    ACTIVITY: 'activity',
    JOURNAL: 'journal',
    GRATITUDE: 'gratitude',
    SELF_CARE: 'self_care'
};

const ACTIVITIES = [
    { id: 'water', label: 'Drank Water', icon: '💧', xp: 10, benefit: 'Great job! Hydration improves focus and reduces anxiety.' },
    { id: 'gym', label: 'Went to Gym', icon: '🏋️', xp: 10, benefit: 'Virtual high five! Exercise releases endorphins and fights depression.' },
    { id: 'walk', label: 'Took a Walk', icon: '🚶', xp: 10, benefit: 'Way to go! Movement clears the mind and boosts energy.' },
    { id: 'healthy_meal', label: 'Healthy Meal', icon: '🥗', xp: 10, benefit: 'Awesome choice! Nutritious food fuels your brain and body.' },
    { id: 'meds', label: 'Took Meds', icon: '💊', xp: 10, benefit: 'Proud of you! Consistency is key to stability and wellness.' },
    { id: 'read', label: 'Read', icon: '📖', xp: 10, benefit: 'Fantastic! Reading reduces stress and expands perspective.' },
    { id: 'clean', label: 'Cleaned', icon: '🧹', xp: 10, benefit: 'So fresh! A tidy space promotes a calm mind.' },
    { id: 'sleep', label: 'Good Sleep', icon: '😴', xp: 10, benefit: 'Well done! Rest is essential for emotional regulation.' }
];

export default function AddWinModal({ isOpen, onClose, onAddWin, initialTab }) {
    const [activeTab, setActiveTab] = useState(WIN_TYPES.ACTIVITY);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [journalText, setJournalText] = useState('');
    const [gratitudeList, setGratitudeList] = useState(['', '', '']);
    const [showSuccess, setShowSuccess] = useState(false);

    // Self-Care State
    const [selectedSelfCare, setSelectedSelfCare] = useState(null);
    const [filterTime, setFilterTime] = useState('');
    const [filterCost, setFilterCost] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && initialTab) {
            // Map initialTab string to WIN_TYPES
            const type = Object.values(WIN_TYPES).find(t => t === initialTab);
            if (type) setActiveTab(type);
        }
    }, [isOpen, initialTab]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setIsSubmitting(true);
        let winData = {
            type: activeTab,
            timestamp: new Date().toISOString()
        };

        switch (activeTab) {
            case WIN_TYPES.ACTIVITY:
                if (!selectedActivity) {
                    setIsSubmitting(false);
                    return;
                }
                winData = {
                    ...winData,
                    activity_type: selectedActivity.id,
                    label: selectedActivity.label,
                    icon: selectedActivity.icon,
                    xp: selectedActivity.xp,
                    benefit: selectedActivity.benefit // Pass benefit for potential future use
                };
                break;
            case WIN_TYPES.JOURNAL:
                if (!journalText.trim()) {
                    setIsSubmitting(false);
                    return;
                }
                winData = {
                    ...winData,
                    content: journalText,
                    xp: 15
                };
                break;
            case WIN_TYPES.GRATITUDE:
                const filledGratitudes = gratitudeList.filter(g => g.trim());
                if (filledGratitudes.length === 0) {
                    setIsSubmitting(false);
                    return;
                }
                winData = {
                    ...winData,
                    content: filledGratitudes,
                    xp: 20
                };
                break;
            case WIN_TYPES.SELF_CARE:
                if (!selectedSelfCare) {
                    setIsSubmitting(false);
                    return;
                }
                winData = {
                    ...winData,
                    type: 'journal', // Log as journal entry for now to show in "Recent Thoughts"
                    content: `Completed self-care activity: ${selectedSelfCare.label}`,
                    label: selectedSelfCare.label,
                    icon: '🧘',
                    xp: selectedSelfCare.xp
                };
                break;
        }

        try {
            await onAddWin(winData);
            setShowSuccess(true);
        } catch (error) {
            console.error("Failed to add win:", error);
            // Optionally show error to user
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setSelectedActivity(null);
        setJournalText('');
        setGratitudeList(['', '', '']);
        setSelectedSelfCare(null);
        setFilterTime('');
        setFilterCost('');
        setActiveTab(WIN_TYPES.ACTIVITY);
        setShowSuccess(false);
    };

    const handleAddAnother = () => {
        // Reset specific fields but keep modal open
        setSelectedActivity(null);
        setJournalText('');
        setGratitudeList(['', '', '']);
        setSelectedSelfCare(null);
        setShowSuccess(false);
    };

    const handleDone = () => {
        resetForm();
        onClose();
    };

    // Filter Self-Care Activities
    const filteredSelfCare = SELF_CARE_ACTIVITIES.filter(activity => {
        if (filterTime && activity.time !== filterTime) return false;
        if (filterCost && activity.cost !== filterCost) return false;
        return true;
    });

    if (showSuccess) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-fade-in-up p-6 text-center">
                    <div className="mb-4 text-5xl">🎉</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Win Logged!</h2>

                    {activeTab === WIN_TYPES.ACTIVITY && selectedActivity && (
                        <div className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-100">
                            <p className="text-blue-800 font-medium italic">
                                "{selectedActivity.benefit}"
                            </p>
                        </div>
                    )}

                    {activeTab !== WIN_TYPES.ACTIVITY && (
                        <p className="text-gray-600 mb-6">Great job taking a positive step for yourself.</p>
                    )}

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleAddAnother}
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
                        >
                            Add Another Win
                        </button>
                        <button
                            onClick={handleDone}
                            className="w-full py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-all"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="bg-blue-600 p-6 text-white flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold">Log a Win</h2>
                        <p className="text-blue-100 text-sm">Every positive action counts!</p>
                    </div>
                    <button onClick={onClose} className="text-white hover:bg-blue-700 p-2 rounded-full transition">
                        ✕
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 shrink-0 overflow-x-auto">
                    {Object.values(WIN_TYPES).map(type => (
                        <button
                            key={type}
                            onClick={() => setActiveTab(type)}
                            className={`flex-1 py-4 px-2 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === type
                                ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50'
                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {type.replace('_', ' ')}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">
                    {activeTab === WIN_TYPES.ACTIVITY && (
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {ACTIVITIES.map(activity => (
                                    <button
                                        key={activity.id}
                                        onClick={() => setSelectedActivity(activity)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${selectedActivity?.id === activity.id
                                            ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                                            : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="text-4xl mb-2">{activity.icon}</span>
                                        <span className="text-xs font-bold text-center text-gray-700">{activity.label}</span>
                                        <span className="text-[10px] font-bold text-blue-500 mt-1">+{activity.xp} XP</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === WIN_TYPES.JOURNAL && (
                        <div>
                            <textarea
                                value={journalText}
                                onChange={(e) => setJournalText(e.target.value)}
                                placeholder="What's on your mind? (Auto-tags: #work, #family)..."
                                className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-gray-700"
                            />
                            <div className="mt-2 text-right text-xs text-gray-400">
                                +15 XP
                            </div>
                        </div>
                    )}

                    {activeTab === WIN_TYPES.GRATITUDE && (
                        <div className="space-y-4">
                            <p className="text-gray-600 font-medium mb-2">I am grateful for...</p>
                            {gratitudeList.map((text, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <span className="text-blue-500 font-bold">{index + 1}.</span>
                                    <input
                                        type="text"
                                        value={text}
                                        onChange={(e) => {
                                            const newList = [...gratitudeList];
                                            newList[index] = e.target.value;
                                            setGratitudeList(newList);
                                        }}
                                        className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Something specific..."
                                    />
                                </div>
                            ))}
                            <div className="mt-2 text-right text-xs text-gray-400">
                                +20 XP
                            </div>
                        </div>
                    )}

                    {activeTab === WIN_TYPES.SELF_CARE && (
                        <div className="space-y-4">
                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                <select
                                    value={filterTime}
                                    onChange={(e) => setFilterTime(e.target.value)}
                                    className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">All Times</option>
                                    {SELF_CARE_CATEGORIES.TIME.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                <select
                                    value={filterCost}
                                    onChange={(e) => setFilterCost(e.target.value)}
                                    className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">All Costs</option>
                                    {SELF_CARE_CATEGORIES.COST.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
                                {filteredSelfCare.length === 0 ? (
                                    <p className="text-center text-gray-500 py-4">No activities match your filters.</p>
                                ) : (
                                    filteredSelfCare.map(activity => (
                                        <button
                                            key={activity.id}
                                            onClick={() => setSelectedSelfCare(activity)}
                                            className={`w-full flex items-center p-3 rounded-xl border-2 transition-all text-left ${selectedSelfCare?.id === activity.id
                                                ? 'border-purple-500 bg-purple-50 shadow-sm'
                                                : 'border-gray-100 hover:border-purple-200'
                                                }`}
                                        >
                                            <div className="flex-1">
                                                <div className="font-bold text-gray-800">{activity.label}</div>
                                                <div className="text-xs text-gray-500 flex gap-2 mt-1">
                                                    <span className="bg-gray-100 px-1.5 rounded">{activity.category}</span>
                                                    <span className="bg-gray-100 px-1.5 rounded">{activity.time}</span>
                                                    <span className="bg-gray-100 px-1.5 rounded">{activity.cost}</span>
                                                </div>
                                            </div>
                                            <span className="ml-2 text-xs font-bold text-purple-600">+{activity.xp} XP</span>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end shrink-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-gray-500 font-bold hover:text-gray-700 mr-4"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={
                            (activeTab === WIN_TYPES.ACTIVITY && !selectedActivity) ||
                            (activeTab === WIN_TYPES.JOURNAL && !journalText.trim()) ||
                            (activeTab === WIN_TYPES.GRATITUDE && !gratitudeList.some(g => g.trim())) ||
                            (activeTab === WIN_TYPES.SELF_CARE && !selectedSelfCare)
                        }
                        className="px-8 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 transition-all"
                    >
                        {isSubmitting ? 'Claiming...' : 'Claim Win!'}
                    </button>
                </div>
            </div>
        </div>
    );
}
