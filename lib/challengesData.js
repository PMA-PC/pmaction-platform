export const CHALLENGES = [
    {
        id: 'focus_flow_builder_2',
        title: 'Focus Flow Builder 2.0',
        duration: 30,
        category: 'Focus',
        group: 'focus', // Group 2: Build Focus
        description: 'A 30-day research-backed gamification challenge to boost focus, motivation, and follow-through.',
        tags: ['ADHD', 'Focus', 'Habits'],
        phases: [
            {
                id: 1,
                title: 'Awareness & Set-Up',
                days: [1, 7],
                description: 'Create safe focus environment and improve task awareness.'
            },
            {
                id: 2,
                title: 'Daily Dopamine Wins',
                days: [8, 15],
                description: 'Build short tasks into enjoyable rituals.'
            },
            {
                id: 3,
                title: 'Flow Extension',
                days: [16, 23],
                description: 'Increase focus duration, double sessions.'
            },
            {
                id: 4,
                title: 'Integration',
                days: [24, 30],
                description: 'Link focus habits to broader life goals.'
            }
        ],
        tasks: {
            1: { title: 'Notice Distractions', description: 'Notice distractions and write them down.', xp: 10, type: 'journal' },
            2: { title: 'Focus Space', description: 'Choose one focus-friendly space.', xp: 15, type: 'action' },
            3: { title: 'Satisfying Task', description: 'Identify your most satisfying task.', xp: 20, type: 'journal' },
            4: { title: '5-Min Timer', description: 'Set focus timer to 5 minutes, reflect after.', xp: 25, type: 'timer', duration: 5 },
            5: { title: '5-Min Timer (Again)', description: 'Set focus timer to 5 minutes, reflect after.', xp: 25, type: 'timer', duration: 5 },
            6: { title: 'Best Focus Time', description: 'Journal your best focus time of day.', xp: 15, type: 'journal' },
            7: { title: 'Reward Reflection', description: 'Reflect on your first week.', xp: 50, type: 'reflection', badge: 'self_aware_starter' },

            8: { title: '10-Min Joy Task', description: 'Do a 10-minute task you enjoy.', xp: 25, type: 'timer', duration: 10 },
            9: { title: '10-Min Joy Task', description: 'Do a 10-minute task you enjoy.', xp: 25, type: 'timer', duration: 10 },
            10: { title: '10-Min Joy Task', description: 'Do a 10-minute task you enjoy.', xp: 25, type: 'timer', duration: 10 },
            11: { title: 'Habit Stack', description: 'Stack a new habit onto an existing one.', xp: 30, type: 'action' },
            12: { title: 'Visual Tracker', description: 'Create a visual tracker for progress.', xp: 30, type: 'action' },
            13: { title: 'Double Focus', description: 'Complete two focus sessions today.', xp: 40, type: 'timer_multi', count: 2 },
            14: { title: 'Double Focus', description: 'Complete two focus sessions today.', xp: 40, type: 'timer_multi', count: 2 },
            15: { title: 'Celebration Checkpoint', description: 'Celebrate your momentum!', xp: 100, type: 'celebration', badge: 'momentum_maker' },

            16: { title: 'Mindful Break', description: 'Practice one mindful break (stretch or breathe).', xp: 20, type: 'action' },
            17: { title: '15-Min x2', description: 'Two 15-minute focus sessions.', xp: 50, type: 'timer_multi', count: 2, duration: 15 },
            18: { title: '15-Min x2', description: 'Two 15-minute focus sessions.', xp: 50, type: 'timer_multi', count: 2, duration: 15 },
            19: { title: 'Share Progress', description: 'Share your progress with a buddy.', xp: 75, type: 'social' },
            20: { title: 'Accountability Tool', description: 'Introduce an accountability tool (timer, AI coach).', xp: 60, type: 'action' },
            21: { title: 'Accountability Tool', description: 'Use your accountability tool.', xp: 60, type: 'action' },
            22: { title: 'Accountability Tool', description: 'Use your accountability tool.', xp: 60, type: 'action' },
            23: { title: 'Reflection Session', description: 'Reflect on your flow extension.', xp: 80, type: 'reflection', badge: 'resilient_focuser' },

            24: { title: 'Plan Weekly Goals', description: 'Plan your goals for the upcoming week.', xp: 50, type: 'planning' },
            25: { title: 'Focus + Mindfulness', description: 'Combine focus session with a mindfulness check-in.', xp: 75, type: 'action' },
            26: { title: 'Focus + Mindfulness', description: 'Combine focus session with a mindfulness check-in.', xp: 75, type: 'action' },
            27: { title: 'Achievement Playlist', description: 'Create a personal achievement music playlist.', xp: 100, type: 'creative' },
            28: { title: 'Listen to Playlist', description: 'Use your playlist during a task.', xp: 100, type: 'action' },
            29: { title: 'Invite a Friend', description: 'Invite a friend to join a challenge.', xp: 150, type: 'social' },
            30: { title: 'Grand Celebration', description: 'You did it! Celebrate your 30-day journey.', xp: 500, type: 'celebration', badge: 'flow_master' }
        }
    },
    // 1. Physiology First (5 Days) - Active Tool Acquisition
    {
        id: 'physiology_first',
        title: 'Physiology First',
        duration: 5,
        category: 'Well-Being',
        group: 'balance', // Group 1: Restore Balance
        description: 'Master the "Big Three" biological foundations: Sleep, Diet, and Movement.',
        tags: ['Health', 'Sleep', 'Energy'],
        phases: [
            { id: 1, title: 'The Foundation', days: [1, 5], description: 'Build your biological base.' }
        ],
        tasks: {
            1: { title: 'Sleep Audit', description: 'Track your sleep quality vs. quantity tonight.', xp: 20, type: 'journal' },
            2: { title: 'Hydration Boost', description: 'Drink a glass of water first thing in the morning.', xp: 20, type: 'action' },
            3: { title: 'Movement Snack', description: 'Do 5 minutes of movement (walk, stretch, dance).', xp: 20, type: 'action' },
            4: { title: 'Fiber Fuel', description: 'Eat one serving of fruit or vegetables today.', xp: 20, type: 'action' },
            5: { title: 'Foundation Review', description: 'Reflect on how your body feels after 5 days.', xp: 50, type: 'reflection', badge: 'physiology_first' }
        }
    },
    // 2. Crisis Control (5 Days) - Active Tool Acquisition
    {
        id: 'crisis_control',
        title: 'Crisis Control',
        duration: 5,
        category: 'Emotional Regulation',
        group: 'balance', // Group 1: Restore Balance
        description: 'Master the "Emergency Brake" for overwhelming emotions using TIPP and STOP.',
        tags: ['Emotion', 'Crisis', 'Grounding'],
        phases: [
            { id: 1, title: 'Emergency Tools', days: [1, 5], description: 'Learn to stop the spiral.' }
        ],
        tasks: {
            1: { title: 'Learn TIPP', description: 'Read the TIPP protocol (Temperature, Intense Exercise, Paced Breathing, Paired Muscle Relaxation).', xp: 20, type: 'reading' },
            2: { title: 'Practice Temperature', description: 'Splash cold water on your face or hold an ice cube.', xp: 20, type: 'action' },
            3: { title: 'Practice Paced Breathing', description: 'Breathe in for 4, out for 6. Do this for 1 minute.', xp: 20, type: 'timer', duration: 1 },
            4: { title: 'Learn STOP', description: 'Read the STOP skill (Stop, Take step back, Observe, Proceed).', xp: 20, type: 'reading' },
            5: { title: 'Crisis Plan', description: 'Write down your personal Crisis Plan using these tools.', xp: 50, type: 'journal', badge: 'crisis_controller' }
        }
    },
    // 3. The Thought Detective (5 Days) - Active Tool Acquisition
    {
        id: 'thought_detective',
        title: 'The Thought Detective',
        duration: 5,
        category: 'CBT / Mindset',
        group: 'identity', // Group 3: Find Yourself
        description: 'Catch and reframe "Ants" (Automatic Negative Thoughts) using CBT.',
        tags: ['CBT', 'Mindset', 'Anxiety'],
        phases: [
            { id: 1, title: 'Catching ANTs', days: [1, 5], description: 'Identify and challenge negative thoughts.' }
        ],
        tasks: {
            1: { title: 'Spot the ANT', description: 'Identify one Automatic Negative Thought today.', xp: 20, type: 'journal' },
            2: { title: 'Name the Distortion', description: 'Is it "All-or-Nothing" or "Catastrophizing"?', xp: 20, type: 'journal' },
            3: { title: 'The Courtroom', description: 'Write down evidence FOR and AGAINST the thought.', xp: 30, type: 'journal' },
            4: { title: 'Reframe It', description: 'Rewrite the thought in a more balanced way.', xp: 30, type: 'journal' },
            5: { title: 'Detective Badge', description: 'Reflect on a thought you successfully reframed.', xp: 50, type: 'reflection', badge: 'thought_detective' }
        }
    },
    // 4. The CEO Brain (5 Days) - Active Tool Acquisition
    {
        id: 'ceo_brain',
        title: 'The CEO Brain',
        duration: 5,
        category: 'Executive Function',
        group: 'focus', // Group 2: Build Focus
        description: 'Tools to externalize memory and manage time blindness.',
        tags: ['Productivity', 'Planning', 'Focus'],
        phases: [
            { id: 1, title: 'Externalizing', days: [1, 5], description: 'Get it out of your head.' }
        ],
        tasks: {
            1: { title: 'Brain Dump', description: 'Write down EVERYTHING currently in your working memory.', xp: 20, type: 'journal' },
            2: { title: 'Visual Timer', description: 'Use a visual timer for one task today.', xp: 20, type: 'action' },
            3: { title: 'The Launchpad', description: 'Set up a "Launchpad" by the door for keys/wallet.', xp: 20, type: 'action' },
            4: { title: 'Rule of 3', description: 'Pick only 3 "Must Do" tasks for today.', xp: 20, type: 'planning' },
            5: { title: 'CEO Review', description: 'Review your week. What tool helped most?', xp: 50, type: 'reflection', badge: 'ceo_brain' }
        }
    },
    // 5. Social Navigator (3 Days) - Active Tool Acquisition
    {
        id: 'social_navigator',
        title: 'Social Navigator',
        duration: 3,
        category: 'Relationships',
        group: 'identity', // Group 3: Find Yourself
        description: 'Protect relationships with Boundaries and "I" Statements.',
        tags: ['Relationships', 'Communication', 'Boundaries'],
        phases: [
            { id: 1, title: 'Connection Tools', days: [1, 3], description: 'Communicate clearly and safely.' }
        ],
        tasks: {
            1: { title: 'The "I" Statement', description: 'Practice writing an "I feel X when Y" statement.', xp: 20, type: 'journal' },
            2: { title: 'Boundary Check', description: 'Identify one place you need better boundaries.', xp: 20, type: 'journal' },
            3: { title: 'Navigator Badge', description: 'Commit to using one "I" statement this week.', xp: 50, type: 'action', badge: 'social_navigator' }
        }
    },
    // 6. Authentic Self (5 Days) - Active Tool Acquisition
    {
        id: 'authentic_self',
        title: 'Authentic Self',
        duration: 5,
        category: 'Identity',
        group: 'identity', // Group 3: Find Yourself
        description: 'Unmasking, Strengths, and Self-Advocacy.',
        tags: ['Identity', 'Neurodiversity', 'Self-Esteem'],
        phases: [
            { id: 1, title: 'Unmasking', days: [1, 5], description: 'Discover your true operating manual.' }
        ],
        tasks: {
            1: { title: 'Strengths Inventory', description: 'List 3 things your ADHD brain does well.', xp: 20, type: 'journal' },
            2: { title: 'Sensory Audit', description: 'What sensory inputs drain you? What soothes you?', xp: 20, type: 'journal' },
            3: { title: 'Stimming Permission', description: 'Allow yourself to stim (fidget, pace, hum) freely for 5 mins.', xp: 20, type: 'action' },
            4: { title: 'Masking Check', description: 'Notice one time you "masked" today. How did it feel?', xp: 20, type: 'journal' },
            5: { title: 'Authenticity Pledge', description: 'Write a permission slip to be yourself.', xp: 50, type: 'reflection', badge: 'authentic_self' }
        }
    },
    // 7. ADHD Foundations (30 Days) - Theory Deep Dive
    {
        id: 'foundations_theory',
        title: 'ADHD Foundations',
        duration: 30,
        category: 'Mastery', // Renamed from Education
        group: 'focus', // Group 2: Build Focus
        description: 'Deep dive into the neuroscience of ADHD: Physiology, Executive Function, and the "Ferrari Brain".',
        tags: ['Education', 'Neuroscience', 'Theory'],
        phases: [
            { id: 1, title: 'Neurobiology 101', days: [1, 7], description: 'Understanding the hardware.' },
            { id: 2, title: 'Executive Functions', days: [8, 14], description: 'The CEO of the brain.' },
            { id: 3, title: 'The Dopamine Link', days: [15, 21], description: 'Motivation and chemistry.' },
            { id: 4, title: 'Building the Base', days: [22, 30], description: 'Sleep, Diet, and Movement theory.' }
        ],
        tasks: {
            1: { title: 'Read: The Ferrari Brain', description: 'Read about the Prefrontal Cortex vs. Amygdala.', xp: 30, type: 'reading' },
            7: { title: 'Week 1 Review', description: 'Summarize your key takeaways.', xp: 50, type: 'reflection' },
            15: { title: 'Read: Dopamine', description: 'Understand the "Reward Deficiency Syndrome".', xp: 30, type: 'reading' },
            30: { title: 'Foundations Exam', description: 'Complete the Foundations knowledge check.', xp: 100, type: 'quiz', badge: 'foundations_scholar' }
        }
    },
    // 8. Emotional Mastery (30 Days) - Theory Deep Dive
    {
        id: 'emotional_mastery',
        title: 'Emotional Mastery',
        duration: 30,
        category: 'Mastery', // Renamed from Education
        group: 'balance', // Group 1: Restore Balance
        description: 'Deep dive into Emotional Regulation, RSD, Anxiety, and Identity.',
        tags: ['Emotion', 'RSD', 'Psychology'],
        phases: [
            { id: 1, title: 'Emotional Dysregulation', days: [1, 7], description: 'Why feelings are so big.' },
            { id: 2, title: 'Understanding RSD', days: [8, 14], description: 'The pain of rejection.' },
            { id: 3, title: 'Anxiety vs. ADHD', days: [15, 21], description: 'Untangling the overlap.' },
            { id: 4, title: 'Identity & Unmasking', days: [22, 30], description: 'Living authentically.' }
        ],
        tasks: {
            1: { title: 'Read: Emotional Dysregulation', description: 'It is not a character flaw.', xp: 30, type: 'reading' },
            8: { title: 'Read: What is RSD?', description: 'Rejection Sensitive Dysphoria explained.', xp: 30, type: 'reading' },
            15: { title: 'Read: The Anxiety Link', description: 'Cognitive Distortions and ADHD.', xp: 30, type: 'reading' },
            30: { title: 'Mastery Capstone', description: 'Reflect on your emotional journey.', xp: 100, type: 'reflection', badge: 'emotional_master' }
        }
    },
    // 9. Neurodiversity Advantage Training (7 Days) - Identity & Strengths
    {
        id: 'neurodiversity_advantage_7_day',
        title: 'Neurodiversity Advantage Training',
        duration: 7,
        category: 'Identity',
        group: 'identity', // Group 3: Find Yourself
        description: 'A 7-day intensive journey exploring how autistic people benefit the world, focusing on strengths and positive contributions.',
        tags: ['Autism', 'Neurodiversity', 'Strengths', 'Identity'],
        phases: [
            { id: 1, title: 'Strengths & Perspectives', days: [1, 7], description: 'Discovering the power of neurodivergent thinking.' }
        ],
        tasks: {
            1: { title: 'Day 1: Foundations', description: 'Unique Strengths & Perspectives.', xp: 100, type: 'reading' },
            2: { title: 'Day 2: Logical Thinking', description: 'Deep Dive into Logical Thinking & Problem-Solving.', xp: 100, type: 'reading' },
            3: { title: 'Day 3: Authenticity', description: 'Authenticity & Integrity in Action.', xp: 100, type: 'reading' },
            4: { title: 'Day 4: Empathy', description: 'Empathy & Connection (Reimagined).', xp: 100, type: 'reading' },
            5: { title: 'Day 5: Creativity', description: 'Creativity & Special Interests as Superpowers.', xp: 100, type: 'reading' },
            6: { title: 'Day 6: Workplace & Community', description: 'Contributions to Workplace & Community.', xp: 100, type: 'reading' },
            7: { title: 'Day 7: Integration', description: 'A Neurodiverse Future.', xp: 100, type: 'reflection', badge: 'neurodiversity_advocate' }
        }
    }
];
