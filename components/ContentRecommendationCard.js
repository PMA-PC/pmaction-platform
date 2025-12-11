import React, { useState, useEffect } from 'react';
import { CHALLENGES } from '../lib/challengesData';
import { BLOG_POSTS } from '../lib/blogData';
import BlogPostModal from './BlogPostModal';

export default function ContentRecommendationCard() {
    const [article, setArticle] = useState(BLOG_POSTS[0]);
    const [challenge, setChallenge] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Randomly select an article and a challenge
        setArticle(BLOG_POSTS[Math.floor(Math.random() * BLOG_POSTS.length)]);

        // Pick a random challenge that isn't the "active" one (logic handled by user usually, but here just random)
        const randomChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
        setChallenge(randomChallenge);
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Discover & Grow</h2>
                <a href="/advocacy" className="text-xs font-bold text-blue-600 hover:underline">View All</a>
            </div>

            <div className="space-y-4">
                {/* Featured Article */}
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100"
                >
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg text-xl">
                        📰
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Read</span>
                            <span className="text-xs text-gray-400">• {article.readTime}</span>
                        </div>
                        <h3 className="font-bold text-gray-800 leading-tight mb-1">{article.title}</h3>
                        <p className="text-sm text-gray-500">Explore {article.category} insights.</p>
                    </div>
                </div>

                <div className="h-px bg-gray-100 w-full"></div>

                {/* Featured Challenge */}
                {challenge && (
                    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                        <div className="bg-purple-100 text-purple-600 p-3 rounded-lg text-xl">
                            🎯
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Challenge</span>
                                <span className="text-xs text-gray-400">• {challenge.duration}</span>
                            </div>
                            <h3 className="font-bold text-gray-800 leading-tight mb-1">{challenge.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-1">{challenge.description}</p>
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && article && (
                <BlogPostModal post={article} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
}
