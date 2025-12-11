import React, { useState } from 'react';
import { EMOTIONS } from '../lib/data';

export default function EmotionWheel({ value, onChange, className = '' }) {
    const [step, setStep] = useState(value?.primary ? 2 : 1);
    const [selectedPrimary, setSelectedPrimary] = useState(value?.primary || null);
    const [selectedSecondary, setSelectedSecondary] = useState(value?.secondary || []);
    const [hoveredEmotion, setHoveredEmotion] = useState(null);

    const handlePrimarySelect = (emotionKey) => {
        setSelectedPrimary(emotionKey);
        setSelectedSecondary([]);
        setStep(2);
        onChange({
            primary: emotionKey,
            secondary: []
        });
    };

    const handleSecondaryToggle = (secondaryId) => {
        const newSecondary = selectedSecondary.includes(secondaryId)
            ? selectedSecondary.filter(id => id !== secondaryId)
            : [...selectedSecondary, secondaryId];

        setSelectedSecondary(newSecondary);
        onChange({
            primary: selectedPrimary,
            secondary: newSecondary
        });
    };

    const handleBack = () => {
        setStep(1);
        setSelectedPrimary(null);
        setSelectedSecondary([]);
        onChange(null);
    };

    const emotionKeys = Object.keys(EMOTIONS);
    const angleStep = 360 / emotionKeys.length;

    return (
        <div className={`emotion-wheel-container ${className}`}>
            {/* Desktop: Circular Wheel - ENHANCED */}
            <div className="hidden md:block">
                {step === 1 ? (
                    <div className="relative w-full max-w-2xl mx-auto py-8">
                        <div className="relative" style={{ paddingBottom: '100%' }}>
                            <div className="absolute inset-0">
                                {/* Center circle - LARGER */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full shadow-2xl border-4 border-gray-300 flex items-center justify-center z-10">
                                    <span className="text-xl font-bold text-gray-700 text-center leading-tight">
                                        How are<br />you feeling?
                                    </span>
                                </div>

                                {/* Emotion segments - LARGER */}
                                {emotionKeys.map((key, index) => {
                                    const emotion = EMOTIONS[key];
                                    const angle = index * angleStep - 90;
                                    const radian = (angle * Math.PI) / 180;
                                    const radius = 200; // INCREASED
                                    const x = Math.cos(radian) * radius;
                                    const y = Math.sin(radian) * radius;
                                    const isHovered = hoveredEmotion === key;

                                    return (
                                        <button
                                            key={key}
                                            onClick={() => handlePrimarySelect(key)}
                                            onMouseEnter={() => setHoveredEmotion(key)}
                                            onMouseLeave={() => setHoveredEmotion(null)}
                                            className="absolute top-1/2 left-1/2 transition-all duration-300 transform hover:scale-110"
                                            style={{
                                                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) ${isHovered ? 'scale(1.1)' : 'scale(1)'}`,
                                                zIndex: isHovered ? 20 : 5
                                            }}
                                        >
                                            <div
                                                className="w-32 h-32 rounded-full shadow-xl border-4 flex flex-col items-center justify-center transition-all cursor-pointer"
                                                style={{
                                                    backgroundColor: emotion.color,
                                                    borderColor: isHovered ? emotion.textColor : 'white',
                                                    boxShadow: isHovered ? `0 12px 30px ${emotion.color}cc` : '0 6px 20px rgba(0,0,0,0.2)'
                                                }}
                                            >
                                                <span className="text-5xl mb-2">{emotion.emoji}</span>
                                                <span className="text-lg font-bold" style={{ color: emotion.textColor }}>
                                                    {emotion.label}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* POP-OUT SECONDARY EMOTIONS */
                    <div className="max-w-2xl mx-auto py-8">
                        <div className="relative" style={{ minHeight: '500px' }}>
                            {/* Selected emotion in center */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                <div
                                    className="w-40 h-40 rounded-full shadow-2xl border-4 flex flex-col items-center justify-center"
                                    style={{
                                        backgroundColor: EMOTIONS[selectedPrimary].color,
                                        borderColor: EMOTIONS[selectedPrimary].textColor
                                    }}
                                >
                                    <span className="text-6xl mb-2">{EMOTIONS[selectedPrimary].emoji}</span>
                                    <span className="text-xl font-bold" style={{ color: EMOTIONS[selectedPrimary].textColor }}>
                                        {EMOTIONS[selectedPrimary].label}
                                    </span>
                                </div>
                            </div>

                            {/* Secondary emotions pop out in circle */}
                            {EMOTIONS[selectedPrimary].secondary.map((option, index) => {
                                const totalOptions = EMOTIONS[selectedPrimary].secondary.length;
                                const angle = (index * 360 / totalOptions) - 90;
                                const radian = (angle * Math.PI) / 180;
                                const radius = 220;
                                const x = Math.cos(radian) * radius;
                                const y = Math.sin(radian) * radius;
                                const isSelected = selectedSecondary.includes(option.id);

                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleSecondaryToggle(option.id)}
                                        className="absolute top-1/2 left-1/2 transition-all duration-500 transform"
                                        style={{
                                            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) ${isSelected ? 'scale(1.1)' : 'scale(1)'}`,
                                            zIndex: isSelected ? 20 : 10
                                        }}
                                    >
                                        <div
                                            className={`w-24 h-24 rounded-full shadow-lg border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${isSelected ? 'ring-4 ring-offset-2' : ''}`}
                                            style={{
                                                backgroundColor: isSelected ? EMOTIONS[selectedPrimary].color : 'white',
                                                borderColor: EMOTIONS[selectedPrimary].textColor,
                                                color: isSelected ? EMOTIONS[selectedPrimary].textColor : '#374151'
                                            }}
                                        >
                                            <span className="text-sm font-bold text-center leading-tight px-2">
                                                {option.label}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}

                            {/* Back button */}
                            <div className="absolute top-0 left-0">
                                <button
                                    onClick={handleBack}
                                    className="text-gray-600 hover:text-gray-900 font-semibold text-lg flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
                                >
                                    ← Change emotion
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile: Card-based Selection */}
            <div className="block md:hidden">
                {step === 1 ? (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                            How are you feeling?
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {emotionKeys.map((key) => {
                                const emotion = EMOTIONS[key];
                                return (
                                    <button
                                        key={key}
                                        onClick={() => handlePrimarySelect(key)}
                                        className="p-4 rounded-xl border-2 border-gray-200 hover:border-current transition-all shadow-sm active:scale-95"
                                        style={{
                                            backgroundColor: `${emotion.color}20`,
                                            borderColor: emotion.color
                                        }}
                                    >
                                        <div className="text-4xl mb-2 text-center">{emotion.emoji}</div>
                                        <div className="text-sm font-bold text-center" style={{ color: emotion.textColor }}>
                                            {emotion.label}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div>
                        <button
                            onClick={handleBack}
                            className="text-gray-600 hover:text-gray-900 font-medium mb-4 flex items-center"
                        >
                            ← Change emotion
                        </button>
                        <div className="flex items-center justify-center mb-4 p-4 rounded-xl" style={{ backgroundColor: `${EMOTIONS[selectedPrimary].color}30` }}>
                            <span className="text-5xl mr-3">{EMOTIONS[selectedPrimary].emoji}</span>
                            <div>
                                <div className="text-2xl font-bold" style={{ color: EMOTIONS[selectedPrimary].textColor }}>
                                    {EMOTIONS[selectedPrimary].label}
                                </div>
                                <div className="text-sm text-gray-600">Select all that apply:</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {EMOTIONS[selectedPrimary].secondary.map((option) => {
                                const isSelected = selectedSecondary.includes(option.id);
                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleSecondaryToggle(option.id)}
                                        className={`w-full p-3 rounded-lg border-2 text-left font-medium transition-all flex items-center ${isSelected ? 'shadow-md' : ''
                                            }`}
                                        style={{
                                            backgroundColor: isSelected ? `${EMOTIONS[selectedPrimary].color}40` : 'white',
                                            borderColor: isSelected ? EMOTIONS[selectedPrimary].textColor : '#E5E7EB',
                                            color: isSelected ? EMOTIONS[selectedPrimary].textColor : '#374151'
                                        }}
                                    >
                                        <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${isSelected ? 'bg-current' : 'bg-white'
                                            }`}
                                            style={{ borderColor: isSelected ? EMOTIONS[selectedPrimary].textColor : '#D1D5DB' }}
                                        >
                                            {isSelected && <span className="text-white text-xs">✓</span>}
                                        </div>
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
