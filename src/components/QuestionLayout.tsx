import { Option, Question } from '@/utils/quiz/types';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import QuizProgress from './QuizProgress';
import Button from './Button';
import CurrentQuestion from './CurrentQuestion';
import { useUpdateQuizAttempt } from '@/services/mutation';
import ResultLayout from './ResultLayout';

interface QuestionLayoutProps {
    questions: Question[];
    attemptId: string;
}

export default function QuestionLayout({ questions, attemptId }: QuestionLayoutProps) {
    // mutation to start Quiz
    const updateQuizAttempt = useUpdateQuizAttempt();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const [timer, setTimer] = useState(0); // Timer state

    console.log(timer);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        // Start timer only if there are questions left
        if (currentQuestion <= questions.length - 1) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1); // Increment timer every second
            }, 1000);
        }
        // Clear the interval on component unmount or when the condition changes
        return () => clearInterval(interval);
    }, [currentQuestion]);

    function handleUpdateQuizAttempt() {
        const questionId: string = questions[currentQuestion].id;

        updateQuizAttempt.mutate({
            attemptId: attemptId,
            questionId: questionId,
            selectedOptions: selectedOptions,
            timeTaken: timer,
            quizCompleted: currentQuestion == questions.length - 1 ? true : false
        }, {
            onSettled: (data, error) => {
                if (error) return;
                if (data) {
                    setCurrentQuestion((prev) => prev + 1);
                    setTimer(0);
                    setSelectedOptions([]);
                }
            }
        })
    }

    return (
        <div className='h-full w-full bg-primary relative overflow-hidden'>
            <div className='w-full absolute -top-2'>
                <Image
                    src="/assets/questionLayout/celebrate.png"
                    width={500}
                    height={500}
                    alt="celebrate"
                    className='object-none !w-full'
                />
            </div>
            <div className='w-full h-[85%] bg-white bottom-0 absolute rounded-t-[32px] p-4'>
                {currentQuestion <= questions.length - 1 ? (
                    <div className='w-full h-full relative'>
                        <QuizProgress
                            currentQuestion={currentQuestion}
                            totalQuestions={questions.length}
                        />
                        <CurrentQuestion
                            question={questions[currentQuestion]}
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                        />
                        <div className='w-full flex justify-center'>

                            <div className='bottom-2 w-[90%] fixed'>
                                <Button text='Next' type='button' onClick={handleUpdateQuizAttempt} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='w-full h-full relative'>
                        <ResultLayout attemptId={attemptId} />
                        <div className='absolute bottom-0 w-full'>
                            <Button text='Start Again' type='button' onClick={() => window.location.reload()} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
