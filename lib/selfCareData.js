export const SELF_CARE_CATEGORIES = {
    TIME: ['1 min', '3 min', '5 min', '10 min', '20+ min'],
    TAGS: ['kids', 'pets', 'outdoors', 'physical', 'calm'],
    COST: ['Free', '$', '$$']
};

export const SELF_CARE_ACTIVITIES = [
    // 1 Minute (Quick Reset)
    { id: 'sc_breathe_1', label: '3 Deep Breaths', time: '1 min', tags: ['calm', 'physical'], xp: 5, benefit: 'Instantly lowers cortisol levels.' },
    { id: 'sc_water_1', label: 'Drink Water', time: '1 min', tags: ['physical'], xp: 5, benefit: 'Rehydrates your brain for better focus.' },
    { id: 'sc_stretch_1', label: 'Neck Stretch', time: '1 min', tags: ['physical'], xp: 5, benefit: 'Relieves tension from screen time.' },
    { id: 'sc_smile_1', label: 'Force a Smile', time: '1 min', tags: ['calm'], xp: 5, benefit: 'Triggers dopamine release.' },
    { id: 'sc_hug_pet', label: 'Hug Your Pet', time: '1 min', tags: ['pets', 'calm'], xp: 5, benefit: 'Boosts oxytocin, the love hormone.' },
    { id: 'sc_hug_kid', label: 'Hug Your Child', time: '1 min', tags: ['kids', 'calm'], xp: 5, benefit: 'Strengthens connection and reduces stress.' },

    // 3 Minutes (Mindful Pause)
    { id: 'sc_song_3', label: 'Listen to Favorite Song', time: '3 min', tags: ['calm'], xp: 10, benefit: 'Music shifts your emotional state.' },
    { id: 'sc_gratitude_3', label: 'List 3 Gratitudes', time: '3 min', tags: ['calm'], xp: 10, benefit: 'Rewires brain to scan for positives.' },
    { id: 'sc_sun_3', label: 'Step Outside', time: '3 min', tags: ['outdoors', 'physical'], xp: 10, benefit: 'Sunlight regulates circadian rhythm.' },
    { id: 'sc_dance_3', label: 'Dance to One Song', time: '3 min', tags: ['physical', 'kids'], xp: 10, benefit: 'Movement shakes off stagnant energy.' },
    { id: 'sc_pet_play_3', label: 'Play with Pet', time: '3 min', tags: ['pets'], xp: 10, benefit: 'Playfulness reduces anxiety.' },

    // 5 Minutes (Active Break)
    { id: 'sc_walk_5', label: 'Walk Around Block', time: '5 min', tags: ['outdoors', 'physical'], xp: 15, benefit: 'Bilateral stimulation calms the brain.' },
    { id: 'sc_tea_5', label: 'Make Herbal Tea', time: '5 min', tags: ['calm'], xp: 15, benefit: 'The ritual of making tea is grounding.' },
    { id: 'sc_journal_5', label: 'Brain Dump', time: '5 min', tags: ['calm'], xp: 15, benefit: 'Unloads mental clutter onto paper.' },
    { id: 'sc_read_5', label: 'Read 2 Pages', time: '5 min', tags: ['calm'], xp: 15, benefit: 'Short escape reduces stress levels.' },
    { id: 'sc_kids_game_5', label: 'Quick Game with Kids', time: '5 min', tags: ['kids'], xp: 15, benefit: 'Connection builds emotional safety.' },

    // 10 Minutes (Deeper Focus)
    { id: 'sc_meditate_10', label: 'Guided Meditation', time: '10 min', tags: ['calm'], xp: 20, benefit: 'Resets your nervous system.' },
    { id: 'sc_tidy_10', label: 'Tidy One Room', time: '10 min', tags: ['physical'], xp: 20, benefit: 'Outer order creates inner calm.' },
    { id: 'sc_journal_10', label: 'Deep Journaling', time: '10 min', tags: ['calm'], xp: 20, benefit: 'Process emotions and gain clarity.' },
    { id: 'sc_stretch_10', label: 'Full Body Stretch', time: '10 min', tags: ['physical'], xp: 20, benefit: 'Releases stored tension.' },
    { id: 'sc_podcast_10', label: 'Listen to Podcast', time: '10 min', tags: ['calm'], xp: 20, benefit: 'Learn something new or get inspired.' },

    // 20+ Minutes (Deep Restoration)
    { id: 'sc_bath_20', label: 'Warm Bath', time: '20+ min', tags: ['calm', 'physical'], xp: 30, benefit: 'Raises body temp to improve sleep.' },
    { id: 'sc_nap_20', label: 'Power Nap', time: '20+ min', tags: ['physical'], xp: 30, benefit: 'Restores alertness and performance.' },
    { id: 'sc_walk_nature_20', label: 'Nature Walk', time: '20+ min', tags: ['outdoors', 'physical'], xp: 30, benefit: 'Nature lowers blood pressure and stress.' },
    { id: 'sc_call_20', label: 'Call a Friend', time: '20+ min', tags: ['calm'], xp: 30, benefit: 'Social connection is a biological need.' },
    { id: 'sc_hobby_20', label: 'Work on Hobby', time: '20+ min', tags: ['calm'], xp: 30, benefit: 'Flow state increases happiness.' }
];

export const SELF_CARE_CONTENT = {
    QUIZZES: [
        { id: 'quiz_nd', title: 'Neurodiverse Partnership', description: 'Understand your relationship dynamics.', xp: 50 },
        { id: 'quiz_burnout', title: 'Burnout Check', description: 'Are you tired or depleted?', xp: 50 },
        { id: 'quiz_love', title: 'Self-Love Language', description: 'How do you best receive care?', xp: 50 }
    ],
    BLOGS: [
        { id: 'blog_boundaries', title: 'Setting Boundaries', description: 'Why saying "no" is self-care.', readTime: '5 min' },
        { id: 'blog_sleep', title: 'Sleep Hygiene 101', description: 'Better sleep starts tonight.', readTime: '3 min' },
        { id: 'blog_anxiety', title: 'Anxiety Toolkit', description: '5 tools for panic moments.', readTime: '7 min' }
    ]
};
