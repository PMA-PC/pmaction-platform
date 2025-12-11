import React from 'react';

const CRISIS_RESOURCES = [
    {
        name: "National Suicide Prevention Lifeline",
        phone: "1-800-273-8255",
        link: "https://suicidepreventionlifeline.org/",
        desc: "24/7 free and confidential support for people in distress."
    },
    {
        name: "Text 'HELLO' to 741741",
        phone: "741741",
        link: "https://www.crisistextline.org/",
        desc: "Crisis Text Line: 24/7 support via SMS."
    },
    {
        name: "Emergency Services",
        phone: "911",
        link: "tel:911",
        desc: "Call 911 for emergencies or immediate danger."
    },
];

const CrisisModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
            <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
                onClick={onClose}
                aria-label="Close"
            >&times;</button>
            <h2 className="text-xl font-bold mb-2 text-center text-red-600">Get Help Now</h2>
            <p className="text-center text-gray-600 mb-4">If you are in crisis or need immediate help, please reach out:</p>
            <ul className="mb-4 space-y-3">
                {CRISIS_RESOURCES.map(resource => (
                    <li key={resource.name} className="border rounded p-3 hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-lg">{resource.name}</div>
                        <div className="text-sm text-gray-600">{resource.desc}</div>
                        <div className="mt-1">
                            <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-bold">{resource.phone}</a>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="text-xs text-gray-400 text-center mt-2">
                This app is not a substitute for immediate clinical or emergency help.
            </div>
        </div>
    </div>
);

export default CrisisModal;
