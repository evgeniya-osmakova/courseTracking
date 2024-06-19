import styles from './styles.module.css';

type Props = {
    src: string;
    name: string;
}

export const Video = (props: Props) => {
    return (
        <iframe
            className={styles.video}
            title={props.name}
            allow="accelerometer; gyroscope; picture-in-picture; fullscreen"
            width="420"
            height="315"
            src={props.src}
        />
    );
};
