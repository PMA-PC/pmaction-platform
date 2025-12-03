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

const SlotColumn = ({ words, finalWord, delay, onComplete, columnIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSpinning, setIsSpinning] = useState(true);
    const [showGlow, setShowGlow] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        // Reset state on mount
        setCurrentIndex(0);
        setIsSpinning(true);
        setShowGlow(false);
        setShowConfetti(false);

        let interval;
        let timeout;

        // Start spinning
        interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, 80); // Speed of rotation

        // Stop spinning after delay
        timeout = setTimeout(() => {
            clearInterval(interval);
            setIsSpinning(false);
            // Find index of final word
            const finalIndex = words.indexOf(finalWord);
            setCurrentIndex(finalIndex !== -1 ? finalIndex : 0);

            // Show glow effect when stopped
            setShowGlow(true);

            // Show mini confetti for P and M columns
            if (columnIndex < 2) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 1800);
            }

            if (onComplete) onComplete();
        }, delay);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []); // Empty dependency array - only run once on mount

    return (
        <div className="relative">
            {/* Mini confetti falling straight down from top of the card */}
            {showConfetti && (
                <div className="absolute left-0 right-0 top-0 h-full pointer-events-none overflow-visible z-20">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: ['#FF69B4', '#9370DB', '#00CED1', '#FFD700', '#FF6347'][i % 5],
                                left: `${Math.random() * 100}%`,
                                top: '-10px'
                            }}
                            animate={{
                                y: [0, 150],
                                rotate: [0, 360],
                                opacity: [1, 0.8, 0]
                            }}
                            transition={{
                                duration: 1.2,
                                ease: "easeIn",
                                delay: Math.random() * 0.2
                            }}
                        />
                    ))}
                </div>
            )}

            <div className={`bg-white border-4 rounded-xl p-4 md:p-6 w-36 md:w-48 h-24 md:h-32 flex items-center justify-center shadow-lg overflow-hidden relative transition-all duration-300 ${showGlow && !isSpinning
                ? 'border-pink-500 shadow-2xl shadow-pink-500/60 ring-4 ring-purple-400/50'
                : 'border-pink-400'
                }`}>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-transparent to-gray-100 pointer-events-none z-10"></div>
                {showGlow && !isSpinning && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-blue-400/20 animate-pulse pointer-events-none z-5"></div>
                )}

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={isSpinning ? currentIndex : 'final'}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                            y: 0,
                            opacity: 1,
                            scale: !isSpinning && showGlow ? [1, 1.08, 1] : 1
                        }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{
                            duration: 0.1,
                            scale: { duration: 0.6, repeat: showGlow ? Infinity : 0, repeatDelay: 0.4 }
                        }}
                        className={`text-2xl md:text-3xl font-extrabold ${isSpinning
                            ? 'text-gray-400'
                            : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent'
                            }`}
                    >
                        {words[currentIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default function PMASlotMachine({ onJackpotComplete }) {
    const [jackpot, setJackpot] = useState(false);
    const [completedCols, setCompletedCols] = useState(0);
    const [key, setKey] = useState(0); // Key to force remount

    useEffect(() => {
        // Reset everything on mount
        setJackpot(false);
        setCompletedCols(0);
    }, []);

    // Trigger callback when jackpot animation completes
    useEffect(() => {
        if (jackpot && onJackpotComplete) {
            // Wait for confetti animations to complete (about 3 seconds)
            const timer = setTimeout(() => {
                onJackpotComplete();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [jackpot, onJackpotComplete]);

    const handleComplete = () => {
        setCompletedCols(prev => {
            const newCount = prev + 1;
            if (newCount === 3) {
                setTimeout(() => setJackpot(true), 100);
            }
            return newCount;
        });
    };

    return (
        <div className="flex flex-col items-center py-8 bg-gray-50 rounded-xl my-6 border border-gray-200 shadow-sm relative overflow-hidden">
            {/* Diagonal watermark text repeated across the background */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute inset-0 flex flex-col justify-around">
                    {[...Array(6)].map((_, i) => (
                        <h2
                            key={i}
                            className="text-xl md:text-2xl font-bold text-gray-300 opacity-40 select-none whitespace-nowrap"
                            style={{
                                transform: `rotate(-45deg) translateX(${i * 20}px)`,
                                transformOrigin: 'center'
                            }}
                        >
                            WINNER'S WIN! &nbsp;&nbsp;&nbsp; WINNER'S WIN! &nbsp;&nbsp;&nbsp; WINNER'S WIN! &nbsp;&nbsp;&nbsp; WINNER'S WIN! &nbsp;&nbsp;&nbsp; WINNER'S WIN! &nbsp;&nbsp;&nbsp; WINNER'S WIN!
                        </h2>
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center mb-6 relative z-10">
                {/* P spins for 1.5s, M spins for 3.0s, A spins for 4.5s */}
                <SlotColumn key={`p-${key}`} words={pWords} finalWord="Positive" delay={1500} onComplete={handleComplete} columnIndex={0} />
                <SlotColumn key={`m-${key}`} words={mWords} finalWord="Mental" delay={3000} onComplete={handleComplete} columnIndex={1} />
                <SlotColumn key={`a-${key}`} words={aWords} finalWord="Action" delay={4500} onComplete={handleComplete} columnIndex={2} />
            </div>

            {/* Full Confetti Celebration - falling from top across full width */}
            {jackpot && (
                <>
                    {/* Falling confetti from top */}
                    <div className="fixed inset-0 pointer-events-none z-50">
                        {[...Array(100)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full"
                                style={{
                                    backgroundColor: ['#FFD700', '#FF6347', '#00CED1', '#FF69B4', '#9370DB', '#32CD32'][i % 6],
                                    left: `${Math.random() * 100}vw`,
                                    top: '-20px'
                                }}
                                animate={{
                                    y: ['0vh', '100vh'],
                                    rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                                    opacity: [1, 1, 0]
                                }}
                                transition={{
                                    duration: 2.5 + Math.random() * 2,
                                    ease: "linear",
                                    delay: Math.random() * 1.5
                                }}
                            />
                        ))}
                    </div>

                    {/* Blast confetti from center of slot machine */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-visible z-50">
                        {[...Array(60)].map((_, i) => {
                            const angle = (i / 60) * 360;
                            const distance = 150 + Math.random() * 250;
                            const radians = (angle * Math.PI) / 180;
                            const endX = Math.cos(radians) * distance;
                            const endY = Math.sin(radians) * distance;

                            return (
                                <motion.div
                                    key={`blast-${i}`}
                                    className="absolute w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor: ['#FFD700', '#FF6347', '#00CED1', '#FF69B4', '#9370DB', '#32CD32'][i % 6],
                                        left: '0',
                                        top: '0'
                                    }}
                                    animate={{
                                        x: [0, endX],
                                        y: [0, endY],
                                        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                                        opacity: [1, 0.8, 0]
                                    }}
                                    transition={{
                                        duration: 1.5 + Math.random() * 0.5,
                                        ease: "easeOut",
                                        delay: Math.random() * 0.2
                                    }}
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
