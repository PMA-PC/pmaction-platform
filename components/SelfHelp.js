import React, { useState } from 'react';
import { generateActionPlan } from '../lib/services/geminiService';
import Spinner from './Spinner';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

export const SelfHelp = () => {
    const [skill, setSkill] = useState('');
    const [plan, setPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!skill.trim()) return;
        setIsLoading(true);
        setPlan(null);
        const result = await generateActionPlan(skill);
        setPlan(result);
        setIsLoading(false);
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">AI-Powered Self-Help</h1>
                <p className="text-lg text-gray-600 mt-2">Get a simple, guided exercise for what you're facing right now.</p>
            </div>
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <label htmlFor="skill-input" className="block text-lg font-semibold text-gray-700 mb-2">I want to work on...</label>
                <div className="flex gap-2">
                    <input
                        id="skill-input"
                        type="text"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        placeholder="e.g., 'feeling overwhelmed'"
                        className="flex-grow p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !skill.trim()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold disabled:bg-gray-400 hover:bg-blue-700 transition-colors"
                    >
                        Create Plan
                    </button>
                </div>
            </div>

            {isLoading && <div className="flex justify-center"><Spinner /></div>}

            {plan && (
                <div className="max-w-xl mx-auto animate-fade-in">
                    <Card>
                        <CardHeader>
                            <CardTitle>{plan.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ol className="list-decimal list-inside space-y-2">
                                {plan.steps.map((step, index) => <li key={index}>{step}</li>)}
                            </ol>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};
