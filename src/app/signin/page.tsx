'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';

import signIn from '@/firebase/auth/signin';

function Page() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState<null | unknown>(null);

    const router = useRouter();

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (error) {
            setError(null);
        }

        const { error: fireBaseError } = await signIn(email, password);

        if (fireBaseError) {
            setError(fireBaseError);

            return;
        }

        return router.push('/');
    };

    return (
        <main className="wrapper">
            <div className="form-wrapper">
                <h1 className="mt-60 mb-30">
                    Sign in
                </h1>

                <form onSubmit={handleForm} className="form">
                    <label htmlFor="email">
                        <p>Email</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@mail.com"
                        />
                    </label>

                    <label htmlFor="password">
                        <p>Password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                        />
                    </label>

                    <button type="submit">
                        Sign in
                    </button>
                </form>

                {!!error && (
                    <div className="error">The error occurred, try again</div>
                )}
            </div>
        </main>
    );
}

export default Page;
