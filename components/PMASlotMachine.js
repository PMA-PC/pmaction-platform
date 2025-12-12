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
                className={`text-xl md:text-2xl font-bold truncate ${isSpinning ? 'text-gray-400 blur-[1px]' : 'text-indigo-600'}`}
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
        <div className="flex justify-center my-8 scale-90 md:scale-100">
            {/* Main Machine Body - The "Giant Emoji" Container */}
            <div className="relative bg-gradient-to-b from-amber-400 to-orange-500 rounded-[2.5rem] p-4 shadow-[0_10px_0px_rgb(180,83,9)] border-4 border-orange-600 w-full max-w-2xl">

                {/* Top Decoration (The "Curve" of the emoji) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-orange-600 rounded-b-xl opacity-20"></div>

                {/* The "Screen" Interior */}
                <div className="bg-gray-900 rounded-[2rem] p-6 border-4 border-gray-800 shadow-inner relative overflow-hidden">

                    {/* Screen Glare/Reflection */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    {/* Title Display IN the screen */}
                    <div className="mb-6 text-center relative z-10 bg-black/40 rounded-xl py-2 border border-white/10 backdrop-blur-sm">
                        <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-300 to-green-400 tracking-widest animate-pulse font-mono" style={{ textShadow: '0 0 10px rgba(74,222,128,0.5)' }}>
                            BE AWESOME @ TODAY
                        </h2>
                    </div>

                    {/* The Reels Container */}
                    <div className="grid grid-cols-3 gap-3 md:gap-4 bg-gray-800 p-3 rounded-xl border border-gray-700 shadow-inner">
                        <SlotWheel key={`p-${key}`} words={pWords} finalWord="Positive" delay={1500} onComplete={handleComplete} />
                        <SlotWheel key={`m-${key}`} words={mWords} finalWord="Mental" delay={3000} onComplete={handleComplete} />
                        <SlotWheel key={`a-${key}`} words={aWords} finalWord="Action" delay={4500} onComplete={handleComplete} />
                    </div>

                    {/* Jackpot Lights */}
                    <div className="flex justify-between mt-4 px-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full ${jackpot ? 'bg-yellow-300 animate-ping' : 'bg-red-800'}`}></div>
                        ))}
                    </div>
                </div>

                {/* Bottom decorative feet/base */}
                <div className="flex justify-between px-12 mt-2">
                    <div className="w-16 h-4 bg-black/20 rounded-full blur-sm"></div>
                    <div className="w-16 h-4 bg-black/20 rounded-full blur-sm"></div>
                </div>

                {/* Lever Handle (Visual Only for Emoji look) */}
                <div className="absolute top-20 -right-8 w-6 h-32 bg-gray-300 rounded-r-xl border-l-4 border-gray-400 shadow-xl flex flex-col items-center">
                    <div className="w-8 h-8 bg-red-600 rounded-full -mt-4 shadow-lg border-2 border-red-400"></div>
                </div>
            </div>

            {/* Global Confetti (Optional overlay if needed, but keeping it contained is cleaner) */}
            {jackpot && (
                <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
                    {/* Simple centerpiece flair */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        className="text-6xl absolute z-50 drop-shadow-2xl"
                    >
                        🎉
                    </motion.div>
                </div>
            )}
        </div>
    );
}


