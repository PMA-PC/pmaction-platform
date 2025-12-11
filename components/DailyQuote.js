import React, { useState, useEffect } from 'react';

const QUOTES = [
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do.",
    "You are enough just as you are.",
    "Small steps every day add up to big results.",
    "Your potential is endless.",
    "Focus on the step in front of you, not the whole staircase.",
    "Be kind to yourself. You're doing the best you can."
];

export default function DailyQuote() {
    const [quote, setQuote] = useState("");

    useEffect(() => {
        // Pick a random quote for now, or could be based on date
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        setQuote(randomQuote);
    }, []);

    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                "{quote}"
            </h1>
            <p className="mt-2 text-gray-600 font-medium">Let's make today count.</p>
        </div>
    );
}
