// pages/onboarding/goals.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext';

const GOALS = [
    {
        id: 'habits',
        icon: '🎯',
        title: 'Build Better Habits',
        description: 'Create positive routines that stick'
    },
    {
        id: 'wellbeing',
        icon: '🧠',
        title: 'Improve Mental Wellbeing',
        description: 'Enhance your overall mental health'
    },
    {
        id: 'stress',
        icon: '😌',
        title: 'Reduce Stress and Anxiety',
        description: 'Find calm in daily life'
    },
    {
        id: 'emotional-intelligence',
        icon: '💡',
        title: 'Better Understand Emotional Intelligence',
        description: 'Develop self-awareness and empathy'
    },
    {
        id: 'gratitude',
        icon: '🙏',
        title: 'Increase Gratitude',
        description: 'Cultivate appreciation and positivity'
    },
    {
        id: 'mindfulness',
        icon: '🧘',
        title: 'Practice Mindfulness',
        description: 'Live more in the present moment'
    },
    {
        id: 'build-relationships',
        icon: '❤️',
        title: 'Build Better Relationships',
        description: 'Strengthen connections with others'
    },
    {
        id: 'life-skills',
        icon: '🌱',
        title: 'Improve Life Skills',
        description: 'Build practical skills for daily living'
    },
    {
        id: 'relationships',
        icon: '🤝',
        title: 'Better Understanding of Mental Health',
        description: 'For partner, work, or friends'
    },
    {
        id: 'therapy-notes',
        icon: '📝',
        title: 'Notes for You or Your Therapist',
        description: 'Track insights and progress'
    },
    {
        id: 'self-care',
        icon: '🛁',
        title: 'Prioritize Self-Care',
        description: 'Make time for yourself'
    }
];

const GoalsPage = () => {
    const router = useRouter();
    const { data, update } = useOnboarding();
    const [selectedGoals, setSelectedGoals] = useState(data.goals || []);

    const toggleGoal = (goalId) => {
        setSelectedGoals(prev => {
            if (prev.includes(goalId)) {
                return prev.filter(id => id !== goalId);
            } else {
                return [...prev, goalId];
            }
        });
    };

    const handleContinue = () => {
        update({ goals: selectedGoals });
        router.push('/onboarding/personal-details');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>What Brings You Here? | PMAction</title>
                <meta name="description" content="Select your goals for mental wellness" />
            </Head>

            <div className="w-full max-w-6xl space-y-8">
                {/* Progress Steps */}
                <div className="flex justify-center space-x-4 mb-8">
                    {[1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step === 1
                                ? 'bg-teal-600 text-white shadow-lg scale-110'
                                : 'bg-white text-gray-400 border-2 border-gray-200'
                                }`}
                        >
                            {step}
                        </div>
                    ))}
                </div>

                <div className="text-center mb-12">
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        What Brings You Here?
                    </motion.h1>
                    <motion.p
                        className="text-2xl font-bold text-teal-600 italic mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        "Own Your Perfect Imperfections"
                    </motion.p>
                    <motion.p
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Select all the goals that resonate with you. We'll personalize your experience based on what matters most.
                    </motion.p>
                </div>

                {/* Goals Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {GOALS.map((goal, index) => {
                        const isSelected = selectedGoals.includes(goal.id);
                        return (
                            <motion.button
                                key={goal.id}
                                onClick={() => toggleGoal(goal.id)}
                                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 text-left ${isSelected
                                    ? 'bg-gradient-to-br from-teal-50 to-teal-100 border-teal-500 shadow-lg scale-105'
                                    : 'bg-white border-gray-200 hover:border-teal-300 hover:shadow-md'
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Selection Indicator */}
                                {isSelected && (
                                    <motion.div
                                        className="absolute top-4 right-4 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    >
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>
                                )}

                                <div className="text-5xl mb-3">{goal.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{goal.title}</h3>
                                <p className="text-sm text-gray-600">{goal.description}</p>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Continue Button */}
                <div className="flex flex-col items-center space-y-4">
                    {selectedGoals.length === 0 && (
                        <p className="text-sm text-gray-500 italic">Please select at least one goal to continue</p>
                    )}
                    <motion.button
                        onClick={handleContinue}
                        disabled={selectedGoals.length === 0}
                        className={`px-12 py-4 rounded-xl text-lg font-bold transition-all duration-300 ${selectedGoals.length > 0
                            ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-xl hover:shadow-2xl hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        whileHover={selectedGoals.length > 0 ? { scale: 1.05 } : {}}
                        whileTap={selectedGoals.length > 0 ? { scale: 0.98 } : {}}
                    >
                        Continue
                        {selectedGoals.length > 0 && (
                            <span className="ml-2 text-sm opacity-80">
                                ({selectedGoals.length} selected)
                            </span>
                        )}
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default GoalsPage;
