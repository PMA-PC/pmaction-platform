import React from 'react';
import { MOOD_EMOJIS } from '../lib/data';

export const MoodSelector = ({ selectedMood, onSelectMood }) => {
    return (
        <div>
            <p className="text-center text-gray-700 font-semibold mb-4">How are you feeling right now?</p>
            <div className="flex justify-center items-center gap-2 sm:gap-4">
                {MOOD_EMOJIS.map(mood => (
                    <button
                        key={mood.name}
                        onClick={() => onSelectMood(mood)}
                        className={`flex flex-col items-center p-2 rounded-lg transition-all transform hover:scale-110 ${selectedMood?.name === mood.name ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50 hover:bg-gray-100'}`}
                        aria-label={`Select mood: ${mood.name}`}
                    >
                        <span className="text-3xl sm:text-4xl">{mood.emoji}</span>
                        <span className="text-xs text-gray-600 mt-1">{mood.name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
