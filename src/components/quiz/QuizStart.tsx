import Image from 'next/image'
import React from 'react'
import Button from '../Button'

interface QuizStartProps {
    handleStartQuiz: () => void;
}

export default function QuizStart({ handleStartQuiz }: QuizStartProps) {
    return (
        <div className='h-full w-full bg-gradient-to-b from-transparent via-primary/[0.5] to-primary bg-blend-multiply p-4'>
            <div className='flex flex-col justify-between items-center h-full w-full'>
                <div className='flex items-center gap-x-1'>
                    <Image
                        src="/assets/quizStart/logo.png"
                        width={59.84}
                        height={69.61}
                        alt="Picture of the author"
                        className='object-none h-full w-auto'
                    />
                    <p className='font-bold text-2xl'>upraised</p>
                </div>
                <div className='h-[250px] w-[260px] bg-white rounded-full flex items-center justify-center' style={{ boxShadow: "0px 8px 8px 0px rgba(0, 0, 0, 0.1)" }}>
                    <p className='text-secondary font-extrabold text-5xl'>Quiz</p>
                </div>
                <Button
                    type='button'
                    text='Start'
                    onClick={handleStartQuiz}
                />
            </div>
        </div>
    )
}
