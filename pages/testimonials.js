import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { TESTIMONIALS_DATA } from '../lib/constants';

const TestimonialsPage = () => {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>Community Stories | PMAction</title>
            </Head>

            <nav className="max-w-6xl mx-auto mb-8">
                <button
                    onClick={() => router.back()}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                >
                    &larr; Back
                </button>
            </nav>

            <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Stories</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Words of hope, resilience, and encouragement from the PMAction community.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {TESTIMONIALS_DATA.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-lg flex flex-col border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <svg className="w-32 h-32 text-brand-primary" fill="currentColor" viewBox="0 0 32 32">
                                    <path d="M10 8v8h6v10h-12v-10l4-9h4l-4 9zM24 8v8h6v10h-12v-10l4-9h4l-4 9z"></path>
                                </svg>
                            </div>

                            <svg className="w-10 h-10 text-brand-primary/40 mb-6" aria-hidden="true" fill="currentColor" viewBox="0 0 32 32">
                                <path d="M9.333 22.583c0-3.25 1.042-6.167 3.125-8.75l1.458 1.458c-1.5 1.833-2.25 3.875-2.25 6.125 0 1.042.167 2.042.5 3h-2.833c-.333-.958-.5-1.958-.5-3zM21.333 22.583c0-3.25 1.042-6.167 3.125-8.75l1.458 1.458c-1.5 1.833-2.25 3.875-2.25 6.125 0 1.042.167 2.042.5 3h-2.833c-.333-.958-.5-1.958-.5-3z"></path>
                            </svg>

                            <blockquote className="flex-grow relative z-10">
                                <p className="text-xl text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
                            </blockquote>

                            <footer className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-green-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {testimonial.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        {testimonial.location}
                                    </p>
                                </div>
                            </footer>
                        </div>
                    ))}
                </div>

                <div className="bg-brand-dark rounded-2xl p-12 text-center text-white shadow-xl">
                    <h2 className="text-3xl font-bold mb-4">Share Your Story</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto mb-8">Your journey can inspire others. If you'd like to share your experience with PMAction, we'd love to hear from you.</p>
                    <button className="bg-white text-brand-dark px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">Submit a Testimonial</button>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsPage;
