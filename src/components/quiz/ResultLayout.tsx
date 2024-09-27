import React from 'react'
import ResultMeter from '../ResultMeter';
import { useGetQuizAttempt } from '@/services/queries';
import { GetQuizAttemptResponse } from '@/services/types';
import ReviewBox from '../ReviewBox';

interface ResultLayoutProps {
    attemptId: string;
}

export default function ResultLayout({ attemptId }: ResultLayoutProps) {
    // get QuizAttempt fron quizId
    const { data: quizAttemptData } = useGetQuizAttempt({ attemptId }) as { data: GetQuizAttemptResponse };

    return (
        quizAttemptData && (
            <div className='w-full h-full flex flex-col gap-y-6 items-center'>
                <p className='font-extrabold text-3xl'>Your result</p>
                <ResultMeter percentage={(quizAttemptData.quizAttempt.totalCorrect / quizAttemptData.quizAttempt.userResponses.length) * 100} />
                <div className='mt-6 w-full flex flex-col gap-y-4'>
                    <ReviewBox
                        totalCount={quizAttemptData.quizAttempt.totalCorrect}
                        correctBox={true}
                    />
                    <ReviewBox
                        totalCount={quizAttemptData.quizAttempt.userResponses.length - quizAttemptData.quizAttempt.totalCorrect}
                        correctBox={false}
                    />
                </div>
            </div>
        )
    )
}
