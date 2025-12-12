import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pWords = ["Potential", "Purpose", "Power", "Peace", "Positive"];
const mWords = ["Mindset", "Mood", "Meaning", "Mastery", "Mental"];
const aWords = [
    "Attitude", "Approach", "Aspiration", "Affirmation", "Awareness",
    "Alignment", "Actions", "Ability", "Ardor", "Accountability",
    "Advantage", "Ascension", "Acceptance", "Awakening", "Analysis",
    "Action" // Target word
];

const SlotWheel = ({ words, finalWord, delay, onComplete, columnIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSpinning, setIsSpinning] = useState(true);

    useEffect(() => {
        let interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, 80);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            setIsSpinning(false);
            setCurrentIndex(words.indexOf(finalWord));
            if (onComplete) onComplete();
        }, delay);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="h-24 w-full bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center overflow-hidden shadow-inner relative">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-200 via-transparent to-gray-200 pointer-events-none z-10 opacity-50"></div>
            <motion.div
                key={isSpinning ? currentIndex : 'final'}
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`text-2xl md:text-4xl font-bold truncate ${isSpinning ? 'text-gray-400 blur-[1px]' : 'text-indigo-600'}`}
            >
                {words[currentIndex]}
            </motion.div>
        </div>
    );
};

export default function PMASlotMachine({ onJackpotComplete }) {
    const [jackpot, setJackpot] = useState(false);
    const [completedCols, setCompletedCols] = useState(0);
    const [key, setKey] = useState(0);

    const handleComplete = () => {
        setCompletedCols(prev => {
            const newCount = prev + 1;
            if (newCount === 3) {
                setTimeout(() => setJackpot(true), 100);
                if (onJackpotComplete) onJackpotComplete();
            }
            return newCount;
        });
    };

    return (
    return (
        <div className="flex justify-center my-2 w-full">
            {/* Main Machine Body - Pink to Blue Theme */}
            <div className="relative bg-gradient-to-br from-pink-500 via-purple-500 to-blue-600 rounded-[1.5rem] p-2 shadow-[0_6px_0px_rgb(76,29,149)] border border-purple-700 w-full max-w-4xl transition-all duration-500">

                {/* Top Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-purple-700 rounded-b-lg opacity-20"></div>

                {/* The "Screen" Interior */}
                <div className="bg-gray-900 rounded-[1.2rem] p-4 border border-gray-800 shadow-inner relative overflow-hidden">

                    {/* Screen Glare */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    {/* Integrated Title */}
                    <div className="mb-4 text-center relative z-10 bg-black/40 rounded-lg py-1 border border-white/10 backdrop-blur-sm">
                        <h2 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-blue-400 tracking-widest animate-pulse font-mono" style={{ textShadow: '0 0 15px rgba(168,85,247,0.5)' }}>
                            BE AWESOME @ TODAY
                        </h2>
                    </div>

                    {/* The Reels Container */}
                    <div className="grid grid-cols-3 gap-2 md:gap-4 bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-inner">
                        <SlotWheel key={`p-${key}`} words={pWords} finalWord="Positive" delay={1500} onComplete={handleComplete} />
                        <SlotWheel key={`m-${key}`} words={mWords} finalWord="Mental" delay={3000} onComplete={handleComplete} />
                        <SlotWheel key={`a-${key}`} words={aWords} finalWord="Action" delay={4500} onComplete={handleComplete} />
                    </div>

                    {/* Jackpot Lights */}
                    <div className="flex justify-between mt-3 px-6">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full ${jackpot ? 'bg-blue-300 animate-ping' : 'bg-red-900'}`}></div>
                        ))}
                    </div>
                </div>

                {/* Lever Handle */}
                <div className="absolute top-16 -right-6 w-5 h-24 bg-gray-300 rounded-r-lg border-l-2 border-gray-400 shadow-lg flex flex-col items-center">
                    <div className="w-6 h-6 bg-pink-600 rounded-full -mt-3 shadow-md border border-pink-400"></div>
                </div>
            </div>

            {/* Restored Full Confetti Celebration */}
            {jackpot && (
                <>
                    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                        {[...Array(150)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-3 h-3 rounded-full"
                                style={{
                                    backgroundColor: ['#FFD700', '#FF1493', '#00BFFF', '#9370DB', '#32CD32'][i % 5],
                                    left: `${Math.random() * 100}%`,
                                    top: '-20px'
                                }}
                                animate={{
                                    y: ['0vh', '110vh'], // Fall further down to ensure exit
                                    x: [0, (Math.random() - 0.5) * 50], // Add some horizontal drift
                                    rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                                    opacity: [1, 1, 0]
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    ease: "linear",
                                    delay: Math.random() * 2
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
