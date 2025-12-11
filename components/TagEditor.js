import React, { useState } from 'react';

export const TagEditor = ({ tags, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState((tags || []).join(', '));

    const handleSave = () => {
        onSave(editText.split(',').map(t => t.trim()).filter(Boolean));
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div className="flex items-center gap-2 mt-2 flex-wrap">
                <div className="flex flex-wrap gap-1">
                    {(tags || []).map(tag => <span key={tag} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{tag}</span>)}
                </div>
                <button onClick={() => { setEditText((tags || []).join(', ')); setIsEditing(true); }} className="text-xs text-gray-500 hover:underline flex-shrink-0">Edit Tags</button>
            </div>
        );
    }

    return (
        <div className="mt-2 flex gap-2 items-center">
            <input
                type="text"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                className="flex-grow p-1 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g., work, family"
            />
            <button onClick={handleSave} className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Save</button>
            <button onClick={() => setIsEditing(false)} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
        </div>
    );
};
