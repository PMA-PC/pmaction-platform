import React from 'react';

export default function SmartInsight({ onOpenCoach }) {
    // Mock logic for now
    const hour = new Date().getHours();
    let insight = "";

    if (hour < 10) {
        insight = "If you can get your walk in early, you should - likely to rain later. :)";
    } else if (hour < 14) {
        insight = "I'd like to check-in at noon today for a quick 2 min mood and journal entry while you are working today.";
    } else {
        insight = "Great job today! Take a moment to reflect on your wins before winding down.";
    }

    return (
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div className="flex-grow">
                <h4 className="font-bold text-gray-800 text-sm uppercase mb-1">Smart Insight</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                    {insight}
                </p>
                {onOpenCoach && (
                    <button
                        onClick={onOpenCoach}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                        💬 Chat with AI Coach
                    </button>
                )}
            </div>
        </div>
    );
}
