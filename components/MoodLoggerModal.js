import React, { useState, useEffect } from 'react';
import { useApp } from '../lib/context';
import { EMOTIONS, CONTEXT_TAGS, MOOD_EMOJIS } from '../lib/data';
import EmotionWheel from './EmotionWheel';

const MoodLoggerModal = ({ onClose }) => {
    const { addWin } = useApp();
    const [moodData, setMoodData] = useState(null); // { primary: 'happy', secondary: [] }
    const [selectedTags, setSelectedTags] = useState([]);
    const [note, setNote] = useState('');
    const [step, setStep] = useState(1); // 1: Emotion, 2: Details (Tags/Notes)

    // Derived state for tags
    const availableTags = React.useMemo(() => {
        if (!moodData?.primary) return [];
        const emotion = EMOTIONS[moodData.primary];
        const polarity = emotion?.polarity || 'neutral';

        return CONTEXT_TAGS.filter(tag => {
            // Always include 'all' context
            if (tag.context.includes('all')) return true;
            // Include matching polarity
            if (tag.context.includes(polarity)) return true;
            // Include specific emotion matches (e.g. 'angry' for #conflict)
            if (tag.context.includes(moodData.primary)) return true;
            return false;
        });
    }, [moodData]);

    const handleTagToggle = (tagId) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags(prev => prev.filter(t => t !== tagId));
        } else {
            setSelectedTags(prev => [...prev, tagId]);
        }
    };

    const handleSave = async () => {
        if (!moodData?.primary) return;

        const emotion = EMOTIONS[moodData.primary];

        // Map back to legacy format for compatibility if needed, or store rich object
        // We'll store a rich object in metadata
        try {
            await addWin({
                type: 'mood',
                title: `Mood: ${emotion.label}`,
                // Legacy field for basic display
                mood: {
                    value: moodData.primary,
                    name: emotion.label,
                    emoji: emotion.emoji,
                    color: emotion.color.replace('#', 'bg-[#') + ']' // Hacky conversion if needed, but better to just store hex
                },
                // Rich data
                details: {
                    primary: moodData.primary,
                    secondary: moodData.secondary,
                    tags: selectedTags,
                    polarity: emotion.polarity
                },
                content: note,
                xp_earned: 5
            });
            onClose();
        } catch (err) {
            console.error("Error saving mood:", err);
            // alert("Failed to save mood");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto w-full h-full">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {step === 1 ? "How are you feeling?" : "Tell me more..."}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <span className="text-xl">✕</span>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 overflow-y-auto">
                    {/* Emotion Wheel Section */}
                    <div className={step === 2 ? "mb-8 transform scale-90 origin-top transition-all" : "transition-all"}>
                        <EmotionWheel
                            value={moodData}
                            onChange={(data) => {
                                setMoodData(data);
                                if (data?.primary) {
                                    setStep(2);
                                } else {
                                    setStep(1);
                                }
                            }}
                        />
                    </div>

                    {/* Step 2: Tags & Notes (Only visible if primary emotion selected) */}
                    {step === 2 && moodData?.primary && (
                        <div className="animate-fade-in space-y-8">
                            {/* Context-Aware Tags */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                                    What's happening?
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {availableTags.map(tag => (
                                        <button
                                            key={tag.id}
                                            onClick={() => handleTagToggle(tag.id)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTags.includes(tag.id)
                                                    ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {tag.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Note Input */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                                    Add a note
                                </h3>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-gray-700"
                                    placeholder="What's on your mind?..."
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
                    <button
                        onClick={handleSave}
                        disabled={!moodData?.primary}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform ${moodData?.primary
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98]'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Save Entry
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MoodLoggerModal;
