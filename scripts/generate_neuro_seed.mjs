import fs from 'fs';
import { PROGRAM_DAYS, APP_TITLE } from '../data/neurodiversity-advantage.js';

const generateSeed = () => {
    let sql = `-- Seed for ${APP_TITLE}\n`;

    // 1. Insert Challenge
    const challengeSlug = 'neurodiversity-advantage-7-day';
    const challengeId = 'neurodiversity_advantage'; // Simplified ID for reference

    // We need a specific UUID or let Postgres generate one. 
    // Ideally we fetch it or use a variable. 
    // Let's use a DO block to handle variables.

    sql += `
DO $$
DECLARE
    v_challenge_id UUID;
    v_json_content JSONB;
BEGIN
    -- Check if challenge exists, if not insert. 
    -- Note: Removed 'duration' as it does not exist.
    -- Added 'category' as it is required (NOT NULL).
    INSERT INTO challenges (slug, title, description, category, "group", tags)
    VALUES (
        '${challengeSlug}',
        '${APP_TITLE}',
        'A 7-day intensive journey exploring how autistic people benefit the world, focusing on strengths and positive contributions.',
        'Identity',
        'identity',
        ARRAY['Autism', 'Neurodiversity', 'Strengths', 'Identity']
    )
    ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description
    RETURNING id INTO v_challenge_id;

    -- If we updated and didn't get an ID back (shouldn't happen with RETURNING, but just in case of race conditions or no update needed logic which RETURNING handles fine usually)
    IF v_challenge_id IS NULL THEN
        SELECT id INTO v_challenge_id FROM challenges WHERE slug = '${challengeSlug}';
    END IF;

    -- DELETE existing tasks to ensure clean slate for this challenge
    DELETE FROM challenge_tasks WHERE challenge_id = v_challenge_id;
`;

    // 2. Insert Tasks
    PROGRAM_DAYS.forEach((day, index) => {
        const dayNum = index + 1;
        // Construct the module content. 
        // The app expects 'content_data' to have a 'modules' array.
        // We will wrap the day content into a single module.

        const moduleContent = {
            name: day.title,
            estimatedReadTime: "15 min",
            points: 100,
            content: {
                overview: day.intro,
                sections: day.sections, // This matches the structure we want
                // Add explicit intro/topics for backward compatibility if needed, but the new component handles sections.
                // We'll keep it clean.
            },
            quiz: [], // Add dummy quiz or leave empty? The UI handles empty quiz.
            exercise: {
                title: "Daily Reflection",
                instructions: day.conclusion,
                prompts: ["How does today's topic resonate with your personal experience?", "What is one actionable step you can take today?"]
            }
        };

        const taskTitle = day.title; // Or "Day 1"
        const instructions = day.intro.substring(0, 150) + "..."; // Short preview

        // Wrap in modules array
        const fullContentData = {
            modules: [moduleContent]
        };

        const jsonStr = JSON.stringify(fullContentData).replace(/'/g, "''"); // Escape single quotes for SQL

        sql += `
    -- Day ${dayNum}
    INSERT INTO challenge_tasks (challenge_id, day_number, title, instructions, points, content_data, created_at)
    VALUES (
        v_challenge_id,
        ${dayNum},
        '${taskTitle.replace(/'/g, "''")}',
        '${instructions.replace(/'/g, "''")}',
        100,
        '${jsonStr}'::jsonb,
        NOW()
    );
`;
    });

    sql += `
END $$;
`;

    fs.writeFileSync('seed_neurodiversity_advantage.sql', sql);
    console.log('Seed file generated: seed_neurodiversity_advantage.sql');
};

generateSeed();
