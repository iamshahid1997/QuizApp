import { Option, Question } from '@/utils/quiz/types';
import Image from 'next/image';
import QuizProgress from '../QuizProgress';
import Button from '../Button';
import CurrentQuestion from './CurrentQuestion';
import ResultLayout from './ResultLayout';
import { useQuizAttempt } from '@/customHooks/useQuizAttempt';
import { useTimer } from '@/customHooks/useTimer';

interface QuestionLayoutProps {
    questions: Question[];
    attemptId: string;
}

export default function QuestionLayout({ questions, attemptId }: QuestionLayoutProps) {
    const { currentQuestion, selectedOptions, setSelectedOptions, handleUpdateQuizAttempt, goToNextQuestion } = useQuizAttempt(questions, attemptId);
    
    // Use the timer hook, which starts when there are questions left
    const { timer, resetTimer } = useTimer(currentQuestion <= questions.length - 1);

    // Function to handle the 'Next' button click
    const onNextClick = () => {
        handleUpdateQuizAttempt(timer, () => {
            goToNextQuestion(); // Proceed to next question
            resetTimer(); // Reset the timer for the next question
        });
    };

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
                                <Button text='Next' type='button' onClick={onNextClick} />
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
    );
}


