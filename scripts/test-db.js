const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Read .env.local manually
try {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (!fs.existsSync(envPath)) {
        console.error('.env.local file not found!');
        process.exit(1);
    }
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) env[key.trim()] = value.trim();
    });

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase credentials in .env.local');
        process.exit(1);
    }

    console.log('Found credentials for:', supabaseUrl);

    const supabase = createClient(supabaseUrl, supabaseKey);

    async function testSignup() {
        console.log('Attempting signup for testuser99@example.com...');
        const { data, error } = await supabase.auth.signUp({
            email: 'testuser99@example.com',
            password: 'password123'
        });

        if (error) {
            console.error('❌ Signup Failed:', error.message);
        } else {
            console.log('✅ Signup Successful!');
            console.log('User ID:', data.user?.id);
            console.log('Session:', data.session ? 'Active' : 'None (Email confirmation likely required)');
        }
    }

    testSignup();

} catch (err) {
    console.error('Script failed:', err);
}
