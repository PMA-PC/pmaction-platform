import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Define data internally or import if it grows large
const SUPPORT_GROUPS = {
    'Crisis Support': [
        { name: '988 Suicide & Crisis Lifeline', url: 'https://988lifeline.org' },
        { name: 'Crisis Text Line', url: 'https://www.crisistextline.org' },
        { name: 'The Trevor Project (LGBTQ+)', url: 'https://www.thetrevorproject.org' },
        { name: 'Veterans Crisis Line', url: 'https://www.veteranscrisisline.net' },
    ],
    'Mental Health Orgs': [
        { name: 'NAMI (National Alliance on Mental Illness)', url: 'https://www.nami.org' },
        { name: 'MHA (Mental Health America)', url: 'https://mhanational.org' },
        { name: 'DBSA (Depression and Bipolar Support Alliance)', url: 'https://www.dbsalliance.org' },
        { name: 'Anxiety & Depression Association of America', url: 'https://adaa.org' },
    ],
    'Addiction & Recovery': [
        { name: 'SAMHSA National Helpline', url: 'https://www.samhsa.gov/find-help/national-helpline' },
        { name: 'AA (Alcoholics Anonymous)', url: 'https://www.aa.org' },
        { name: 'NA (Narcotics Anonymous)', url: 'https://www.na.org' },
        { name: 'SMART Recovery', url: 'https://www.smartrecovery.org' },
    ],
    'Therapy Directories': [
        { name: 'Psychology Today', url: 'https://www.psychologytoday.com/us' },
        { name: 'GoodTherapy', url: 'https://www.goodtherapy.org' },
        { name: 'TherapyDen', url: 'https://www.therapyden.com' },
        { name: 'Open Path Collective (Affordable)', url: 'https://openpathcollective.org' },
    ]
};

const ResourcesPage = () => {
    const router = useRouter();
    const [filter, setFilter] = useState('All');
    const categories = ['All', ...Object.keys(SUPPORT_GROUPS)];

    const filteredGroups = filter === 'All'
        ? SUPPORT_GROUPS
        : { [filter]: SUPPORT_GROUPS[filter] };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>Find Support | PMAction</title>
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
                    <h1 className="text-4xl font-bold text-gray-900">Find Support</h1>
                    <p className="text-gray-600 mt-2 text-lg">You are not alone. Help is available.</p>
                </div>

                <div className="bg-red-50 border-2 border-red-300 p-8 rounded-2xl shadow-sm">
                    <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2">
                        <span>🆘</span> Immediate Crisis Resources
                    </h2>
                    <p className="text-red-700 mb-6 text-lg">If you are in a crisis or any other person may be in danger, please use these resources to get help immediately.</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm">
                            <p className="font-bold text-lg text-gray-800 mb-1">988 Suicide & Crisis Lifeline</p>
                            <p className="text-gray-600 mb-3">24/7, free, and confidential support.</p>
                            <a href="tel:988" className="inline-block bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700 transition">Call or Text 988</a>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm">
                            <p className="font-bold text-lg text-gray-800 mb-1">Crisis Text Line</p>
                            <p className="text-gray-600 mb-3">Text with a trained Crisis Counselor.</p>
                            <a href="sms:741741" className="inline-block bg-indigo-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-indigo-700 transition">Text HOME to 741741</a>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Organizations & Information</h2>

                    <div className="flex justify-center gap-2 flex-wrap mb-8">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 text-sm ${filter === category ? 'bg-brand-primary text-white shadow-md transform scale-105' : 'bg-gray-100 text-gray-700 hover:bg-green-100'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-8">
                        {Object.entries(filteredGroups).map(([category, orgs]) => (
                            <div key={category} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <h3 className="text-xl font-bold mb-4 border-b-2 border-green-100 pb-2 text-gray-800 flex items-center gap-2">
                                    <span className="text-brand-primary">●</span> {category}
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {orgs.map(org => (
                                        <div key={org.name} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-primary/30 hover:shadow-md transition-all group">
                                            <h4 className="font-bold text-gray-800 group-hover:text-brand-primary transition-colors">{org.name}</h4>
                                            <a href={org.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-brand-primary truncate block mt-1">
                                                {org.url.replace('https://', '').replace('www.', '').replace(/\/$/, '')} &rarr;
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
