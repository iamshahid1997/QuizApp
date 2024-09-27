import React from 'react'
import CircularProgressBar from './CircularProgressBar';

interface QuizProgressProps {
    currentQuestion: number;
    totalQuestions: number;
}

export default function QuizProgress({ currentQuestion, totalQuestions }: QuizProgressProps) {
    return (
        <div className='flex justify-center '>
            <div className='bg-white w-[150px] h-[150px] rounded-full -top-16 absolute p-2'>
                <CircularProgressBar
                    currentQuestion={currentQuestion}
                    totalQuestions={totalQuestions}
                />
            </div>
        </div>
    )
}
