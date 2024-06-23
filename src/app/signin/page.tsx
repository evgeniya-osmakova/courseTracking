'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent, useContext, useEffect } from 'react';

import { Loading } from '@/app/components/Loading/Loading';
import { AuthContext } from '@/AuthProvider';
import { signIn } from '@/firebase/auth/signin';

import styles from './styles.module.css';


function Page() {
    const context = useContext(AuthContext);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);

    const router = useRouter();

    useEffect(() => {
        if (context?.user && !context?.loading) {
            router.push('/');
        }
    }, [router, context]);

    if (!context) {
        return (
            <Loading />
        );
    }

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (error) {
            setError(false);
        }

        try {
            const { error: fireBaseError } = await signIn(email, password);

            if (fireBaseError) {
                setError(true);

                return;
            }
        } catch (err) {
            setError(true);
        }

        return router.push('/');
    };

    return (
        <main className={styles.wrapper}>
                <h1 className={styles.header}>
                    Sign in
                </h1>

                <form
                    onSubmit={handleForm}
                    className={styles.form}
                >
                    <label htmlFor="email">
                        <p>Email</p>

                        <input
                            className={styles.field}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@mail.com"
                            autoComplete="true"
                        />
                    </label>

                    <label htmlFor="password">
                        <p>Password</p>

                        <input
                            className={styles.field}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            autoComplete="true"
                        />
                    </label>

                    <button
                        className={styles.button}
                        type="submit"
                        disabled={context.loading}
                    >
                        Sign in
                    </button>
                </form>

                {error && (
                    <div className={styles.error}>
                        The error occurred, try again
                    </div>
                )}
        </main>
    );
}

export default Page;
