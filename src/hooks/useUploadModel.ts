import {useEffect, useState} from 'react';
import {ObjectDetection} from '@tensorflow-models/coco-ssd';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

export default () => {
    const [model, setModel] = useState<{ model: ObjectDetection | null, isLoading: boolean }>({
        model: null,
        isLoading: true
    });

    useEffect(() => {
        async function init() {
            const model = await cocoSsd.load();
            setModel(() => ({model, isLoading: false}));
        }
        init();
    }, []);

    return model;
}