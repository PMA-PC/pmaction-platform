import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function PrivacyPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>Privacy Policy | PMAction</title>
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
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
                        <p className="text-lg text-gray-600">Last updated: October 27, 2023</p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg prose max-w-none text-gray-700 leading-relaxed">
                        <p className="mb-4">
                            Your privacy is our top priority. This application is designed to be a private, secure space for your self-reflection and mental wellness journey.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Data Storage</h2>
                        <p className="mb-4">
                            All data you generate within this application, including your self-assessment results, mood journal entries, saved articles, and other personal information, is stored <strong>exclusively on your local device</strong> within your web browser's local storage.
                        </p>
                        <p className="mb-4">
                            <strong>We do not have a server database.</strong> Your data is never sent to, stored on, or processed by any external servers owned or managed by us. This means we have no access to your personal information. Your data remains on your computer or mobile device.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Data Deletion</h2>
                        <p className="mb-4">
                            Because your data is stored locally, you have full control over it. You can clear your data at any time by clearing your browser's cache and site data for this application.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Third-Party Services</h2>
                        <p className="mb-4">
                            This application uses Google's Gemini API for its AI-powered features (e.g., generating wellness tips and educational content). The prompts sent to this service (such as your selected mood or a topic you enter) are processed by Google to generate a response. We do not send any of your stored personal data (like assessment history or journal entries) to this service. Please refer to Google's privacy policy for information on how they handle data.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Disclaimer</h2>
                        <p className="mb-4">
                            This application is an informational and educational tool. It is not a medical device and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
