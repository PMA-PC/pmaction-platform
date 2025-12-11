import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { PROGRAM_DAYS, APP_TITLE } from '../data/neurodiversity-advantage.js';

// Simple .env parser since dotenv might not be installed
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            content.split('\n').forEach(line => {
                const match = line.match(/^([^=]+)=(.*)$/);
                if (match) {
                    const key = match[1].trim();
                    let value = match[2].trim();
                    // Remove quotes if present
                    if (value.startsWith('"') && value.endsWith('"')) {
                        value = value.slice(1, -1);
                    }
                    process.env[key] = value;
                }
            });
            console.log('Loaded .env.local');
        } else {
            console.warn('.env.local not found, relying on existing environment variables.');
        }
    } catch (e) {
        console.error('Error loading .env.local:', e);
    }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL and API Key are required.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log(`Starting seed for "${APP_TITLE}"...`);

    const challengeSlug = 'neurodiversity-advantage-7-day';

    // 1. Upsert Challenge
    const { data: challenge, error: challengeError } = await supabase
        .from('challenges')
        .upsert({
            slug: challengeSlug,
            title: APP_TITLE,
            duration: 7,
            category: 'Identity',
            group: 'identity',
            description: 'A 7-day intensive journey exploring how autistic people benefit the world, focusing on strengths and positive contributions.',
            tags: ['Autism', 'Neurodiversity', 'Strengths', 'Identity']
        }, { onConflict: 'slug' })
        .select()
        .single();

    if (challengeError) {
        console.error('Error upserting challenge:', JSON.stringify(challengeError, null, 2));
        process.exit(1);
    }

    console.log(`Challenge upserted. ID: ${challenge.id}`);

    // 2. Clear existing tasks
    const { error: deleteError } = await supabase
        .from('challenge_tasks')
        .delete()
        .eq('challenge_id', challenge.id);

    if (deleteError) {
        console.error('Error clearing old tasks:', deleteError);
    } else {
        console.log('Cleared existing tasks.');
    }

    // 3. Insert new tasks
    const tasksToInsert = PROGRAM_DAYS.map((day, index) => {
        const moduleContent = {
            name: day.title,
            estimatedReadTime: "15 min",
            points: 100,
            content: {
                overview: day.intro,
                sections: day.sections,
            },
            quiz: [],
            exercise: {
                title: "Daily Reflection",
                instructions: day.conclusion,
                prompts: ["How does today's topic resonate with your personal experience?", "What is one actionable step you can take today?"]
            }
        };

        const taskTitle = day.title;
        const instructions = day.intro.substring(0, 150) + "...";

        return {
            challenge_id: challenge.id,
            day_number: index + 1,
            title: taskTitle,
            instructions: instructions,
            points: 100,
            content_data: { modules: [moduleContent] },
            created_at: new Date().toISOString()
        };
    });

    const { data: insertedTasks, error: insertError } = await supabase
        .from('challenge_tasks')
        .insert(tasksToInsert)
        .select();

    if (insertError) {
        console.error('Error inserting tasks:', insertError);
        process.exit(1);
    }

    console.log(`Successfully inserted ${insertedTasks.length} tasks.`);
    console.log('Seed completed!');
}

seed();
