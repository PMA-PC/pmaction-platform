import React, { useState } from 'react';

export const NoteEditor = ({ note = '', onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(note);

    const handleSave = () => {
        onSave(editText);
        setIsEditing(false);
    };

    if (!isEditing && !note) {
        return <button onClick={() => setIsEditing(true)} className="text-sm text-gray-500 hover:underline">Add Note</button>
    }

    if (!isEditing) {
        return (
            <div className="mt-2 text-gray-700">
                <p className="whitespace-pre-wrap text-sm">{note}</p>
                <button onClick={() => { setEditText(note); setIsEditing(true); }} className="text-xs text-gray-400 hover:underline mt-1">Edit Note</button>
            </div>
        );
    }

    return (
        <div className="mt-2">
            <textarea
                value={editText}
                onChange={e => setEditText(e.target.value)}
                className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                rows={3}
                placeholder="Add a note about this item..."
            />
            <div className="flex gap-2 mt-2">
                <button onClick={handleSave} className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Save</button>
                <button onClick={() => setIsEditing(false)} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
            </div>
        </div>
    );
};
