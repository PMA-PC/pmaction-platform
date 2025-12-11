// Service to handle loading and saving user data
// Currently using LocalStorage as per privacy requirements

const STORAGE_KEY_PREFIX = 'pma_userdata_';

export const loadUserData = async (userId) => {
    if (!userId) return {};

    try {
        const key = `${STORAGE_KEY_PREFIX}${userId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error("Error loading user data from local storage:", error);
        return {};
    }
};

export const saveUserData = async (userId, data) => {
    if (!userId) return;

    try {
        const key = `${STORAGE_KEY_PREFIX}${userId}`;
        const serialized = JSON.stringify(data);
        localStorage.setItem(key, serialized);
    } catch (error) {
        console.error("Error saving user data to local storage:", error);
    }
};
