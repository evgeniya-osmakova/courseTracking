'use client';

import React, { FormEvent } from 'react';

import { FormField } from '@/app/signin/components/FormField';
import { useBackendClient } from '@/providers/BackendClientProvider';
import { AppError } from '@/types/Error';
import { toAppError } from '@/utils/error';

import styles from './styles.module.css';


function Page() {
    const backendClient = useBackendClient();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState<AppError | null>(null);

    const runAuthAction = async (action: () => Promise<{ error: AppError | null }>) => {
        if (error) {
            setError(null);
        }

        try {
            const { error: fireBaseError } = await action();

            if (fireBaseError) {
                setError(fireBaseError);
            }
        } catch (e) {
            setError(toAppError(e));
        }
    };

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await runAuthAction(() => backendClient.authentication.signIn(email, password));
    };

    const signInAnonymously = async () => {
        await runAuthAction(() => backendClient.authentication.anonymousSignIn());
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
                        required
                    />

                    <FormField
                        onChange={setPassword}
                        type="password"
                        placeholder="password"
                        label="Password"
                        required
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
                        {error.message}
                    </div>
                )}
        </main>
    );
}

export default Page;
