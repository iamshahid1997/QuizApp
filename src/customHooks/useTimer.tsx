import { useState, useEffect } from 'react';

export const useTimer = (startTimer: boolean) => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (startTimer) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1); // Increment timer every second
            }, 1000);
        }

        return () => clearInterval(interval); // Cleanup on unmount
    }, [startTimer]);

    const resetTimer = () => setTimer(0); // Reset the timer

    return { timer, resetTimer };
};
