import React, { useState, useEffect } from 'react';
import { SELF_CARE_ACTIVITIES, SELF_CARE_CONTENT, SELF_CARE_CATEGORIES } from '../lib/selfCareData';

export default function SelfCareHub({ isOpen, onClose, onLogActivity }) {
    const [personalization, setPersonalization] = useState({
        kids: false,
        pets: false,
        outdoors: false
    });

    const [recommendations, setRecommendations] = useState({
        '1 min': [],
        '3 min': [],
        '5 min': [],
        '10 min': [],
        '20+ min': []
    });

    // Load personalization from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('pma_personalization');
        if (saved) {
            setPersonalization(JSON.parse(saved));
        }
    }, []);

    // Save personalization when changed
    useEffect(() => {
        localStorage.setItem('pma_personalization', JSON.stringify(personalization));
        refreshAllRecommendations();
    }, [personalization]);

    const togglePersonalization = (key) => {
        setPersonalization(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const getFilteredActivities = (timeCategory) => {
        return SELF_CARE_ACTIVITIES.filter(activity => {
            // Time match
            if (activity.time !== timeCategory) return false;

            // Tag filtering
            // If activity has 'kids' tag, user must have 'kids' enabled
            if (activity.tags.includes('kids') && !personalization.kids) return false;
            if (activity.tags.includes('pets') && !personalization.pets) return false;
            if (activity.tags.includes('outdoors') && !personalization.outdoors) return false;

            return true;
        });
    };

    const getRandomActivities = (timeCategory, count = 3) => {
        const filtered = getFilteredActivities(timeCategory);
        const shuffled = [...filtered].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const refreshAllRecommendations = () => {
        setRecommendations({
            '1 min': getRandomActivities('1 min'),
            '3 min': getRandomActivities('3 min'),
            '5 min': getRandomActivities('5 min'),
            '10 min': getRandomActivities('10 min'),
            '20+ min': getRandomActivities('20+ min')
        });
    };

    const refreshCategory = (timeCategory) => {
        setRecommendations(prev => ({
            ...prev,
            [timeCategory]: getRandomActivities(timeCategory)
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto animate-fade-in">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Self-Care Center</h1>
                        <p className="text-sm text-gray-500">Personalized wellness just for you.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        ✕ Close
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                {/* Personalization Toggles */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Customize Your Experience</h3>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => togglePersonalization('kids')}
                            className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${personalization.kids
                                ? 'bg-blue-100 border-blue-200 text-blue-700'
                                : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {personalization.kids ? '✓' : '+'} I have Kids
                        </button>
                        <button
                            onClick={() => togglePersonalization('pets')}
                            className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${personalization.pets
                                ? 'bg-green-100 border-green-200 text-green-700'
                                : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {personalization.pets ? '✓' : '+'} I have Pets
                        </button>
                        <button
                            onClick={() => togglePersonalization('outdoors')}
                            className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${personalization.outdoors
                                ? 'bg-yellow-100 border-yellow-200 text-yellow-700'
                                : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {personalization.outdoors ? '✓' : '+'} Access to Outdoors
                        </button>
                    </div>
                </div>

                {/* Time-Based Recommendations */}
                <div className="space-y-8">
                    {Object.entries(recommendations).map(([time, activities]) => {
                        // Generate curation text based on the tags present in the recommended activities
                        const activeTags = [...new Set(activities.flatMap(a => a.tags))].filter(tag =>
                            (tag === 'kids' && personalization.kids) ||
                            (tag === 'pets' && personalization.pets) ||
                            (tag === 'outdoors' && personalization.outdoors)
                        );
                        const curationText = activeTags.length > 0
                            ? `Curated for your profile: ${activeTags.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}`
                            : "Recommended for you";

                        return (
                            <div key={time} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in-up">
                                {/* Card Header */}
                                <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                            ⏱️ {time} <span className="text-gray-500 font-normal text-base">Reset</span>
                                        </h2>
                                        <p className="text-xs text-blue-600 font-medium mt-1">
                                            ✨ {curationText}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => refreshCategory(time)}
                                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm flex items-center gap-1"
                                    >
                                        🔄 Refresh
                                    </button>
                                </div>

                                {/* Activities Grid */}
                                <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {activities.length > 0 ? (
                                        activities.map(activity => (
                                            <button
                                                key={activity.id}
                                                onClick={() => onLogActivity(activity)}
                                                className="h-full flex flex-col p-4 rounded-xl border-2 border-transparent bg-blue-50 hover:bg-white hover:border-blue-500 hover:shadow-md transition-all text-left group"
                                            >
                                                <div className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors text-lg">
                                                    {activity.label}
                                                </div>
                                                <p className="text-sm text-gray-600 mb-4 flex-1">
                                                    {activity.benefit}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-auto">
                                                    {activity.tags.map(tag => (
                                                        <span key={tag} className={`px-2 py-0.5 text-[10px] rounded-full uppercase tracking-wide font-bold ${['kids', 'pets', 'outdoors'].includes(tag) ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
                                                            }`}>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    <span className="ml-auto text-xs font-bold text-purple-600">+{activity.xp} XP</span>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="col-span-3 text-center py-8 text-gray-400">
                                            No activities match your current filters. Try adjusting your personalization settings.
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                    {/* Quizzes */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">🧠 Quizzes & Assessments</h2>
                        <div className="space-y-3">
                            {SELF_CARE_CONTENT.QUIZZES.map(quiz => (
                                <div key={quiz.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-gray-800">{quiz.title}</div>
                                        <div className="text-xs text-gray-500">{quiz.description}</div>
                                    </div>
                                    <button className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold hover:bg-purple-200 transition-colors">
                                        Start
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Blogs */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">📚 Recommended Reading</h2>
                        <div className="space-y-3">
                            {SELF_CARE_CONTENT.BLOGS.map(blog => (
                                <div key={blog.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-gray-800">{blog.title}</div>
                                        <div className="text-xs text-gray-500">{blog.description}</div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                        {blog.readTime}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
