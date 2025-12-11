import React from 'react';
import Head from 'next/head';
import { News } from '../components/News';

export default function NewsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Head>
                <title>News | PMAction</title>
            </Head>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <News />
            </main>
        </div>
    );
}
