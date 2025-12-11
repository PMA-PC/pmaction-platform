import React, { useState } from 'react';
import { useApp } from '../lib/context';
import { useNotification } from './Notification';

const SettingsModal = ({ onClose }) => {
    const { userProfile, supabase } = useApp(); // Assuming supabase is available in useApp or I import it
    const { notify } = useNotification();
    // Mock settings for now as they might not be in DB yet
    const [theme, setTheme] = useState(userProfile?.settings?.theme || 'light');
    const [notifications, setNotifications] = useState(!!userProfile?.settings?.notifications);

    const handleSave = async () => {
        // In a real app, update supabase user_profiles
        // await supabase.from('user_profiles').update({ settings: { theme, notifications } }).eq('user_id', user.id);

        // For now, just notify
        notify("Settings updated! (Mock)", "success");
        onClose();
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
            // clearAllData(); // Implementation depends on context
            notify("All app data has been cleared. (Mock)", "warning");
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
                    onClick={onClose}
                    aria-label="Close"
                >&times;</button>
                <h2 className="text-xl font-bold mb-3 text-center text-gray-800">Settings</h2>
                <div className="mb-3">
                    <label className="block font-medium mb-1 text-gray-700">Theme</label>
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="block w-full border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={e => setNotifications(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Enable notifications</span>
                    </label>
                </div>
                <div className="flex flex-col space-y-2">
                    <button
                        onClick={handleSave}
                        className="bg-indigo-600 text-white w-full py-2 rounded font-medium hover:bg-indigo-700 transition-colors"
                    >Save Settings</button>
                    <button
                        onClick={handleClear}
                        className="bg-red-500 text-white w-full py-2 rounded font-medium hover:bg-red-600 transition-colors"
                    >Clear All Data</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
