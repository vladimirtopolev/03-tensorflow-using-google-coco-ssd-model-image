import React, {useEffect, useRef, useState} from 'react';
import {DetectedObject} from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import useUploadModel from './hooks/useUploadModel';
import RenderPredictions from './components/RenderPredictions';
import InputFile from './components/InputFile';
import {Box} from '@material-ui/core';

export default function CocoSsdImageDetection() {
    const {model, isLoading} = useUploadModel();
    const [image, setImage] = useState<{ src: string, width: number, height: number }>();
    const [predictions, setPredictions] = useState<DetectedObject[]>([]);

    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        (async function() {
            if (image && imageRef.current && model) {
                const predictions = await model.detect(tf.browser.fromPixels(imageRef.current));
                setPredictions(() => predictions);
            }
        })()
    }, [image, model]);

    return (
        <Box style={{maxWidth: 1000, margin: '0 auto', textAlign: 'center'}}>
            {isLoading && <div>LOADING MODEL....</div>}
            {model && (
                <div>
                    <InputFile setImage={setImage}/>
                    {image && (
                        <div style={{position: 'relative', width: 600, margin: '0 auto'}}>
                            <img src={image.src}
                                 width={600}
                                 height={image.height * (600/image.width)}
                                 ref={imageRef}
                                 alt="preview"/>
                            <RenderPredictions predictions={predictions}/>
                        </div>
                    )}
                </div>
            )}
        </Box>
    );
}

