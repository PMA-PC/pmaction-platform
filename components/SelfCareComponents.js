import React, { useState } from 'react';

// --- MoodChart ---
export const MoodChart = ({ moods }) => {
    if (!moods || moods.length === 0) return null;
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Mood Trends (Last 7 Entries)</h3>
            <div className="h-40 flex items-end justify-between gap-2 px-4">
                {moods.slice(0, 7).reverse().map((m, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="w-8 bg-brand-primary/20 rounded-t-lg relative group h-full flex items-end">
                            <div
                                style={{ height: `${(m.mood.score || 5) * 10}%` }}
                                className="w-full bg-brand-primary rounded-t-lg transition-all duration-500 hover:bg-green-600"
                            ></div>
                            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs p-1 rounded whitespace-nowrap z-10">
                                {m.mood.name} ({new Date(m.date).toLocaleDateString()})
                            </div>
                        </div>
                        <span className="text-xs mt-1 text-gray-500">{new Date(m.date).getDate()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- NoteEditor ---
export const NoteEditor = ({ post, onSave }) => {
    const [note, setNote] = useState(post.note || '');
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        onSave(note);
        setIsEditing(false);
    }

    return (
        <div className="mt-2">
            {isEditing ? (
                <div>
                    <textarea
                        className="w-full border rounded p-2 text-sm"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        placeholder="Add a personal note..."
                    />
                    <div className="flex gap-2 mt-1">
                        <button onClick={handleSave} className="text-xs bg-blue-500 text-white px-2 py-1 rounded">Save</button>
                        <button onClick={() => setIsEditing(false)} className="text-xs text-gray-500">Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="flex items-start justify-between group">
                    <p className="text-sm text-gray-600 italic">{post.note || "Add a note..."}</p>
                    <button onClick={() => setIsEditing(true)} className="text-xs text-blue-500 opacity-0 group-hover:opacity-100">Edit</button>
                </div>
            )}
        </div>
    );
};

// --- TagEditor ---
export const TagEditor = ({ tags = [], onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTag, setNewTag] = useState('');

    const handleAdd = () => {
        if (newTag.trim()) {
            onSave([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const handleRemove = (tagToRemove) => {
        onSave(tags.filter(t => t !== tagToRemove));
    };

    return (
        <div className="mt-2 flex flex-wrap gap-2 items-center">
            {tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                    #{tag}
                    {isEditing && <button onClick={() => handleRemove(tag)} className="text-red-500 font-bold">&times;</button>}
                </span>
            ))}
            {isEditing ? (
                <div className="flex items-center gap-1">
                    <input
                        type="text"
                        value={newTag}
                        onChange={e => setNewTag(e.target.value)}
                        className="border rounded px-1 py-0.5 text-xs w-20"
                        placeholder="Tag..."
                    />
                    <button onClick={handleAdd} className="text-green-500 font-bold">+</button>
                    <button onClick={() => setIsEditing(false)} className="text-gray-500 text-xs">Done</button>
                </div>
            ) : (
                <button onClick={() => setIsEditing(true)} className="text-xs text-gray-400 hover:text-gray-600">+ Tag</button>
            )}
        </div>
    );
};

// --- ScreeningRunner ---
export const ScreeningRunner = ({ screening, questionIndex, onAnswer, onBack }) => {
    const question = screening.questions[questionIndex];
    const progress = ((questionIndex) / screening.questions.length) * 100;

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto animate-fade-in">
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Question {questionIndex + 1} of {screening.questions.length}</span>
                    <button onClick={onBack} className="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-brand-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-8 text-gray-800">{question}</h2>

            <div className="space-y-3">
                {['Not at all', 'Several days', 'More than half the days', 'Nearly every day'].map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => onAnswer(i)}
                        className="w-full text-left p-4 rounded-xl border border-gray-200 hover:bg-brand-primary hover:text-white hover:border-transparent transition-all font-medium"
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- ScreeningResultPage ---
export const ScreeningResultPage = ({ result, screening, onBack, setPage }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto animate-fade-in text-center">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl mb-6 ${result.level.includes('Severe') || result.level.includes('High') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                {result.level.includes('Severe') || result.level.includes('High') ? '!' : '✓'}
            </div>

            <h2 className="text-3xl font-bold mb-2 text-gray-800">{result.level}</h2>
            <p className="text-gray-500 mb-6">Score: {result.score}</p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-bold mb-2 text-gray-800">What this means:</h3>
                <p className="text-gray-700 mb-4">{result.interpretation}</p>

                <h3 className="font-bold mb-2 text-gray-800">Recommendation:</h3>
                <p className="text-gray-700">{result.recommendation}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={onBack} className="px-6 py-3 rounded-full border border-gray-300 font-semibold hover:bg-gray-50 text-gray-700">
                    Back to Assessments
                </button>
                <button onClick={() => setPage && setPage('resources')} className="px-6 py-3 rounded-full bg-brand-primary text-white font-semibold hover:bg-green-800 shadow-md">
                    Find Support Resources
                </button>
            </div>
            <p className="mt-6 text-xs text-gray-400">This result is for informational purposes only.</p>
        </div>
    );
};

// --- ASDQuizRunner ---
export const ASDQuizRunner = ({ quiz, onComplete, onBack }) => {
    const [index, setIndex] = useState(0);
    const [scores, setScores] = useState({}); // { [trait]: { score: 0, max: 0 } }

    const question = quiz.questions[index];
    const progress = (index / quiz.questions.length) * 100;

    const handleAnswer = (value) => { // Value 1-5
        const trait = question.trait;
        setScores(prev => {
            const current = prev[trait] || { score: 0, max: 0 };
            return {
                ...prev,
                [trait]: {
                    score: current.score + value,
                    max: current.max + 5
                }
            };
        });

        if (index + 1 < quiz.questions.length) {
            setIndex(i => i + 1);
        } else {
            // Finish
            const finalScores = { ...scores };
            // Need to include the last answer in the final calculation purely for the state update lag, 
            // but simplified here we just pass the updated structure carefully or use a ref. 
            // Correct approach: calculate next state and pass IT to onComplete.

            // Re-calculating properly with current answer
            const currentTrait = question.trait;
            const currentTraitData = scores[currentTrait] || { score: 0, max: 0 };
            finalScores[currentTrait] = {
                score: currentTraitData.score + value,
                max: currentTraitData.max + 5
            };

            onComplete({
                id: Date.now(),
                quizId: quiz.id,
                quizTitle: quiz.title,
                date: new Date().toISOString(),
                scores: finalScores
            });
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto animate-fade-in">
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Question {index + 1} of {quiz.questions.length}</span>
                    <button onClick={onBack} className="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-2 text-gray-800">"{question.text}"</h2>
            <p className="text-sm text-gray-500 mb-8 uppercase tracking-wide">{question.trait} Trait</p>

            <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map(val => (
                    <button
                        key={val}
                        onClick={() => handleAnswer(val)}
                        className={`p-4 rounded-xl border-2 font-bold transition-all ${val === 1 ? 'border-gray-200 text-gray-400 hover:border-blue-200' : val === 5 ? 'border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100' : 'border-gray-200 hover:border-blue-300'}`}
                    >
                        {val}
                    </button>
                ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400 px-2">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
            </div>
        </div>
    );
};

// --- ASDResultPage ---
export const ASDResultPage = ({ result, onBack }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Neurodiversity Profile</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {Object.entries(result.scores).map(([trait, data]) => {
                    const percentage = (data.score / data.max) * 100;
                    return (
                        <div key={trait} className="bg-gray-50 p-4 rounded-xl">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-gray-700">{trait}</span>
                                <span className="text-blue-600 font-bold">{Math.round(percentage)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                {percentage > 75 ? "High resonance with this trait." : percentage > 40 ? "Moderate resonance." : "Low resonance."}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="text-center">
                <button onClick={onBack} className="px-8 py-3 rounded-full bg-gray-800 text-white font-bold hover:bg-gray-900 transition shadow-lg">
                    Done
                </button>
            </div>
        </div>
    );
};
