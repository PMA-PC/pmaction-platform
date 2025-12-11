import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SelfHelp } from '../components/SelfHelp';

export default function SelfHelpPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>AI Self-Help | PMAction</title>
            </Head>

            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                >
                    ← Back
                </button>

                <SelfHelp />
            </div>
        </div>
    );
};
