import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PMASlotMachine from '../components/PMASlotMachine';

// Define the Home component
const Home = () => {
  const [showWinnerMessage, setShowWinnerMessage] = useState(false);
  const [pulseButton, setPulseButton] = useState(false);

  const handleJackpotComplete = () => {
    setShowWinnerMessage(true);
    setPulseButton(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-white to-purple-50 p-4">
      <main className="text-center p-8 md:p-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl max-w-4xl w-full border border-white/50">
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight drop-shadow-sm">
          Welcome to PMAction.com
          <span className="block text-2xl md:text-3xl mt-2 font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Your personalized journey to Positive Mental Wellness.
          </span>
        </h1>

        {/* Taglines */}
        <div className="mb-10 space-y-4">
          <motion.p
            className="text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Be Awesome @ Today
          </motion.p>
          <motion.p
            className="text-xl md:text-2xl font-bold text-gray-600 italic"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Own Your Perfect Imperfections
          </motion.p>
        </div>

        <div className="py-8">
          <PMASlotMachine onJackpotComplete={handleJackpotComplete} />
        </div>

        {/* Winner's Win message - appears after jackpot */}
        {showWinnerMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: [0.8, 1.1, 1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
            className="my-8"
          >
            <h3 className="text-3xl md:text-4xl font-black text-pink-600 mb-2">
              WINNER'S WIN!
            </h3>
            <p className="text-purple-600 font-bold text-lg">You're ready to start.</p>
          </motion.div>
        )}

        <div className="flex justify-center mt-8 mb-12">
          <Link
            href="/onboarding/goals"
            className={`px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-2xl font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse ${pulseButton ? 'ring-4 ring-pink-300' : ''}`}
          >
            Start Your Journey ➜
          </Link>
        </div>

        <div className="border-t border-gray-100 pt-8 mt-8">
          <p className="text-gray-600 text-lg mb-4 font-medium max-w-2xl mx-auto leading-relaxed">
            Your trusted source to help you build a happy life :)
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700 mt-4 leading-tight">
            One <span className="text-pink-600">Action</span> at a Time.
          </h2>
        </div>
      </main>
    </div>
  );
};

export default Home;