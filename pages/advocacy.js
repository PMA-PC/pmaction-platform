import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { generateBlogPost } from '../lib/services/geminiService';
import { BLOG_THEMES } from '../lib/constants';
import Spinner from '../components/Spinner';
import { useApp } from '../lib/context';
import { BLOG_POSTS } from '../lib/blogData';

// --- Components (Internal for now, matching user structure) ---

const BlogGenerator = ({ addBlogPost }) => {
    const [theme, setTheme] = useState(BLOG_THEMES[0].value);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useApp();

    const handleGenerate = async () => {
        setIsLoading(true);
        setError('');
        try {
            // Note: generateBlogPost returns markdown string
            const contentMarkdown = await generateBlogPost(theme);

            // Simple parsing to create a post object from the generated text
            const lines = contentMarkdown.split('\n');
            let title = 'Generated Insight';
            let content = contentMarkdown;

            // Try to extract title if it starts with #
            if (lines.length > 0 && lines[0].trim().startsWith('# ')) {
                title = lines[0].replace('# ', '').trim();
                content = lines.slice(1).join('\n').trim();
            }

            const newPost = {
                id: `gen-${Date.now()}`,
                title: title.replace(/^\*\*/, '').replace(/\*\*$/, ''), // Remove bolding if present
                author: 'AI Advocate',
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                content: content,
                tags: [theme, 'Community'],
                readTime: '3 min'
            };

            addBlogPost(newPost);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="bg-yellow-900/50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-8">
                <p className="text-yellow-600 font-medium">Please sign in to generate new blog posts.</p>
            </div>
        );
    }

    return (
        <div className="bg-brand-dark p-6 rounded-lg shadow-lg mb-8 text-white">
            <h2 className="text-2xl font-bold mb-4">AI Content Generator</h2>
            <p className="mb-4 text-gray-300">Create a new blog post using AI. Choose a theme and let our assistant write for you.</p>
            <div className="flex flex-col sm:flex-row gap-4">
                <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="flex-grow p-3 bg-gray-800 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-brand-primary outline-none"
                >
                    {BLOG_THEMES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="bg-brand-secondary text-brand-black px-6 py-3 rounded-md font-semibold hover:bg-brand-secondary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center min-w-[140px]"
                >
                    {isLoading ? <Spinner size="h-6 w-6" /> : 'Generate Post'}
                </button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

const BlogPostCard = ({ post }) => {
    const [showModal, setShowModal] = useState(false);

    const handleSave = () => {
        const fileContent = `Title: ${post.title}\nAuthor: ${post.author}\nDate: ${post.date}\n\n---\n\n${post.content}`;
        const fileName = `${post.title.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 50)}.txt`;
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.id}` : '#';
    const encodedShareUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(post.title);

    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedShareUrl}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`;

    // Helper to render content with basic markdown cleaning
    const renderContent = (text) => {
        // Simple replace for bolding
        return text.split('\n').map((line, i) => (
            <span key={i} className="block mb-2">
                {line}
            </span>
        ));
    };

    return (
        <>
            <div className="bg-brand-dark rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-700">
                <div className="p-6 flex flex-col h-full">
                    <p className="text-sm text-gray-400 mb-1">{post.date} by {post.author}</p>
                    <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                    <div className="text-gray-300 text-sm line-clamp-3 mb-4 flex-grow opacity-80">
                        {post.description || post.content.substring(0, 150) + '...'}
                    </div>
                    <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-auto self-start text-sm font-medium">
                        Read More
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-brand-dark rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 animate-in fade-in zoom-in duration-200">
                        <div className="p-8">
                            <h2 className="text-3xl font-bold text-white mb-2">{post.title}</h2>
                            <p className="text-sm text-gray-400 mb-4">{post.date} by {post.author}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {post.tags && post.tags.map(tag => (
                                    <span key={tag} className="bg-brand-secondary text-brand-black text-xs font-bold px-3 py-1 rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="text-gray-200 whitespace-pre-wrap leading-relaxed space-y-4 mb-8">
                                {post.content}
                            </div>

                            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                                    <span>✍️</span> My Commitment / Journal Entry
                                </h4>
                                <textarea
                                    className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                    rows="3"
                                    placeholder="I commit to trying this by..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="px-8 py-6 bg-gray-900 border-t border-gray-800 flex flex-wrap justify-between items-center gap-4 rounded-b-xl">
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-400 uppercase tracking-wide font-semibold">Share:</span>
                                <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full" aria-label="Share on Twitter">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.561-.666 2.477 0 1.61.82 3.028 2.054 3.863-.764-.024-1.482-.234-2.11-.583v.06c0 2.254 1.605 4.135 3.737 4.568-.39.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.844 2.308 3.187 4.341 3.224-1.594 1.248-3.6 1.99-5.786 1.99-.375 0-.745-.022-1.112-.065 2.062 1.323 4.51 2.092 7.14 2.092 8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.602A9.46 9.46 0 0024 4.557z" />
                                    </svg>
                                </a>
                                <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full" aria-label="Share on Facebook">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.351C0 23.41.59 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z" />
                                    </svg>
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={handleSave} className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium flex items-center gap-2">
                                    <span>💾</span> Save
                                </button>
                                <button onClick={() => setShowModal(false)} className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-primary-hover transition-colors font-bold shadow-lg shadow-blue-900/20">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// --- Main Page Component ---

export default function AdvocacyPage() {
    const [posts, setPosts] = useState(BLOG_POSTS);
    const [searchTerm, setSearchTerm] = useState('');

    // Simple ID generator for new posts if needed
    const addBlogPost = (newPost) => {
        setPosts(prev => [newPost, ...prev]);
    };

    const filteredPosts = useMemo(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        if (!lowercasedFilter) return posts;

        return posts.filter(post =>
            post.title.toLowerCase().includes(lowercasedFilter) ||
            post.content.toLowerCase().includes(lowercasedFilter) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowercasedFilter)))
        );
    }, [posts, searchTerm]);

    return (
        <div className="min-h-screen bg-gray-900 pb-20">
            <Head>
                <title>Advocacy & News | PMAction</title>
                <meta name="description" content="Join the movement. Advocacy, news, and stories of hope." />
            </Head>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                        Advocacy & News
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Empowering voices, breaking stigmas, and building a supportive community.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Content (2/3) */}
                    <div className="md:col-span-2 space-y-12">
                        <section className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-3xl">📢</span> Our Mission
                            </h2>
                            <p className="text-gray-300 mb-4 leading-relaxed">
                                We are dedicated to promoting mental health as a critical part of overall wellness. We provide education, support, and advocacy to fight stigma, challenge inequities, and encourage policies that support people with mental health conditions and their families.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                You can be an advocate for mental health. Sign up for our newsletter to stay informed, share stories to reduce stigma, and support our mission.
                            </p>
                        </section>

                        <section>
                            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                                <h2 className="text-3xl font-bold text-white">Latest Stories</h2>
                                <div className="relative w-full md:w-96">
                                    <input
                                        type="text"
                                        placeholder="Search stories..."
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        className="w-full pl-4 pr-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl shadow-inner focus:ring-2 focus:ring-brand-primary outline-none transition-all placeholder-gray-500"
                                    />
                                    <span className="absolute right-3 top-3 text-gray-500">🔍</span>
                                </div>
                            </div>

                            <BlogGenerator addBlogPost={addBlogPost} />

                            <div className="grid md:grid-cols-2 gap-6 mt-8">
                                {filteredPosts.length > 0 ? (
                                    filteredPosts.map((post, idx) => (
                                        <BlogPostCard key={post.id || idx} post={post} />
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 text-center text-gray-500 bg-gray-800 rounded-xl border border-gray-700 border-dashed">
                                        <p className="text-lg">No posts found matching your search.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Crisis Resources (1/3) */}
                    <div className="md:col-span-1 space-y-8 sticky top-24">
                        <div className="bg-red-900/20 border-2 border-red-500/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center justify-center gap-2">
                                <span>🆘</span> Crisis Support
                            </h2>
                            <p className="text-gray-300 text-center mb-6 text-sm">
                                If you need immediate help, please reach out to these free, confidential resources.
                            </p>
                            <ul className="space-y-4">
                                <li className="bg-gray-800/80 rounded-xl p-4 border border-gray-700 hover:border-red-500/50 transition-colors">
                                    <div className="font-bold text-white text-lg">Suicide Prevention Lifeline</div>
                                    <p className="text-gray-400 text-sm mb-2">24/7 free and confidential support.</p>
                                    <a href="tel:1-800-273-8255" className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-lg font-bold transition-colors">
                                        Call 1-800-273-8255
                                    </a>
                                </li>
                                <li className="bg-gray-800/80 rounded-xl p-4 border border-gray-700 hover:border-red-500/50 transition-colors">
                                    <div className="font-bold text-white text-lg">Crisis Text Line</div>
                                    <p className="text-gray-400 text-sm mb-2">Text 'HELLO' to 741741.</p>
                                    <a href="sms:741741" className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 rounded-lg font-bold transition-colors">
                                        Text 741741
                                    </a>
                                </li>
                                <li className="bg-gray-800/80 rounded-xl p-4 border border-gray-700 hover:border-red-500/50 transition-colors">
                                    <div className="font-bold text-white text-lg">Emergency Services</div>
                                    <p className="text-gray-400 text-sm mb-2">Immediate danger or medical emergency.</p>
                                    <a href="tel:911" className="block w-full bg-gray-700 hover:bg-gray-600 text-white text-center py-2 rounded-lg font-bold transition-colors border border-gray-600">
                                        Call 911
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-900/10 border border-blue-500/30 p-6 rounded-2xl">
                            <h3 className="font-bold text-blue-400 mb-2">Need a Professional?</h3>
                            <p className="text-sm text-gray-300 mb-4">
                                Our platform provides self-guided tools. For professional therapy or medical advice, please consult a licensed provider.
                            </p>
                            <button className="w-full text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors">
                                Find a Provider &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
