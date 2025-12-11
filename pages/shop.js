import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SHOP_PRODUCTS, SHOP_CATEGORIES } from '../lib/constants';

const ShopPage = () => {
    const router = useRouter();
    const [filter, setFilter] = useState('All');

    const filteredProducts = filter === 'All'
        ? SHOP_PRODUCTS
        : SHOP_PRODUCTS.filter(p => p.category === filter);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>Wellness Shop | PMAction</title>
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
                    <h1 className="text-4xl font-bold text-gray-900">Wellness Shop</h1>
                    <p className="text-gray-600 mt-2 text-lg max-w-2xl mx-auto">A curated selection of products to support your wellness journey. Purchases help support our mission.</p>
                </div>

                <div className="flex justify-center gap-3 flex-wrap">
                    {SHOP_CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-5 py-2 rounded-full font-semibold transition-all ${filter === category ? 'bg-brand-primary text-white shadow-md transform scale-105' : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(p => (
                        <a key={p.id} href={p.storeUrl} className="bg-white rounded-xl shadow-md overflow-hidden group block hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="h-48 overflow-hidden">
                                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-6">
                                <div className="text-xs text-brand-primary font-bold uppercase tracking-wide mb-1">{p.category}</div>
                                <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-brand-primary transition-colors">{p.name}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{p.description}</p>
                                <div className="flex justify-between items-center mt-auto">
                                    <p className="text-xl font-bold text-gray-900">{p.price}</p>
                                    <span className="text-sm font-semibold text-blue-600 hover:underline">View Details &rarr;</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl text-center">
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">Want to feature your product?</h3>
                    <p className="text-blue-700 mb-6">We partner with ethical brands promoting mental wellness.</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">Contact Partnership Team</button>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
