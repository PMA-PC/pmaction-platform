import React from 'react';

const providers = [
    { name: 'Psychology Today', url: 'https://www.psychologytoday.com/us/therapists' },
    { name: 'NAMI', url: 'https://www.nami.org/' },
    { name: 'SAMHSA', url: 'https://www.samhsa.gov/find-help/national-helpline' },
    { name: 'The Trevor Project', url: 'https://www.thetrevorproject.org/' },
];

export const ProviderIcons = () => (
    <div className="flex flex-wrap gap-4 items-center">
        {providers.map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors text-sm">
                {p.name}
            </a>
        ))}
    </div>
);
