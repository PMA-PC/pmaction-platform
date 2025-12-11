import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function CommunityPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>Community | PMAction</title>
            </Head>

            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                >
                    ← Back
                </button>

                <div className="space-y-8 animate-fade-in">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800">Community</h1>
                        <p className="text-lg text-gray-600 mt-2">Connect with others.</p>
                    </div>
                    <div className="text-center p-12 bg-white rounded-2xl shadow-md">
                        <div className="text-6xl mb-4">🤝</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon</h2>
                        <p className="text-gray-600">We're building a safe space for you to connect with others on their journey.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
