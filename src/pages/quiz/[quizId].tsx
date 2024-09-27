import QuestionLayout from '@/components/quiz/QuestionLayout';
import QuizStart from '@/components/quiz/QuizStart';
import { useStartQuiz } from '@/services/mutation';
import { useGetQuizQuery } from '@/services/queries';
import { GetQuizResponse } from '@/services/types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

// Here I am considering that the user is already loggedin and I have the userId,
// Also could have done the full login process and got the actual token and used that in the header of the api requests

const userId = 'user1';

export default function QuizPage() {
    const router = useRouter();

    // here i am condiering that the user has already selected a quiz out of a list of quizzes and hence my code starts here with the selecetd quiz.
    const { quizId } = router.query;

    // get Quiz fron quizId
    const { data: quizData } = useGetQuizQuery({ quizId }) as { data: GetQuizResponse };

    // mutation to start Quiz
    const startQuiz = useStartQuiz();

    // state to store the current attempt
    const [attemptId, setAttemptId] = useState<string | null>(null);

    // function to handle the start of quiz
    function handleStartQuiz() {
        startQuiz.mutate({
            userId: userId,
            quizId: quizId
        }, {
            onSettled: (data, error) => {
                if (error) setAttemptId(null);
                if (data && data.attempt) setAttemptId(data.attempt.id);
            }
        })
    }

    return (
        <div className='h-[100dvh] w-screen flex flex-col justify-center items-center select-none'>
            <div className='h-full w-full max-w-screen-sm'>
                {!attemptId && (
                    <QuizStart
                        handleStartQuiz={handleStartQuiz}
                    />
                )}
                {attemptId && quizData && (
                    <QuestionLayout
                        questions={quizData.questions}
                        attemptId={attemptId}
                    />
                )}
            </div>
        </div>

    )
}
