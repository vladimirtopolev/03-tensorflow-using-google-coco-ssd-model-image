import React, {useRef} from 'react';
import styles from './InputFile.module.scss';

export type ImageType = {
    src: string,
    width: number,
    height: number,
    image: HTMLImageElement
};

type InputFileProps = {
    setImage: (image: ImageType) => void,
    width?: number
}

export default ({setImage}: InputFileProps) => {
    const idRef = useRef(`id-${Math.floor(Math.random() * 10000)}`)
    return (
        <div className={styles.InputFile}>
            <label
                className={styles.InputFile__label}
                htmlFor={idRef.current}>
                Upload image
            </label>
            <input
                id={idRef.current}
                className={styles.InputFile__input}
                type="file"
                onChange={(e) => {
                    if (e.target.files) {
                        const image = new Image();
                        const objectUrl = URL.createObjectURL(e.target.files[0]);
                        image.onload = () => {
                            setImage({src: objectUrl, width: image.width, height: image.height, image});
                        };
                        image.src = objectUrl;
                    }
                }}/>
        </div>
    );
}