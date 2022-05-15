import { useEffect, useState } from 'react';

const CalculateTimeRead = (textToCalculate: string = '') => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const wpm = 225;
        const words = textToCalculate.trim().split(/\s+/).length;
        setTime(Math.ceil(words / wpm));
    }, [textToCalculate]);

    return [time];
};

export default CalculateTimeRead;
