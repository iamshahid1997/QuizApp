import { useState } from 'react';
import { Option, Question } from '@/utils/quiz/types';
import { useUpdateQuizAttempt } from '@/services/mutation';

export const useQuizAttempt = (questions: Question[], attemptId: string) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const updateQuizAttempt = useUpdateQuizAttempt();

    const handleUpdateQuizAttempt = (
        timer: number,
        onSuccess: () => void
    ) => {
        const questionId = questions[currentQuestion].id;

        updateQuizAttempt.mutate({
            attemptId: attemptId,
            questionId: questionId,
            selectedOptions: selectedOptions,
            timeTaken: timer,
            quizCompleted: currentQuestion === questions.length - 1
        }, {
            onSettled: (data, error) => {
                if (!error && data) {
                    onSuccess(); // Proceed to the next question on success
                }
            }
        });
    };

    const goToNextQuestion = () => {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOptions([]); // Clear selected options for the next question
    };

    return {
        currentQuestion,
        selectedOptions,
        setSelectedOptions,
        handleUpdateQuizAttempt,
        goToNextQuestion
    };
};
