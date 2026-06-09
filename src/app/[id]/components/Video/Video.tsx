import React from 'react';

import styles from './styles.module.css';

type Props = {
    src: string;
    name: string;
}

export const Video = (props: Props) => {
    return (
        <article className={styles.card}>
            <div className={styles.videoFrame}>
                <iframe
                    className={styles.video}
                    title={props.name}
                    allow="accelerometer; gyroscope; picture-in-picture; fullscreen"
                    src={props.src}
                />
            </div>

            <h3 className={styles.title}>
                {props.name}
            </h3>
        </article>
    );
};
