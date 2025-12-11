export const EMOTIONS = {
    happy: {
        emoji: '😊',
        label: 'Happy',
        color: '#FFD93D',
        textColor: '#B8860B',
        polarity: 'positive',
        secondary: [
            { id: 'joyful', label: 'Joyful' },
            { id: 'content', label: 'Content' },
            { id: 'peaceful', label: 'Peaceful' },
            { id: 'excited', label: 'Excited' },
            { id: 'grateful', label: 'Grateful' }
        ]
    },
    sad: {
        emoji: '😢',
        label: 'Sad',
        color: '#6C9BCF',
        textColor: '#2E5C8A',
        polarity: 'negative',
        secondary: [
            { id: 'down', label: 'Down' },
            { id: 'lonely', label: 'Lonely' },
            { id: 'disappointed', label: 'Disappointed' },
            { id: 'hurt', label: 'Hurt' },
            { id: 'hopeless', label: 'Hopeless' }
        ]
    },
    angry: {
        emoji: '😠',
        label: 'Angry',
        color: '#FF6B6B',
        textColor: '#C92A2A',
        polarity: 'negative',
        secondary: [
            { id: 'frustrated', label: 'Frustrated' },
            { id: 'annoyed', label: 'Annoyed' },
            { id: 'irritated', label: 'Irritated' },
            { id: 'mad', label: 'Mad' },
            { id: 'furious', label: 'Furious' }
        ]
    },
    anxious: {
        emoji: '😰',
        label: 'Anxious',
        color: '#C98BDB',
        textColor: '#8B4FA0',
        polarity: 'negative',
        secondary: [
            { id: 'worried', label: 'Worried' },
            { id: 'nervous', label: 'Nervous' },
            { id: 'stressed', label: 'Stressed' },
            { id: 'overwhelmed', label: 'Overwhelmed' },
            { id: 'scared', label: 'Scared' }
        ]
    },
    tired: {
        emoji: '😴',
        label: 'Tired',
        color: '#95A3A6',
        textColor: '#5A6466',
        polarity: 'negative',
        secondary: [
            { id: 'exhausted', label: 'Exhausted' },
            { id: 'drained', label: 'Drained' },
            { id: 'low-energy', label: 'Low Energy' },
            { id: 'burnt-out', label: 'Burnt Out' },
            { id: 'fatigued', label: 'Fatigued' }
        ]
    },
    neutral: {
        emoji: '😐',
        label: 'Neutral',
        color: '#E0E0E0',
        textColor: '#757575',
        polarity: 'neutral',
        secondary: [
            { id: 'calm', label: 'Calm' },
            { id: 'okay', label: 'Okay' },
            { id: 'meh', label: 'Meh' },
            { id: 'indifferent', label: 'Indifferent' },
            { id: 'balanced', label: 'Balanced' }
        ]
    }
};

// Legacy support if needed, or mapped from above
export const MOOD_EMOJIS = Object.entries(EMOTIONS).map(([key, data], idx) => ({
    name: data.label,
    value: key,
    emoji: data.emoji,
    color: data.color
}));

export const CONTEXT_TAGS = [
    // Positive Tags
    { id: 'win', label: '#win', context: ['positive'] },
    { id: 'gratitude', label: '#gratitude', context: ['positive', 'neutral'] },
    { id: 'progress', label: '#progress', context: ['positive', 'neutral'] },
    { id: 'connection', label: '#connection', context: ['positive', 'neutral'] },

    // Negative/Struggle Tags
    { id: 'trigger', label: '#trigger', context: ['negative'] },
    { id: 'overstimulation', label: '#overstimulation', context: ['negative', 'anxious', 'tired'] },
    { id: 'conflict', label: '#conflict', context: ['negative', 'angry'] },
    { id: 'setback', label: '#setback', context: ['negative', 'sad'] },

    // Neutral/General Tags
    { id: 'reflection', label: '#reflection', context: ['all'] },
    { id: 'health', label: '#health', context: ['all'] },
    { id: 'energy', label: '#energy', context: ['all'] }
];
