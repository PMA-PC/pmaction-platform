import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useApp } from '../lib/context';
import { supabase } from '../lib/supabaseClient';
import AddWinModal from '../components/AddWinModal';
import LevelUpModal from '../components/LevelUpModal';
import RecommendationWidget from '../components/RecommendationWidget';
import SmartFocusCard from '../components/SmartFocusCard';
import SelfCareHub from '../components/SelfCareHub';
import ActiveChallengeCard from '../components/ActiveChallengeCard';

const DashboardPage = () => {
    const router = useRouter();
    const { user, stats, dailyLogs, wins, userProfile, addWin } = useApp();
    const [isWinModalOpen, setIsWinModalOpen] = useState(false);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [isSelfCareHubOpen, setIsSelfCareHubOpen] = useState(false);
    const [newLevel, setNewLevel] = useState(1);
    const [modalTab, setModalTab] = useState(null); // 'journal', 'self_care', etc.

    // Process Daily Logs for display
    const sortedDates = Object.keys(dailyLogs || {}).sort((a, b) => new Date(b) - new Date(a));

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const handleAddWin = async (winData) => {
        const result = await addWin(winData);
        if (result?.success) {
            if (result.leveledUp) {
                setNewLevel(result.newLevel);
                setIsLevelUpModalOpen(true);
            }
        } else {
            // alert('Failed to add win');
        }
    };

    const handleSelfCareLog = async (activity) => {
        const winData = {
            type: 'journal', // Log as journal entry for consistency
            win_type: 'self_care',
            content: `Completed self-care activity: ${activity.label}`,
            label: activity.label,
            icon: '🧘',
            xp: activity.xp
        };
        await handleAddWin(winData);
        setIsSelfCareHubOpen(false);
    };

    // Calculate progress to next level
    const currentLevel = userProfile?.level || 1;
    const currentXp = userProfile?.xp || 0;
    const progressPercent = Math.min(100, (currentXp % 100) / 100 * 100);

    return (
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
            <Head>
                <title>Dashboard | PMAction</title>
                <meta name="description" content="Your personal dashboard for mental well-being" />
            </Head>

            <AddWinModal
                isOpen={isWinModalOpen}
                onClose={() => {
                    setIsWinModalOpen(false);
                    setModalTab(null);
                }}
                onAddWin={handleAddWin}
                initialTab={modalTab}
            />

            <SelfCareHub
                isOpen={isSelfCareHubOpen}
                onClose={() => setIsSelfCareHubOpen(false)}
                onLogActivity={handleSelfCareLog}
            />

            <LevelUpModal
                isOpen={isLevelUpModalOpen}
                onClose={() => setIsLevelUpModalOpen(false)}
                newLevel={newLevel}
                rewards={{ gold: 50 }}
            />

            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-blue-600">PMAction</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center mr-4 bg-blue-50 px-3 py-1 rounded-full">
                                <span className="text-sm font-bold text-blue-800 mr-2">Level {currentLevel}</span>
                                <div className="w-24 h-2 bg-blue-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-500"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => router.push('/report')}
                                className="text-sm font-medium text-gray-500 hover:text-gray-700 mr-4"
                            >
                                Reports
                            </button>
                            <button
                                onClick={() => router.push('/settings')}
                                className="text-sm font-medium text-gray-500 hover:text-gray-700 mr-4"
                            >
                                Settings
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-gray-500 hover:text-gray-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome back, {userProfile?.nickname || userProfile?.preferred_name || user?.user_metadata?.full_name || user?.email?.split('@')[0]}! 👋
                        </h1>
                        <p className="mt-1 text-gray-600">Ready to win the day?</p>
                    </div>
                    <button
                        onClick={() => setIsWinModalOpen(true)}
                        className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition-all flex items-center"
                    >
                        <span className="text-xl mr-2">🏆</span> Log a Win
                    </button>
                </div>

                {/* Top Section: Recommendation + Nav Buttons (4 Columns) */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                    {/* Column 1: Recommendation Widget */}
                    <div onClick={() => setIsWinModalOpen(true)} className="h-full">
                        <RecommendationWidget />
                    </div>

                    {/* Columns 2-4: Navigation Buttons (Card Style) */}
                    <button
                        onClick={() => {
                            setModalTab('journal');
                            setIsWinModalOpen(true);
                        }}
                        className="p-4 bg-white border-2 border-fuchsia-500 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all group flex flex-col items-center justify-center text-center min-h-[120px]"
                    >
                        <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🎭</span>
                        <span className="font-bold text-lg text-fuchsia-700">Mood Check-In</span>
                    </button>

                    <button
                        onClick={() => setIsSelfCareHubOpen(true)}
                        className="p-4 bg-white border-2 border-purple-500 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all group flex flex-col items-center justify-center text-center min-h-[120px]"
                    >
                        <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🧘</span>
                        <span className="font-bold text-lg text-purple-700">Self-Care</span>
                    </button>

                    <button
                        onClick={() => router.push('/library')}
                        className="p-4 bg-white border-2 border-indigo-500 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all group flex flex-col items-center justify-center text-center min-h-[120px]"
                    >
                        <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🆘</span>
                        <span className="font-bold text-lg text-indigo-700">Resources / HELP</span>
                    </button>
                </div>

                {/* Daily Overview Checklist & Smart Focus */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Left Column: Daily Overview Checklist */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Daily Overview</h2>
                            <span className="text-sm font-medium text-gray-500">{new Date().toLocaleDateString()}</span>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Checklist Items */}
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${dailyLogs[new Date().toISOString().split('T')[0]]?.mood_score ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                                        {dailyLogs[new Date().toISOString().split('T')[0]]?.mood_score && '✓'}
                                    </div>
                                    <span className="font-bold text-gray-700">Mood Check-In</span>
                                </div>
                                {!dailyLogs[new Date().toISOString().split('T')[0]]?.mood_score && (
                                    <button onClick={() => { setModalTab('journal'); setIsWinModalOpen(true); }} className="text-sm text-blue-600 font-bold hover:underline">Check In</button>
                                )}
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${wins.length > 0 ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                                        {wins.length > 0 && '✓'}
                                    </div>
                                    <span className="font-bold text-gray-700">Log a Win</span>
                                </div>
                                {wins.length === 0 && (
                                    <button onClick={() => setIsWinModalOpen(true)} className="text-sm text-blue-600 font-bold hover:underline">Log Win</button>
                                )}
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${wins.some(w => w.win_type === 'self_care' || w.win_type === 'mindfulness') ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                                        {wins.some(w => w.win_type === 'self_care' || w.win_type === 'mindfulness') && '✓'}
                                    </div>
                                    <span className="font-bold text-gray-700">Self-Care / Mindfulness</span>
                                </div>
                                {!wins.some(w => w.win_type === 'self_care' || w.win_type === 'mindfulness') && (
                                    <button onClick={() => setIsSelfCareHubOpen(true)} className="text-sm text-blue-600 font-bold hover:underline">Do It</button>
                                )}
                            </div>

                            {/* Free Form Quick Add */}
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Quick Add Win</label>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const text = e.target.elements.quickWin.value;
                                        if (text.trim()) {
                                            handleAddWin({ label: text, xp: 5, icon: '⚡', win_type: 'activity' });
                                            e.target.reset();
                                        }
                                    }}
                                    className="flex gap-2"
                                >
                                    <input
                                        name="quickWin"
                                        type="text"
                                        placeholder="I drank water, I made the bed..."
                                        className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    />
                                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                                        Add
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Smart Rotating Focus Card & Active Challenge */}
                    <div className="space-y-8">
                        <SmartFocusCard
                            dailyStatus={{
                                mood: !!dailyLogs[new Date().toISOString().split('T')[0]]?.mood_score,
                                win: wins.length > 0,
                                selfCare: wins.some(w => w.win_type === 'self_care' || w.win_type === 'mindfulness')
                            }}
                            onAction={(action) => {
                                if (action === 'mood') { setModalTab('journal'); setIsWinModalOpen(true); }
                                else if (action === 'self_care') { setIsSelfCareHubOpen(true); }
                                else { setIsWinModalOpen(true); }
                            }}
                        />

                        {/* Active Challenge Card (Mocked with Physiology First) */}
                        <ActiveChallengeCard
                            challenge={{
                                title: 'Physiology First',
                                duration: 5,
                                id: 'physiology_first'
                            }}
                        />
                    </div>
                </div>

                {/* Floating Action Button (FAB) */}
                <button
                    onClick={() => {
                        setModalTab('journal');
                        setIsWinModalOpen(true);
                    }}
                    className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-2xl flex items-center justify-center text-white text-3xl font-bold hover:scale-110 hover:rotate-90 transition-all duration-300 z-50 ring-4 ring-pink-200"
                    aria-label="Log a Win"
                >
                    ➕
                </button>
            </main>
        </div>
    );
};

export default DashboardPage;
