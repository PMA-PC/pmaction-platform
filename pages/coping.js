import React, { useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { WELLNESS_SKILLS } from '../lib/copingSkillsData';
import { useApp } from '../lib/context';

const CopingSkillsPage = () => {
    const router = useRouter();
    const { addWin } = useApp();

    const setActiveExercise = (exerciseId) => {
        // For now, we can just log a win or show an alert, or navigate to a specific exercise page.
        // The user's code implied setting state, but without the interactive components, we'll placeholder it.
        alert(`Starting exercise: ${exerciseId}`);
        // Potential future: router.push(/exercise/${exerciseId}) or open a modal
    };

    const skillsByCategory = useMemo(() => {
        return WELLNESS_SKILLS.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {});
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>Coping Skills | PMAction</title>
            </Head>

            <nav className="max-w-4xl mx-auto mb-8">
                <button
                    onClick={() => router.back()}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                >
                    &larr; Back
                </button>
            </nav>

            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900">Coping Skills</h1>
                    <p className="text-gray-600 mt-2 text-lg">A library of techniques to help you manage difficult feelings and find calm in the moment.</p>
                </div>

                <div className="space-y-10">
                    {Object.entries(skillsByCategory).map(([category, skills]) => (
                        <section key={category}>
                            <h2 className="text-2xl font-bold mb-4 border-b-2 border-brand-primary/20 pb-2 text-gray-800">{category}</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {skills.map(skill => (
                                    <div key={skill.id} className="bg-white p-6 rounded-xl shadow-lg flex flex-col hover:shadow-xl transition-shadow border border-gray-100">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{skill.title}</h3>
                                        <p className="text-gray-600 flex-grow mb-4 leading-relaxed">{skill.description}</p>
                                        {skill.interactiveId && (
                                            <button
                                                onClick={() => setActiveExercise(skill.interactiveId)}
                                                className="mt-auto bg-brand-secondary text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-brand-secondary-hover transition-colors self-start shadow-sm"
                                            >
                                                Try It Now
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CopingSkillsPage;
