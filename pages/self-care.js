import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useApp } from '../lib/context';
import { MENTAL_HEALTH_CONDITIONS, SCREENINGS_MAP, WELLNESS_SKILLS, WELLNESS_CATEGORY_DESCRIPTIONS } from '../lib/constants';
import { generateActionPlan, generatePersonalizedInsights, generateQuiz, generateGratitudePrompt } from '../lib/services/geminiService';
import Spinner from '../components/Spinner';

// Import our helper components
import {
    MoodChart, NoteEditor, TagEditor,
    ScreeningRunner, ScreeningResultPage,
    ASDQuizRunner, ASDResultPage
} from '../components/SelfCareComponents';

// --- MOCK USER DATA CONTEXT ADAPTER ---
// This bridges the gap between the user's requested code structure (useUserData) 
// and our actual building blocks (useApp + LocalStorage).

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

const UserDataProvider = ({ children }) => {
    const { user, dailyLogs, addWin, wins } = useApp(); // Use actual app data where compatible

    // --- Local State for Features not yet in DB ---
    const [history, setHistory] = useState([]); // Screenings
    const [reading, setReading] = useState([]); // Saved posts
    const [gratitudeJournal, setGratitudeJournal] = useState([]);
    const [favoriteWellnessSkills, setFavorites] = useState([]);
    const [generatedQuizzes, setGeneratedQuizzes] = useState([]);
    const [mounted, setMounted] = useState(false);

    // Derived Moods from DailyLogs for MoodChart
    const moods = useMemo(() => {
        if (!dailyLogs) return [];
        return Object.entries(dailyLogs)
            .filter(([_, log]) => log.mood_score !== null)
            .map(([date, log]) => ({
                id: date, // use date as id
                date: date,
                mood: {
                    score: log.mood_score,
                    name: log.emotion_data?.primary || (log.mood_score > 7 ? 'Great' : log.mood_score > 4 ? 'Okay' : 'Low'),
                    emoji: log.emotion_data?.emoji || (log.mood_score > 7 ? '😊' : log.mood_score > 4 ? '😐' : '😔')
                },
                comment: log.journal_content,
                tags: [] // Tags support needed in DB later
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [dailyLogs]);

    // Load from LocalStorage on mount
    useEffect(() => {
        setHistory(JSON.parse(localStorage.getItem('pma_history') || '[]'));
        setReading(JSON.parse(localStorage.getItem('pma_reading') || '[]'));
        setGratitudeJournal(JSON.parse(localStorage.getItem('pma_gratitude') || '[]'));
        setFavorites(JSON.parse(localStorage.getItem('pma_favorites') || '[]'));
        setGeneratedQuizzes(JSON.parse(localStorage.getItem('pma_quizzes') || '[]'));
        setMounted(true);
    }, []);

    // Sync to LocalStorage
    useEffect(() => {
        if (mounted) localStorage.setItem('pma_history', JSON.stringify(history));
    }, [history, mounted]);
    useEffect(() => {
        if (mounted) localStorage.setItem('pma_reading', JSON.stringify(reading));
    }, [reading, mounted]);
    useEffect(() => {
        if (mounted) localStorage.setItem('pma_gratitude', JSON.stringify(gratitudeJournal));
    }, [gratitudeJournal, mounted]);
    useEffect(() => {
        if (mounted) localStorage.setItem('pma_favorites', JSON.stringify(favoriteWellnessSkills));
    }, [favoriteWellnessSkills, mounted]);
    useEffect(() => {
        if (mounted) localStorage.setItem('pma_quizzes', JSON.stringify(generatedQuizzes));
    }, [generatedQuizzes, mounted]);

    // Actions
    const addResult = (result) => {
        setHistory(prev => [result, ...prev]);
        // Also award XP via main app
        addWin({ title: 'Completed Assessment', xp_earned: 50, type: 'assessment' });
    };

    const addGeneratedQuiz = (quiz) => {
        setGeneratedQuizzes(prev => [quiz, ...prev]);
    }

    const addGratitudeEntry = (content) => {
        const newEntry = { id: Date.now(), date: new Date().toISOString(), content };
        setGratitudeJournal(prev => [newEntry, ...prev]);
        addWin({ title: 'Gratitude Journaling', xp_earned: 20, type: 'journal', content: `Gratitude: ${content}` });
    };

    const toggleFavoriteWellnessSkill = (id) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const updateNoteOnSavedPost = (id, note) => {
        setReading(prev => prev.map(p => p.id === id ? { ...p, note } : p));
    };

    const toggleReading = (post) => {
        setReading(prev => {
            if (prev.find(p => p.id === post.id)) {
                return prev.filter(p => p.id !== post.id);
            } else {
                return [post, ...prev];
            }
        });
    };

    // Stubs for reading list fetching if needed, currently just local
    const updateMoodTags = () => { }; // Stub
    const updatePostTags = () => { }; // Stub

    return (
        <UserDataContext.Provider value={{
            history, addResult,
            moods,
            reading, toggleReading, updateNoteOnSavedPost,
            gratitudeJournal, addGratitudeEntry,
            favoriteWellnessSkills, toggleFavoriteWellnessSkill,
            generatedQuizzes, addGeneratedQuiz,
            updateMoodTags, updatePostTags,
            isLoading: !mounted
        }}>
            {children}
        </UserDataContext.Provider>
    );
};

// --- AUTH MOCK ---
const useAuth = () => {
    const { user } = useApp();
    const router = useRouter();
    return {
        user,
        promptLogin: () => {
            if (confirm("Please log in to continue.")) router.push('/settings');
        }
    }
}


// ==========================================
// USER CODE INTEGRATION (Refactored imports)
// ==========================================

const SelfAssessments = ({ setPage }) => {
    const { user, promptLogin } = useAuth();
    const { history, addResult, moods, generatedQuizzes, addGeneratedQuiz } = useUserData();

    const [view, setView] = useState('list');
    const [activeScreening, setActiveScreening] = useState(null);
    const [quizSelection, setQuizSelection] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const screenings = useMemo(() => {
        return [...Object.values(SCREENINGS_MAP), ...generatedQuizzes];
    }, [generatedQuizzes]);

    const handleGenerateQuiz = async () => {
        if (!searchTerm.trim()) return;
        setIsGenerating(true);
        const newQuiz = await generateQuiz(searchTerm);
        if (newQuiz) {
            addGeneratedQuiz(newQuiz);
            setSearchTerm(''); // Clear search
        } else {
            alert("Sorry, we couldn't generate a quiz on that topic. Please try another one.");
        }
        setIsGenerating(false);
    };

    const filteredScreenings = useMemo(() => {
        return screenings.filter(s => {
            // Logic adaptation for nested short/long structure in constants vs generated flat structure
            const item = s.short ? s.short : s;

            const categoryFilterString = filter.toLowerCase().split(' ')[0];
            // Mock category for generated
            const itemCategory = item.category || 'General';

            const categoryMatch = filter === 'All' || (s.short ? 'Clinical' : 'General') === filter || true; // Simplification for demo

            const title = item.title || item.quizTitle || '';
            const desc = item.description || '';

            const searchMatch = !searchTerm || title.toLowerCase().includes(searchTerm.toLowerCase()) || desc.toLowerCase().includes(searchTerm.toLowerCase());
            return searchMatch;
        });
    }, [filter, searchTerm, screenings]);

    const handleSelectScreening = (screeningData) => {
        if (!user) {
            promptLogin();
            return;
        }

        if (screeningData.short) {
            setQuizSelection(screeningData);
            setView('quizSelection');
        } else {
            setActiveScreening(screeningData);
            setView('runner');
        }
    };

    const startQuiz = (quiz) => {
        setActiveScreening(quiz);
        setQuizSelection(null);
        setView('runner');
    }

    const reset = () => {
        setView('list');
        setActiveScreening(null);
        setResult(null);
        setAnswers([]);
        setQuestionIndex(0);
        setQuizSelection(null);
    }

    const handleSimpleAnswer = (value) => {
        const currentAnswers = [...answers, value];
        setAnswers(currentAnswers);

        if (questionIndex + 1 < activeScreening.questions.length) {
            setQuestionIndex(q => q + 1);
        } else {
            const score = currentAnswers.reduce((s, v) => s + v, 0);
            // Fallback scoring if generated quiz has simplified scoring
            const scoring = activeScreening.scoring || [{ range: [0, 100], level: 'Completed', interpretation: 'Well done.', recommendation: 'Keep it up.' }];

            const resultTier = scoring.find(tier => score >= tier.range[0] && score <= tier.range[1]) || scoring[0];

            if (resultTier) {
                const res = {
                    id: Date.now(),
                    screeningId: activeScreening.id,
                    title: activeScreening.title,
                    score,
                    level: resultTier.level,
                    interpretation: resultTier.interpretation,
                    recommendation: resultTier.recommendation,
                    date: new Date().toISOString(),
                    type: 'simple'
                };
                setResult(res);
                setView('result');
                addResult(res);
            }
        }
    };

    const handleASDComplete = (resultData) => {
        const res = { ...resultData, type: 'categorized' };
        setResult(res);
        setView('result');
        addResult(res);
    }

    if (view === 'result' && result) {
        if (result.type === 'simple') {
            return <ScreeningResultPage result={result} screening={activeScreening} onBack={reset} setPage={setPage} />;
        }
        if (result.type === 'categorized') {
            return <ASDResultPage result={result} onBack={reset} />;
        }
    }

    if (view === 'runner' && activeScreening) {
        if (activeScreening.questions && typeof activeScreening.questions[0] === 'string') {
            return <ScreeningRunner screening={activeScreening} questionIndex={questionIndex} onAnswer={handleSimpleAnswer} onBack={reset} />;
        }
        if (activeScreening.questions && activeScreening.questions[0].trait) {
            return <ASDQuizRunner quiz={activeScreening} onComplete={handleASDComplete} onBack={reset} />;
        }
    }

    if (view === 'quizSelection' && quizSelection) {
        return (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg animate-fade-in text-center">
                <h2 className="text-2xl font-bold mb-4">Choose Assessment Length</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <button onClick={() => startQuiz(quizSelection.short)} className="flex-1 bg-green-50 p-4 rounded-lg hover:bg-green-100">
                        <h3 className="font-bold text-brand-primary">Short Assessment</h3>
                        <p className="text-sm text-gray-700">{quizSelection.short.timeToComplete}</p>
                    </button>
                    <button onClick={() => startQuiz(quizSelection.long)} className="flex-1 bg-yellow-50 p-4 rounded-lg hover:bg-yellow-100">
                        <h3 className="font-bold text-yellow-800">Comprehensive Assessment</h3>
                        <p className="text-sm text-gray-700">{quizSelection.long.timeToComplete}</p>
                    </button>
                </div>
                <button onClick={reset} className="mt-6 text-gray-600">Back</button>
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <p className="text-gray-600 max-w-2xl mx-auto text-center">These tools are for informational purposes only.</p>

            {user && moods.length > 0 && <MoodChart moods={moods} />}

            <div className="sticky top-[70px] bg-gray-50/80 backdrop-blur-sm z-10 py-4 -my-4">
                <input
                    type="search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search for a quiz (e.g., 'stress', 'confidence')..."
                    className="w-full p-4 border-2 rounded-full mb-4"
                />
            </div>

            {user && history.length > 0 &&
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Your History</h2>
                    {history.slice(0, 3).map(r => (
                        <div key={r.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2">
                            <div><p className="font-semibold">{r.title || r.quizTitle}</p><p className="text-sm text-gray-600">{new Date(r.date).toLocaleDateString()}</p></div>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{r.level || 'Completed'}</span>
                        </div>
                    ))}
                </div>
            }

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScreenings.map((screeningData, i) => {
                    const displayData = screeningData.short ? screeningData.short : screeningData;
                    return (
                        <div key={displayData.id || i} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group h-full">
                            {displayData.imageUrl && <img src={displayData.imageUrl} alt="" className="w-full h-32 object-cover" />}
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-gray-800">{displayData.title}</h3>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                    {displayData.source === 'AI Generated' && <span className="font-bold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">AI</span>}
                                    <span>{displayData.timeToComplete}</span>
                                </div>
                                <p className="text-gray-600 mb-3 flex-grow text-sm">{displayData.description}</p>
                                <button onClick={() => handleSelectScreening(screeningData)} className="w-full mt-auto bg-brand-primary text-white py-2 rounded-lg font-semibold text-sm hover:bg-green-800 transition-colors">
                                    Start
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            {searchTerm && filteredScreenings.length === 0 && !isGenerating && (
                <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-2">No quiz found for "{searchTerm}"</h3>
                    <button
                        onClick={handleGenerateQuiz}
                        className="bg-brand-secondary text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600"
                    >
                        Generate Quiz with AI ✨
                    </button>
                </div>
            )}
            {isGenerating && <Spinner />}
        </div>
    );
}

const WellnessSkills = () => {
    const { favoriteWellnessSkills, toggleFavoriteWellnessSkill } = useUserData();
    const [expandedSkill, setExpandedSkill] = useState(null);
    const [isLoadingAi, setIsLoadingAi] = useState(false);

    const skillsByCategory = React.useMemo(() => {
        const favorites = WELLNESS_SKILLS.filter(skill => favoriteWellnessSkills.includes(skill.id));
        const regularSkills = WELLNESS_SKILLS.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {});

        if (favorites.length > 0) {
            return { 'Favorites': favorites, ...regularSkills };
        }
        return regularSkills;
    }, [favoriteWellnessSkills]);

    const handleGeneratePlan = async (skill) => {
        setIsLoadingAi(true);
        setExpandedSkill({ id: skill.id, content: '' });
        const plan = await generateActionPlan(skill.title);
        // Format plan object to text for display
        const textContent = `### ${plan.title}\n\n` + plan.steps.map((s, i) => `${i + 1}. ${s}`).join('\n');
        setExpandedSkill({ id: skill.id, content: textContent });
        setIsLoadingAi(false);
    };

    return (
        <div className="space-y-10 animate-fade-in">
            <p className="text-gray-600 max-w-2xl mx-auto text-center">Practical skills to build resilience.</p>
            {Object.entries(skillsByCategory).map(([category, skills]) => (
                <section key={category}>
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 px-4">{category}</h2>
                        {WELLNESS_CATEGORY_DESCRIPTIONS[category] && <p className="text-gray-600 max-w-xl mx-auto mt-1">{WELLNESS_CATEGORY_DESCRIPTIONS[category]}</p>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {skills.map(skill => (
                            <div key={skill.id} className="bg-white p-6 rounded-xl shadow-lg flex flex-col">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{skill.title}</h3>
                                    <button onClick={() => toggleFavoriteWellnessSkill(skill.id)} className="text-2xl text-yellow-400 hover:text-yellow-500">
                                        {favoriteWellnessSkills.includes(skill.id) ? '★' : '☆'}
                                    </button>
                                </div>
                                <p className="text-gray-700 flex-grow mb-4">{skill.description}</p>
                                <button
                                    onClick={() => handleGeneratePlan(skill)}
                                    className="mt-auto bg-brand-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition self-start"
                                >
                                    Generate AI Action Plan
                                </button>
                                {expandedSkill?.id === skill.id && (
                                    <div className="mt-4 pt-4 border-t animate-fade-in">
                                        {isLoadingAi ? <Spinner /> : (
                                            <div className="prose prose-sm max-w-none">
                                                <p className="whitespace-pre-line">{expandedSkill.content}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

const GratitudeJournal = () => {
    const { gratitudeJournal, addGratitudeEntry, isLoading } = useUserData();
    const [newEntry, setNewEntry] = useState('');
    const [prompt, setPrompt] = useState('');
    const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);

    const handleGetPrompt = async () => {
        setIsGeneratingPrompt(true);
        const newPrompt = await generateGratitudePrompt();
        setPrompt(newPrompt);
        setIsGeneratingPrompt(false);
    };

    const handleSaveEntry = () => {
        if (!newEntry.trim()) return;
        addGratitudeEntry(newEntry);
        setNewEntry('');
        setPrompt('');
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <p className="text-gray-600 text-center">Cultivating gratitude can improve mood and overall well-being.</p>

            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                <div className="text-center p-4 bg-yellow-50 border-l-4 border-yellow-300 rounded-r-lg">
                    {isGeneratingPrompt ? <Spinner /> :
                        prompt ? <p className="text-gray-700 italic">"{prompt}"</p> : <p className="text-gray-600">Need inspiration?</p>
                    }
                    <button onClick={handleGetPrompt} disabled={isGeneratingPrompt} className="mt-2 text-sm font-semibold text-yellow-800 hover:underline">
                        ✨ Get a Prompt
                    </button>
                </div>

                <textarea
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    className="w-full p-3 border-2 rounded-lg"
                    rows={4}
                    placeholder="Today, I am grateful for..."
                />
                <button
                    onClick={handleSaveEntry}
                    className="w-full bg-brand-primary text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                >
                    Save Entry
                </button>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-center mb-4">Past Entries</h3>
                {gratitudeJournal.length === 0 ? (
                    <p className="text-center text-gray-500">Your past entries will appear here.</p>
                ) : (
                    <div className="space-y-4">
                        {gratitudeJournal.map(entry => (
                            <div key={entry.id} className="bg-white p-5 rounded-xl shadow-lg">
                                <p className="text-sm text-gray-500 font-semibold mb-2">{new Date(entry.date).toLocaleDateString()}</p>
                                <p className="text-gray-700 whitespace-pre-line">{entry.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const PersonalizedInsights = ({ setPage }) => {
    const { moods, history, reading } = useUserData();
    const [loadingInsights, setLoadingInsights] = useState(false);
    const [insights, setInsights] = useState('');

    const handleGenerateInsights = async () => {
        setLoadingInsights(true);
        const generatedInsights = await generatePersonalizedInsights({ moods, history, reading });
        setInsights(generatedInsights);
        setLoadingInsights(false);
    };

    return (
        <section className="bg-gradient-to-r from-brand-primary to-green-600 p-8 rounded-2xl text-white max-w-3xl mx-auto animate-fade-in shadow-xl">
            <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">AI Wellness Coach</h3>
                <p className="mb-6 opacity-90">Analyze your recent moods, assessments, and reading to get tailored suggestions.</p>
                <button onClick={handleGenerateInsights} disabled={loadingInsights} className="bg-white text-brand-primary px-8 py-3 rounded-full font-bold transition-all hover:bg-yellow-100 hover:scale-105 shadow-md">
                    {loadingInsights ? 'Analyzing Data...' : 'Generate My Insights'}
                </button>
            </div>
            {loadingInsights && <div className="mt-4"><Spinner color="text-white" /></div>}
            {insights && !loadingInsights && (
                <div className="mt-8 bg-black/20 p-6 rounded-xl text-white animate-fade-in">
                    <div className="prose prose-invert max-w-none">
                        <p className="whitespace-pre-line">{insights}</p>
                    </div>
                </div>
            )}
        </section>
    );
}

// MAIN PAGE EXPORT
const SelfCarePage = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('insights');

    const setPage = (p) => {
        if (p.toLowerCase() === 'resources') router.push('/resources');
        // Add other navigation handling if needed
    };

    return (
        <UserDataProvider>
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <Head>
                    <title>Action Toolkit | PMAction</title>
                </Head>

                <nav className="max-w-7xl mx-auto mb-8">
                    <button
                        onClick={() => router.back()}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                    >
                        &larr; Back
                    </button>
                </nav>

                <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Action Toolkit</h1>
                        <p className="text-lg text-gray-600">Resources for self-reflection, skill-building, and journaling.</p>
                    </div>

                    <div className="flex justify-center border-b-2 border-gray-200 flex-wrap gap-2 pb-4">
                        <button
                            onClick={() => setActiveTab('insights')}
                            className={`px-4 py-2 font-semibold rounded-lg transition-colors ${activeTab === 'insights' ? 'bg-brand-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            Insights
                        </button>
                        <button
                            onClick={() => setActiveTab('assessments')}
                            className={`px-4 py-2 font-semibold rounded-lg transition-colors ${activeTab === 'assessments' ? 'bg-brand-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            Assessments
                        </button>
                        <button
                            onClick={() => setActiveTab('wellness-skills')}
                            className={`px-4 py-2 font-semibold rounded-lg transition-colors ${activeTab === 'wellness-skills' ? 'bg-brand-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            Act Now
                        </button>
                        <button
                            onClick={() => setActiveTab('gratitude')}
                            className={`px-4 py-2 font-semibold rounded-lg transition-colors ${activeTab === 'gratitude' ? 'bg-brand-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            Gratitude
                        </button>
                    </div>

                    <div className="min-h-[500px]">
                        {activeTab === 'insights' && <PersonalizedInsights setPage={setPage} />}
                        {activeTab === 'assessments' && <SelfAssessments setPage={setPage} />}
                        {activeTab === 'wellness-skills' && <WellnessSkills />}
                        {activeTab === 'gratitude' && <GratitudeJournal />}
                    </div>
                </div>
            </div>
        </UserDataProvider>
    );
};

export default SelfCarePage;
