import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { loadUserData, saveUserData } from './services/dataService';
import { useApp } from './context'; // Replaces useAuth

const UserDataContext = createContext();

const isSameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
};

export const UserDataProvider = ({ children }) => {
    // Map existing useApp user to this context
    const { user } = useApp();

    const [history, setHistory] = useState([]);
    const [moods, setMoods] = useState([]);
    const [reading, setReading] = useState([]);
    const [favoriteWellnessSkills, setFavoriteWellnessSkills] = useState([]);
    const [gratitudeJournal, setGratitudeJournal] = useState([]);
    const [generatedQuizzes, setGeneratedQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const clearUserData = () => {
        setHistory([]);
        setMoods([]);
        setReading([]);
        setFavoriteWellnessSkills([]);
        setGratitudeJournal([]);
        setGeneratedQuizzes([]);
    };

    // Load data when user logs in, clear data on logout
    useEffect(() => {
        const handleAuthChange = async () => {
            setIsLoading(true);
            if (user) {
                const data = await loadUserData(user.id);
                setHistory(data.history || []);
                setMoods(data.moods || []);
                setReading(data.reading || []);
                setFavoriteWellnessSkills(data.favoriteWellnessSkills || []);
                setGratitudeJournal(data.gratitudeJournal || []);
                setGeneratedQuizzes(data.generatedQuizzes || []);
            } else {
                clearUserData();
            }
            setIsLoading(false);
        };
        handleAuthChange();
    }, [user]);

    // Persist data whenever it changes
    useEffect(() => {
        // We don't want to save on initial load or if there's no user
        if (!isLoading && user) {
            saveUserData(user.id, { history, moods, reading, favoriteWellnessSkills, gratitudeJournal, generatedQuizzes });
        }
    }, [user, history, moods, reading, favoriteWellnessSkills, gratitudeJournal, generatedQuizzes, isLoading]);

    const moodStreak = useMemo(() => {
        if (moods.length === 0) return 0;

        const sortedMoods = [...moods].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        let streak = 0;
        let today = new Date();

        const latestDate = new Date(sortedMoods[0].date);
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (isSameDay(latestDate, today) || isSameDay(latestDate, yesterday)) {
            streak = 1;
            let lastDate = latestDate;

            for (let i = 1; i < sortedMoods.length; i++) {
                const currentDate = new Date(sortedMoods[i].date);
                const expectedPreviousDate = new Date(lastDate);
                expectedPreviousDate.setDate(lastDate.getDate() - 1);

                if (isSameDay(currentDate, expectedPreviousDate)) {
                    streak++;
                } else if (!isSameDay(currentDate, lastDate)) {
                    break;
                }
                lastDate = currentDate;
            }
        }

        return streak;

    }, [moods]);

    const addResult = (result) => {
        setHistory(prev => [result, ...prev]);
    };

    const addMood = (mood) => {
        const newMood = {
            id: Date.now(),
            ...mood
        };
        setMoods(prev => [newMood, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };

    const updateMoodTags = (moodId, tags) => {
        setMoods(prev => prev.map(m => m.id === moodId ? { ...m, tags } : m));
    };

    const toggleReading = (post) => {
        setReading(prev =>
            prev.some(p => p.id === post.id)
                ? prev.filter(p => p.id !== post.id)
                : [{ ...post, userNote: '', tags: post.tags || [] }, ...prev]
        );
    };

    const updateNoteOnSavedPost = (postId, note) => {
        setReading(prev => prev.map(p => p.id === postId ? { ...p, userNote: note } : p));
    };

    const updatePostTags = (postId, tags) => {
        setReading(prev => prev.map(p => p.id === postId ? { ...p, tags } : p));
    };

    const toggleFavoriteWellnessSkill = (skillId) => {
        setFavoriteWellnessSkills(prev =>
            prev.includes(skillId)
                ? prev.filter(id => id !== skillId)
                : [skillId, ...prev]
        );
    };

    const addGratitudeEntry = (content) => {
        const newEntry = {
            id: `gratitude-${Date.now()}`,
            date: new Date().toISOString(),
            content: content,
        };
        setGratitudeJournal(prev => [newEntry, ...prev]);
    };

    const addGeneratedQuiz = (quiz) => {
        setGeneratedQuizzes(prev => [quiz, ...prev]);
    };

    const value = {
        history,
        moods,
        reading,
        favoriteWellnessSkills,
        gratitudeJournal,
        generatedQuizzes,
        addResult,
        addMood,
        updateMoodTags,
        toggleReading,
        updateNoteOnSavedPost,
        updatePostTags,
        toggleFavoriteWellnessSkill,
        addGratitudeEntry,
        addGeneratedQuiz,
        moodStreak,
        isLoading,
    };

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (context === undefined) {
        throw new Error('useUserData must be used within a UserDataProvider');
    }
    return context;
};
