import React from 'react';
import {DetectedObject} from '@tensorflow-models/coco-ssd';

export default function RenderPredictions({predictions}: { predictions: DetectedObject[] }) {
    return (
        <>
            {predictions.map((object, i) => (
                <div
                    key={i}
                    style={{
                        border: '2px solid red',
                        position: 'absolute',
                        top: object.bbox[1],
                        left: object.bbox[0],
                        width: object.bbox[2],
                        height: object.bbox[3]
                    }}>
                                    <span style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        background: 'red',
                                        color: '#fff'
                                    }}>{object.class}</span>
                </div>
            ))}
        </>
    );
}