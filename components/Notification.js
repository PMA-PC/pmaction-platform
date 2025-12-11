import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const notify = (message, type = 'info') => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            {notification && (
                <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 z-50 ${notification.type === 'error' ? 'bg-red-500' :
                        notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}>
                    {notification.message}
                </div>
            )}
        </NotificationContext.Provider>
    );
};
