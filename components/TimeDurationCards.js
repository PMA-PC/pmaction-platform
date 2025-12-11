import React, { useState, useEffect } from 'react';
import { GuidedExerciseModal } from './GuidedExerciseModal';

const ONE_MIN_ACTIONS = [
    { title: "Breathe", icon: "🌬️", desc: "Take 3 deep breaths." },
    { title: "Hydrate", icon: "💧", desc: "Drink a glass of water." },
    { title: "Stretch", icon: "🙆", desc: "Stand up and stretch." },
    { title: "Smile", icon: "😊", desc: "Force a smile for 10s." }
];

export default function TimeDurationCards() {
    const [oneMinAction, setOneMinAction] = useState(ONE_MIN_ACTIONS[0]);
    const [isExerciseOpen, setIsExerciseOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

    useEffect(() => {
        // Rotate 1-min action every 10 seconds or on mount
        const interval = setInterval(() => {
            const random = ONE_MIN_ACTIONS[Math.floor(Math.random() * ONE_MIN_ACTIONS.length)];
            setOneMinAction(random);
        }, 10000); // Rotate every 10s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* 1 Minute Card */}
            <div
                onClick={() => {
                    setSelectedExercise({
                        name: oneMinAction.title,
                        description: oneMinAction.desc,
                        steps: [
                            { title: "Get Ready", description: "Find a comfortable position." },
                            { title: "Action", description: oneMinAction.desc },
                            { title: "Reflect", description: "Notice how you feel." }
                        ]
                    });
                    setIsExerciseOpen(true);
                }}
                className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer"
            >
                <div className="text-sm font-bold text-blue-400 uppercase mb-1">1 Minute</div>
                <div className="text-3xl mb-2">{oneMinAction.icon}</div>
                <h3 className="font-bold text-gray-800">{oneMinAction.title}</h3>
                <p className="text-xs text-gray-500">{oneMinAction.desc}</p>
            </div>

            {/* 5 Minute Card */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-sm font-bold text-purple-400 uppercase mb-1">5 Minutes</div>
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-bold text-gray-800">Quick Journal</h3>
                <p className="text-xs text-gray-500">Write down 3 things you're grateful for.</p>
            </div>

            {/* 10+ Minute Card */}
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-sm font-bold text-orange-400 uppercase mb-1">10+ Minutes</div>
                <div className="text-3xl mb-2">🧘</div>
                <h3 className="font-bold text-gray-800">Deep Focus</h3>
                <p className="text-xs text-gray-500">Meditate, read, or take a long walk.</p>
            </div>

            {isExerciseOpen && (
                <GuidedExerciseModal
                    exercise={selectedExercise}
                    onClose={() => setIsExerciseOpen(false)}
                />
            )}
        </div>
    );
}
