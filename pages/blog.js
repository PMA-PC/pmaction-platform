import React, { useState } from 'react';
import Head from 'next/head';
import { BLOG_POSTS } from '../lib/blogData';
import BlogPostModal from '../components/BlogPostModal';

export default function BlogPage() {
    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Head>
                <title>Wellness Blog | PMAction</title>
            </Head>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Wellness Blog</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Articles, insights, and science-backed strategies to support your journey.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map(post => (
                        <div
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group border border-gray-100"
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-full">{post.category}</span>
                                    <span className="text-xs text-gray-400">• {post.readTime} read</span>
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.description}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs text-gray-500">By {post.author}</span>
                                    <span className="text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform">Read more →</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedPost && (
                    <BlogPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
                )}
            </main>
        </div>
    );
}
