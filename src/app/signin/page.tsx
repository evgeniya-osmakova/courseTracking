'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect } from 'react';

import { FormField } from '@/app/signin/components/FormField';
import { useAuthenticationContext } from '@/providers/AuthenticationProvider';
import { useBackendClient } from '@/providers/BackendClientProvider';

import styles from './styles.module.css';


function Page() {
    const { user } = useAuthenticationContext();
    const backendClient = useBackendClient();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);

    const router = useRouter();

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (error) {
            setError(false);
        }

        try {
            const { error: fireBaseError } = await backendClient.authentication.signIn(email, password);

            if (fireBaseError) {
                setError(true);

                return;
            }
        } catch (error) {
            setError(true);

            return;
        }
    };

    const signInAnonymously = async () => {
        if (error) {
            setError(false);
        }

        try {
            const { error: fireBaseError } = await backendClient.authentication.anonymousSignIn();

            if (fireBaseError) {
                setError(true);

                return;
            }
        } catch (error) {
            setError(true);

            return;
        }
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
                    <FormField
                        onChange={setEmail}
                        type="email"
                        placeholder="example@mail.com"
                        label="E-mail"
                    />

                    <FormField
                        onChange={setPassword}
                        type="password"
                        placeholder="password"
                        label="Password"
                    />

                    <button
                        className={styles.button}
                        type="submit"
                    >
                        Sign in
                    </button>
                </form>


                <button
                    className={styles.anonymousButton}
                    onClick={signInAnonymously}
                >
                    Sign in as a guest
                </button>

                {error && (
                    <div className={styles.error}>
                        The error occurred, try again
                    </div>
                )}
        </main>
    );
}

export default Page;
