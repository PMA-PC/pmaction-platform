import React, { useState, useCallback, useEffect } from 'react';
import { getGeminiDeepDive } from '../lib/services/geminiService';

const GeminiDeepDive = ({ currentDayContent }) => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [apiKeySelected, setApiKeySelected] = useState(false);

    // Check API key selection status on mount
    useEffect(() => {
        const checkApiKey = async () => {
            // Check if strict CSP or environment prevents accessing window.aistudio
            // In a standard Next.js app, window.aistudio is likely undefined unless injected by a specific dev environment.
            // We fallback to process.env.NEXT_PUBLIC_GEMINI_API_KEY check.
            if (typeof window !== 'undefined' && window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
                const hasKey = await window.aistudio.hasSelectedApiKey();
                setApiKeySelected(hasKey);
            } else {
                // Fallback: Check if we have an API key in env
                setApiKeySelected(!!(process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.API_KEY));
            }
        };
        checkApiKey();
    }, []);

    const handleQueryChange = useCallback((e) => {
        setQuery(e.target.value);
    }, []);

    const handleSelectApiKey = useCallback(async () => {
        if (typeof window !== 'undefined' && window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
            await window.aistudio.openSelectKey();
            setApiKeySelected(true);
            setError(null);
        } else {
            setError("AI Studio API key selection not available in this environment. Please set NEXT_PUBLIC_GEMINI_API_KEY in .env.local");
        }
    }, []);

    const handleSubmitQuery = useCallback(async () => {
        if (!query.trim()) {
            setError("Please enter a query for the deep dive.");
            return;
        }

        if (!apiKeySelected) {
            setError("Please select an API key first to use the Gemini Deep Dive.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResponse('');

        // Construct context from currentDayContent
        // Handling both the new structure (sections) and potentially simpler structures
        let contextText = "";
        if (currentDayContent) {
            contextText += `Title: ${currentDayContent.title || 'Topic'}\n`;
            if (currentDayContent.intro) contextText += `Intro: ${currentDayContent.intro}\n`;

            if (currentDayContent.sections && Array.isArray(currentDayContent.sections)) {
                currentDayContent.sections.forEach(s => {
                    contextText += `Section: ${s.title}\n${s.description}\n`;
                });
            }
        }

        const fullPrompt = `Based on the following context from a neurodiversity training program:
        
        ${contextText}

        Please provide a deep dive explanation on this user query, focusing on the strengths and benefits of neurodiversity: "${query}"`;

        try {
            const geminiResponse = await getGeminiDeepDive(fullPrompt);
            setResponse(geminiResponse);
        } catch (err) {
            console.error("Failed to fetch Gemini response:", err);
            setError(err.message || "An unexpected error occurred during the deep dive.");
        } finally {
            setIsLoading(false);
        }
    }, [query, currentDayContent, apiKeySelected]);

    return (
        <div className="mt-10 p-6 bg-blue-50 border-t-4 border-blue-300 rounded-lg shadow-md">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">Deep Dive with Gemini</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
                Curious to explore a concept further? Ask Gemini for a deeper explanation related to today's topic.
            </p>

            {!apiKeySelected && (
                <div className="p-4 mb-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md">
                    <p className="mb-2">
                        **Action Required:** API Key needed.
                    </p>
                    <button
                        onClick={handleSelectApiKey}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out shadow-md"
                    >
                        Select API Key
                    </button>
                </div>
            )}

            <textarea
                className="w-full p-4 h-32 bg-white border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 resize-y disabled:bg-gray-100"
                placeholder="e.g., 'How does this strength apply to leadership?'"
                value={query}
                onChange={handleQueryChange}
                disabled={isLoading || !apiKeySelected}
            ></textarea>

            <button
                onClick={handleSubmitQuery}
                className={`mt-4 px-6 py-3 rounded-md font-semibold text-white transition duration-300 ease-in-out shadow-md
                    ${isLoading || !apiKeySelected
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    }`}
                disabled={isLoading || !apiKeySelected}
            >
                {isLoading ? 'Thinking...' : 'Deep Dive with Gemini'}
            </button>

            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {response && (
                <div className="mt-6 p-4 bg-white border border-blue-200 rounded-md shadow-inner">
                    <h4 className="text-xl font-semibold text-blue-800 mb-2">Gemini's Insight:</h4>
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{response}</p>
                </div>
            )}
        </div>
    );
};

export default GeminiDeepDive;
