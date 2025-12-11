import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useApp } from '../lib/context';
import { generateEducationalContent } from '../lib/services/geminiService';
import Spinner from '../components/Spinner';
import { BLOG_POSTS } from '../lib/blogData';

// Constants for the explorer
const MENTAL_HEALTH_CONDITIONS = [
    'Anxiety', 'Depression', 'ADHD', 'Autism', 'Bipolar Disorder',
    'PTSD', 'OCD', 'Eating Disorders', 'Stress', 'Burnout',
    'Self-Esteem', 'Grief', 'Sleep Issues', 'Social Anxiety'
];
const AUDIENCES = ['For Adults', 'For Young Adults', 'For Supporters', 'For Seniors'];

const LibraryPage = () => {
    const router = useRouter();
    const { user, addWin } = useApp();

    // State
    const [viewingPost, setViewingPost] = useState(null); // If looking at a specific blog post
    const [audience, setAudience] = useState(AUDIENCES[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCard, setExpandedCard] = useState(null);
    const [contentCache, setContentCache] = useState({});
    const [loadingKeys, setLoadingKeys] = useState(new Set());
    const [readingList, setReadingList] = useState(new Set()); // Local state for demo

    const filteredConditions = useMemo(() => {
        if (!searchTerm) {
            return MENTAL_HEALTH_CONDITIONS;
        }
        return MENTAL_HEALTH_CONDITIONS.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm]);

    const handleToggle = (name) => {
        const cacheKey = `${name}-${audience}`;
        if (loadingKeys.has(cacheKey)) return;

        const isOpening = expandedCard !== name;

        if (isOpening) {
            setExpandedCard(name);
            if (!contentCache[cacheKey]) {
                const fetchContent = async () => {
                    setLoadingKeys(prev => new Set(prev).add(cacheKey));
                    try {
                        const generatedContent = await generateEducationalContent(name, audience);
                        setContentCache(prev => ({ ...prev, [cacheKey]: generatedContent }));

                        // Award small XP for exploration? 
                        // await addWin({ title: 'Explored Topic', xp: 5, ... }) 
                    } catch (e) {
                        console.error(e);
                    } finally {
                        setLoadingKeys(prev => {
                            const newKeys = new Set(prev);
                            newKeys.delete(cacheKey);
                            return newKeys;
                        });
                    }
                };
                fetchContent();
            }
        } else {
            setExpandedCard(null);
        }
    };

    const handleAudienceChange = (aud) => {
        setAudience(aud);
        setExpandedCard(null);
    };

    const handleToggleReading = (e, post) => {
        e.stopPropagation();
        if (!user) {
            alert('Please login to save articles.');
            return;
        }
        setReadingList(prev => {
            const next = new Set(prev);
            if (next.has(post.id)) next.delete(post.id);
            else next.add(post.id);
            return next;
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>Knowledge Library | PMAction</title>
            </Head>

            <nav className="max-w-7xl mx-auto mb-8">
                <button
                    onClick={() => router.back()}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                >
                    &larr; Back
                </button>
            </nav>

            <div className="max-w-7xl mx-auto space-y-12 animate-fade-in">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900">Knowledge Library</h1>
                    <p className="text-gray-600 mt-2 max-w-3xl mx-auto text-lg">An AI-powered resource for understanding mental health, featuring expert articles and on-demand information tailored to you.</p>
                </div>

                {/* Featured Articles Section */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Featured Articles</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {BLOG_POSTS.slice(0, 3).map(post => (
                            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group h-full border border-gray-100 hover:shadow-xl transition-all">
                                {post.imageUrl && <img src={post.imageUrl} alt="" className="w-full h-40 object-cover" />}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-primary transition-colors">{post.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3">By {post.author} • {post.date}</p>
                                    <p className="text-gray-600 mb-4 flex-grow text-sm line-clamp-3">{post.description || post.content.substring(0, 100)}...</p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <button onClick={() => router.push(`/blog/${post.id}`)} className="font-semibold text-brand-primary hover:text-green-800">Read More &rarr;</button>
                                        {user && (
                                            <button onClick={(e) => handleToggleReading(e, post)} className={`text-2xl transition-colors ${readingList.has(post.id) ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`} aria-label="Save to reading list">
                                                ★
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* AI Topic Explorer Section */}
                <section className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center flex justify-center items-center gap-2">
                        <span>🧠</span> AI Topic Explorer
                    </h2>
                    <p className="text-center text-gray-600 mt-2 mb-8 max-w-3xl mx-auto">Can't find what you're looking for? Select an audience and generate a detailed educational article on a specific topic instantly.</p>

                    <div className="sticky top-4 bg-white/95 backdrop-blur z-10 py-4 mb-6 border-b border-gray-100 pb-6">
                        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                            <input
                                type="search"
                                placeholder="Search for a condition..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-grow p-3 border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-brand-primary outline-none"
                            />
                            <div className="flex justify-center items-center gap-2 flex-wrap p-1 bg-gray-100 rounded-full">
                                {AUDIENCES.map(aud => (
                                    <button
                                        key={aud}
                                        onClick={() => handleAudienceChange(aud)}
                                        className={`px-4 py-2 rounded-full font-semibold transition-all text-sm flex-grow md:flex-grow-0 ${audience === aud ? 'bg-brand-primary text-white shadow-md' : 'bg-transparent text-gray-700 hover:bg-white'}`}
                                    >
                                        {aud}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredConditions.length > 0 ? (
                            filteredConditions.map(name => {
                                const isExpanded = expandedCard === name;
                                const cacheKey = `${name}-${audience}`;
                                const isLoadingThisCard = loadingKeys.has(cacheKey);
                                return (
                                    <div key={name} className={`bg-gray-50 rounded-xl shadow-sm border border-gray-100 flex flex-col transition-all duration-300 ${isExpanded ? 'lg:col-span-2 row-span-2' : ''}`}>
                                        <div className="p-6 flex-grow flex flex-col justify-center">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Topic</p>
                                        </div>
                                        <div className="px-6 py-4 mt-auto border-t border-gray-200">
                                            <button
                                                onClick={() => handleToggle(name)}
                                                className={`w-full text-center font-bold py-2 rounded-lg transition-colors ${isExpanded ? 'bg-gray-200 text-gray-800' : 'bg-white text-brand-primary shadow-sm hover:bg-green-50'}`}
                                                aria-expanded={isExpanded}
                                                aria-controls={`content-${name}`}
                                            >
                                                {isLoadingThisCard
                                                    ? 'Generating...'
                                                    : isExpanded
                                                        ? 'Close Info'
                                                        : `Explore`}
                                            </button>
                                        </div>
                                        {isExpanded && (
                                            <div id={`content-${name}`} className="px-8 pb-8 border-t border-gray-200 animate-fade-in bg-white rounded-b-xl">
                                                {isLoadingThisCard ? (
                                                    <div className="flex justify-center py-8"><Spinner /></div>
                                                ) : (
                                                    <div className="prose max-w-none prose-slate mt-4">
                                                        <h4 className="text-lg font-bold text-brand-primary mb-4">Perspective: {audience}</h4>
                                                        <p className="whitespace-pre-line text-gray-700 leading-relaxed">{contentCache[cacheKey]}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )
                            })
                        ) : (
                            <div className="text-center text-gray-600 py-8 md:col-span-3 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                <p>No conditions found matching "{searchTerm}".</p>
                            </div>
                        )}
                    </div>
                </section>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center text-sm text-blue-800 max-w-3xl mx-auto">
                    <strong>Medical Disclaimer:</strong> This content is generated by AI for educational purposes only. It is not professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.
                </div>
            </div>
        </div>
    );
};

export default LibraryPage;
