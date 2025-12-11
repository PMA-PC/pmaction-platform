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
import CrisisModal from '../components/CrisisModal';
import DailyQuote from '../components/DailyQuote';
import SmartInsight from '../components/SmartInsight';
import TimeDurationCards from '../components/TimeDurationCards';
import ContentRecommendationCard from '../components/ContentRecommendationCard';
import { AICoachModal } from '../components/AICoachModal';

const DashboardPage = () => {
    const router = useRouter();
    const { user, stats, dailyLogs, wins, userProfile, addWin, activeChallenge } = useApp();
    const [isWinModalOpen, setIsWinModalOpen] = useState(false);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [isSelfCareHubOpen, setIsSelfCareHubOpen] = useState(false);
    const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
    const [isAICoachOpen, setIsAICoachOpen] = useState(false);
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
        return result;
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

            {isCrisisModalOpen && (
                <CrisisModal onClose={() => setIsCrisisModalOpen(false)} />
            )}

            {isAICoachOpen && (
                <AICoachModal onClose={() => setIsAICoachOpen(false)} />
            )}

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
                                onClick={() => router.push('/advocacy')}
                                className="text-sm font-medium text-gray-500 hover:text-gray-700 mr-4"
                            >
                                Advocacy
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
                {/* Header: Daily Quote */}
                <DailyQuote />

                {/* Top Section: Navigation Buttons (4 Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Recommendation Widget */}
                    <div onClick={() => setIsWinModalOpen(true)} className="h-full cursor-pointer transform hover:scale-[1.02] transition-transform">
                        <RecommendationWidget />
                    </div>

                    {/* Mood Check-In */}
                    {(() => {
                        const hasMood = wins.some(w => w.label === 'Mood Check-in');
                        return (
                            <button
                                onClick={() => {
                                    setModalTab('mood');
                                    setIsWinModalOpen(true);
                                }}
                                className={`p-4 bg-white border-2 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all group flex flex-col items-center justify-center text-center min-h-[120px] ${hasMood ? 'border-green-500 bg-green-50' : 'border-fuchsia-500'}`}
                            >
                                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">{hasMood ? '✅' : '🎭'}</span>
                                <span className={`font-bold text-lg ${hasMood ? 'text-green-700' : 'text-fuchsia-700'}`}>{hasMood ? 'Mood Checked' : 'Mood Check-In'}</span>
                            </button>
                        );
                    })()}

                    {/* Self-Care */}
                    {(() => {
                        const hasSelfCare = wins.some(w => w.win_type === 'self_care');
                        return (
                            <button
                                onClick={() => setIsSelfCareHubOpen(true)}
                                className={`p-4 bg-white border-2 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all group flex flex-col items-center justify-center text-center min-h-[120px] ${hasSelfCare ? 'border-green-500 bg-green-50' : 'border-purple-500'}`}
                            >
                                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">{hasSelfCare ? '✅' : '🧘'}</span>
                                <span className={`font-bold text-lg ${hasSelfCare ? 'text-green-700' : 'text-purple-700'}`}>{hasSelfCare ? 'Self-Care Done' : 'Self-Care'}</span>
                            </button>
                        );
                    })()}

                    {/* Resources / HELP NOW */}
                    <button
                        onClick={() => router.push('/advocacy')}
                        className="p-4 bg-indigo-50 border-2 border-indigo-500 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all group flex flex-col items-center justify-center text-center min-h-[120px]"
                    >
                        <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🆘</span>
                        <span className="font-bold text-lg text-indigo-700">Resources / HELP NOW</span>
                    </button>
                </div>

                {/* Main Content Grid: Gamification Stats & Active Challenge */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Left Column: Gamification Stats */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                {userProfile?.nickname || userProfile?.preferred_name || user?.user_metadata?.full_name || 'User'}'s PMActions Dashboard
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 bg-blue-50 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-blue-600">{currentLevel}</div>
                                    <div className="text-xs font-bold text-blue-400 uppercase">Level</div>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-purple-600">{userProfile?.xp || 0}</div>
                                    <div className="text-xs font-bold text-purple-400 uppercase">Total XP</div>
                                </div>
                                <div className="p-4 bg-orange-50 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-orange-600">{userProfile?.streak_days || 0}</div>
                                    <div className="text-xs font-bold text-orange-400 uppercase">Day Streak</div>
                                </div>
                                <div className="p-4 bg-green-50 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-green-600">{wins.length}</div>
                                    <div className="text-xs font-bold text-green-400 uppercase">Wins Today</div>
                                </div>
                            </div>
                        </div>

                        {/* Content Recommendations (Blogs/Challenges) */}
                        <ContentRecommendationCard />

                        {/* Recent Wins / History */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Victories</h2>
                            <div className="space-y-3">
                                {wins.slice(0, 3).map((win, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <span className="text-2xl">{win.icon || '🏆'}</span>
                                        <div>
                                            <p className="font-bold text-gray-800">{win.label}</p>
                                            <p className="text-xs text-gray-500">{new Date(win.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                        <span className="ml-auto font-bold text-blue-600">+{win.xp} XP</span>
                                    </div>
                                ))}
                                {wins.length === 0 && (
                                    <p className="text-gray-400 text-center py-4">No wins yet today. Go get one!</p>
                                )}
                            </div>
                        </div>

                        {/* Smart Insight (Moved to bottom of left column) */}
                        <SmartInsight onOpenCoach={() => setIsAICoachOpen(true)} />
                    </div>

                    {/* Right Column: Time Cards, Smart Focus & Active Challenge */}
                    <div className="space-y-6">
                        {/* Time Duration Cards (1, 5, 10+ min) */}
                        <TimeDurationCards />

                        <SmartFocusCard
                            dailyStatus={{
                                win: wins.length > 0,
                                mood: wins.some(w => w.label === 'Mood Check-in'),
                                selfCare: wins.some(w => w.win_type === 'self_care')
                            }}
                            onAction={(action) => {
                                if (action === 'win') setIsWinModalOpen(true);
                                if (action === 'mood') { setModalTab('mood'); setIsWinModalOpen(true); }
                                if (action === 'self_care') setIsSelfCareHubOpen(true);
                            }}
                        />

                        {/* Active Challenge Card (Below Smart Focus) */}
                        <ActiveChallengeCard challenge={activeChallenge} />
                    </div>
                </div>

                {/* Floating Action Button (FAB) - Global "Bubble" */}
                <button
                    onClick={() => {
                        setModalTab('journal');
                        setIsWinModalOpen(true);
                    }}
                    className="fixed bottom-8 right-8 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-2xl flex items-center gap-3 text-white font-bold hover:scale-105 transition-all duration-300 z-50 ring-4 ring-blue-200"
                    aria-label="Log a Win"
                >
                    <span className="text-2xl">➕</span>
                    <span className="text-lg">PMA Log</span>
                </button>
            </main>
        </div>
    );
};

export default DashboardPage;
