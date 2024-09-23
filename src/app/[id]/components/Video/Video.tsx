import styles from './styles.module.css';
import React from 'react'

type Props = {
    src: string;
    name: string;
}

export const Video: React.FC<Props> = (props) => {
    return (
        <iframe
            className={styles.video}
            title={props.name}
            allow="accelerometer; gyroscope; picture-in-picture; fullscreen"
            width="400"
            height="315"
            src={props.src}
        />
    );
};
