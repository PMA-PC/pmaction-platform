import React, { useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useReactToPrint } from 'react-to-print';
import { useApp } from '../lib/context';
import { analyticsService } from '../lib/services/analyticsService';
import { pdfService } from '../lib/services/pdfService';
import { MoodChart } from '../components/MoodChart';
import { MoodHeatmap } from '../components/MoodHeatmap';

const ReportPage = () => {
    const router = useRouter();
    const { userProfile, dailyLogs, wins } = useApp();
    const componentRef = useRef();

    // Prepare Data
    const moodHistory = analyticsService.getMoodHistory(dailyLogs || {});
    const xpGrowth = analyticsService.getXPGrowth(wins || []);
    const reportSummary = pdfService.generateReportSummary(userProfile, {}, moodHistory);

    // Print Handler
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `PMAction_Report_${new Date().toISOString().split('T')[0]}`,
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
            <Head>
                <title>My Report | PMAction</title>
            </Head>

            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-10 print:hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center cursor-pointer" onClick={() => router.push('/dashboard')}>
                            <span className="text-2xl mr-2">⬅️</span>
                            <h1 className="text-xl font-bold text-gray-900">Reports & Analytics</h1>
                        </div>
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print Report
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Printable Content Area */}
                <div ref={componentRef} className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 print:shadow-none print:border-none">

                    {/* Report Header */}
                    <div className="border-b-2 border-gray-100 pb-8 mb-8 flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Progress Report</h1>
                            <p className="text-gray-500">Generated on {reportSummary.generatedAt}</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-bold text-blue-600">PMAction</h2>
                            <p className="text-sm text-gray-400">Personal Mental Wellness</p>
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="text-xs font-bold text-blue-600 uppercase mb-1">Current Level</p>
                            <p className="text-3xl font-black text-gray-900">{reportSummary.currentLevel}</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                            <p className="text-xs font-bold text-purple-600 uppercase mb-1">Total XP</p>
                            <p className="text-3xl font-black text-gray-900">{reportSummary.totalXP}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                            <p className="text-xs font-bold text-green-600 uppercase mb-1">Avg Mood</p>
                            <p className="text-3xl font-black text-gray-900">{reportSummary.averageMood}</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                            <p className="text-xs font-bold text-orange-600 uppercase mb-1">Entries</p>
                            <p className="text-3xl font-black text-gray-900">{reportSummary.totalEntries}</p>
                        </div>
                    </div>

                    {/* Mood Analysis Section */}
                    <div className="mb-12 break-inside-avoid">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="text-2xl">📈</span> Mood Trends
                        </h2>

                        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm print:shadow-none print:border">
                            <h3 className="font-bold text-gray-700 mb-4">Mood Over Time</h3>
                            <MoodChart data={moodHistory} />
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm print:shadow-none print:border">
                            <h3 className="font-bold text-gray-700 mb-4">Mood Calendar (Last 30 Days)</h3>
                            <MoodHeatmap data={moodHistory} />
                        </div>
                    </div>

                    {/* Recent Wins Section */}
                    <div className="break-inside-avoid">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="text-2xl">🏆</span> Recent Wins
                        </h2>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            {wins && wins.length > 0 ? (
                                <ul className="space-y-3">
                                    {wins.slice(0, 5).map((win, idx) => (
                                        <li key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">{win.icon || '✅'}</span>
                                                <div>
                                                    <p className="font-bold text-gray-800">{win.label || 'Win'}</p>
                                                    <p className="text-xs text-gray-500">{new Date(win.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-green-600">+{win.xp_earned} XP</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 italic">No wins recorded yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Footer for Print */}
                    <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-400 hidden print:block">
                        <p>PMAction - Your Personal Mental Wellness Journey</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReportPage;
