import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressBarProps {
    currentQuestion: number;
    totalQuestions: number;
}

export default function CircularProgressBar({ currentQuestion, totalQuestions }: CircularProgressBarProps) {
    return (
        <CircularProgressbarWithChildren value={((currentQuestion + 1) / totalQuestions) * 100} styles={buildStyles({
            // Colors
            pathColor: '#44B77B',
            trailColor: '#F3F4FA',
        })}>
            <div className='flex items-end gap-x-1'>
                <p className='text-5xl font-black italic'>{currentQuestion + 1}</p>
                <p className='font-black text-gray-400 italic text-lg'>/{totalQuestions}</p>
            </div>
        </CircularProgressbarWithChildren>
    )
}
