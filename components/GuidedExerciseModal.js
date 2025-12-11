import React, { useState, useEffect, useRef } from 'react';

const EXERCISE_DURATION = 300; // 5 minutes in seconds
const STEPS = [
    { name: 'Get Ready', duration: 5, instruction: "Find a comfortable position and gently close your eyes." },
    { name: 'Inhale', duration: 4, instruction: "Breathe in slowly through your nose..." },
    { name: 'Hold', duration: 7, instruction: "Hold your breath..." },
    { name: 'Exhale', duration: 8, instruction: "...and breathe out slowly through your mouth." },
];

export const GuidedExerciseModal = ({ onClose, exerciseTitle }) => {
    const [timeLeft, setTimeLeft] = useState(EXERCISE_DURATION);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [stepTimeLeft, setStepTimeLeft] = useState(STEPS[0].duration);

    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef(null);
    const oscillatorRef = useRef(null);

    // Main timer for the whole session
    useEffect(() => {
        if (timeLeft <= 0) {
            onClose();
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, onClose]);

    // Timer for each step in the breathing cycle
    useEffect(() => {
        if (stepTimeLeft <= 0) {
            const nextStepIndex = currentStepIndex === 0 ? 1 : ((currentStepIndex) % (STEPS.length - 1)) + 1;
            setCurrentStepIndex(nextStepIndex);
            setStepTimeLeft(STEPS[nextStepIndex].duration);
        }

        const stepTimer = setInterval(() => {
            setStepTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(stepTimer);
    }, [stepTimeLeft, currentStepIndex]);

    const toggleAudio = () => {
        if (isPlaying) {
            oscillatorRef.current?.stop();
            audioContextRef.current?.close().then(() => {
                audioContextRef.current = null;
            });
            setIsPlaying(false);
        } else {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = context.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(100, context.currentTime); // Low hum

            const gainNode = context.createGain();
            gainNode.gain.setValueAtTime(0.1, context.currentTime); // Low volume

            oscillator.connect(gainNode);
            gainNode.connect(context.destination);

            oscillator.start();
            oscillatorRef.current = oscillator;
            audioContextRef.current = context;
            setIsPlaying(true);
        }
    };

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            if (oscillatorRef.current) oscillatorRef.current.stop();
            if (audioContextRef.current) audioContextRef.current.close();
        }
    }, []);

    const progress = ((EXERCISE_DURATION - timeLeft) / EXERCISE_DURATION) * 100;
    const currentStep = STEPS[currentStepIndex];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-8 max-w-lg w-full animate-fade-in text-center shadow-2xl border border-gray-100">
                <h2 className="text-3xl font-bold mb-4 text-brand-primary">{exerciseTitle || 'Guided Breathing'}</h2>
                <div className="my-8 h-32 flex flex-col justify-center">
                    <p className="text-6xl font-black text-brand-primary mb-2 transition-all duration-1000 transform">{stepTimeLeft}</p>
                    <p className="text-xl text-gray-700 font-medium animate-pulse">{currentStep.instruction}</p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-primary to-green-400 h-3 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }}></div>
                </div>

                <div className="flex justify-center items-center gap-6">
                    <button onClick={toggleAudio} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-brand-primary text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`} aria-label={isPlaying ? "Stop audio" : "Play calming audio"}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isPlaying ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15.172a4 4 0 010-5.656M8.414 12.343a1 1 0 010-1.414m5.657 5.657a4 4 0 000-5.657M12.728 9.515a1 1 0 000 1.414M15.556 6.686a4 4 0 000 5.657" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 15.858a5 5 0 010-7.072m2.828 9.9a9 9 0 010-12.728" />}
                        </svg>
                    </button>
                    <button onClick={onClose} className="bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-900 transition-colors shadow-lg">
                        End Exercise
                    </button>
                </div>
            </div>
        </div>
    );
};
