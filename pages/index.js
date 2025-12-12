import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
// Define the Home component
import Head from 'next/head';

import PMASlotMachine from '../components/PMASlotMachine';

const Home = () => {
  const [showWinnerMessage, setShowWinnerMessage] = useState(false);
  const [pulseButton, setPulseButton] = useState(false);

  const handleJackpotComplete = () => {
    setShowWinnerMessage(true);
    setPulseButton(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-teal-50 p-4">
      <Head>
        <title>PMAction | Positive Mental Action & Neurodiversity Tools</title>
        <meta name="description" content="Your personalized journey to Positive Mental Wellness. Neurodiversity-friendly habit tracking, mood logging, and tools for ADHD/Autism." />
        <meta name="keywords" content="positive mental attitude, neurodiversity, habit tracker, ADHD tools, mood log, self-care app" />
        <meta property="og:title" content="PMAction | Positive Mental Action & Neurodiversity Tools" />
        <meta property="og:description" content="Your personalized journey to Positive Mental Wellness. Be Awesome @ Today with our neuro-inclusive tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pmaction.com" />
        <meta property="og:image" content="https://pmaction.com/og-image-home.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-center p-6 md:p-10 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl max-w-4xl w-full border border-white/50">
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-600 mb-8 leading-tight drop-shadow-sm">
          Welcome to PMAction.com
          <span className="block text-2xl md:text-3xl mt-2 font-bold text-gray-600">
            Your personalized journey to <span className="text-green-600 font-black">Positive Mental</span> Wellness.
          </span>
        </h1>

        {/* Slot Machine */}
        <div className="mb-4 transform hover:scale-[1.01] transition-transform duration-500">
          <PMASlotMachine onJackpotComplete={handleJackpotComplete} />
        </div>

        <div className="flex justify-center mt-4 mb-6">
          <Link
            href="/onboarding/goals"
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl md:text-2xl font-black rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse tracking-wide"
          >
            Start your free journey to PMAction ➜
          </Link>
        </div>

        <div className="border-t border-gray-100 pt-4 mt-4">
          <p className="text-gray-600 text-lg mb-2 font-medium max-w-2xl mx-auto leading-relaxed">
            Your trusted source to help you build a happy life :)
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700 mt-2 leading-tight">
            One <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-black">Positive Mental Action</span> at a Time.
          </h2>
        </div>
      </main>
    </div>
  );
};

export default Home;