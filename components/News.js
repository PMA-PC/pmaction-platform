import React from 'react';

export const News = () => {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">Mental Health News</h1>
                <p className="text-lg text-gray-600 mt-2">Latest updates and research.</p>
            </div>
            <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-6xl mb-4">📰</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon</h2>
                <p className="text-gray-500">We're curating the best mental health news for you. Check back later!</p>
            </div>
        </div>
    );
};
