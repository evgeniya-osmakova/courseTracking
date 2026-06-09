import { Spinner } from '@/components/Spinner/Spinner';

import styles from './styles.module.css';

export const Loading = () => {
    return (
        <main className={styles.container}>
            <div className={styles.panel}>
                <Spinner />
            </div>
        </main>
    );
};
