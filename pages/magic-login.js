import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function MagicLogin() {
    const [status, setStatus] = useState('Idle');
    const router = useRouter();

    useEffect(() => {
        const login = async () => {
            setStatus('Attempting login for testuser@example.com...');
            const { data, error } = await supabase.auth.signInWithPassword({
                email: 'testuser@example.com',
                password: 'password123',
            });

            if (error) {
                setStatus('Error: ' + error.message);
            } else {
                setStatus('Success! Redirecting...');
                setTimeout(() => router.push('/dashboard'), 2000);
            }
        };

        login();
    }, []);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">Magic Login Test</h1>
            <pre className="mt-4 p-4 bg-gray-100 rounded border">{status}</pre>
        </div>
    );
}
