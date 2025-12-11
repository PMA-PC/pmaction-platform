import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const faqs = [
    {
        question: "What is PMAction?",
        answer: "PMAction stands for Positive Mental Action. It's a platform designed to help you build mental resilience through daily micro-habits, gamified challenges, and self-reflection tools. We believe that small, consistent positive actions lead to significant improvements in mental well-being over time."
    },
    {
        question: "How does the 'Gamification' work?",
        answer: "You earn XP (Experience Points) for every positive action you take—logging a win, completing a challenge task, reading an article, or checking in on your mood. As you earn XP, you level up! Keeping your 'Day Streak' alive by logging at least one action daily helps you build momentum and consistency."
    },
    {
        question: "What is the Neurodiversity Advantage Training?",
        answer: "This is a specialized 7-day challenge designed to help individuals explore the strengths associated with neurodivergence (like Autism and ADHD). Instead of focusing on deficits, this program highlights unique cognitive benefits and helps you leverage them in daily life."
    },
    {
        question: "Is my data private?",
        answer: "Yes. All data you enter into this application is stored exclusively on your local device in your web browser's storage. We do not have a server, and we cannot access your information. You are in complete control of your data. If you clear your browser cache, your data will be reset."
    },
    {
        question: "How do the AI features work?",
        answer: "We use Google's Gemini API to power features like the daily affirmation, blog generator, and 'Deep Dive' explanations. We only send the specific prompt (e.g., 'Generate a blog about resilience') to the service. We do NOT send your personal journal entries or profile history to the AI."
    },
    {
        question: "Is this app a substitute for therapy?",
        answer: "No. This application is an informational and educational tool designed for self-reflection and habit building. It is not a medical device and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Check the 'Resources' page for professional support links."
    },
];

export default function FAQPage() {
    const router = useRouter();
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>FAQ | PMAction</title>
            </Head>

            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                >
                    ← Back
                </button>

                <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h1>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center p-4 text-left font-semibold text-lg text-gray-800 hover:bg-gray-50 transition-colors"
                                >
                                    <span>{faq.question}</span>
                                    <span className="text-2xl text-blue-500">{openIndex === index ? '−' : '+'}</span>
                                </button>
                                {openIndex === index && (
                                    <div className="p-4 border-t border-gray-100 text-gray-700 bg-gray-50/50">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
