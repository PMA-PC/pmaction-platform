import React from 'react';

export default function Spinner({ size = "h-8 w-8" }) {
    return (
        <div className="flex justify-center items-center">
            <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${size}`}></div>
        </div>
    );
}
