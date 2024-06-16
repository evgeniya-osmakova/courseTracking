type Props = {
    src: string;
    name: string;
}

export const Video = (props: Props) => {
    return (
        <iframe
            width="420"
            height="315"
            src={props.src}
        />
    );
};
