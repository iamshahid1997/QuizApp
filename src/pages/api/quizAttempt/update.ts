import { quizzes } from '@/utils/quiz/demo-data'; // Import your quiz data
import { quizAttempts } from '@/utils/quizAttempt/demo-data'; // Import the quiz attempts array
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Option } from '@/utils/quiz/types';
import { UpdateQuizAttemptRequest } from '@/services/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { attemptId, selectedOptions, questionId, quizCompleted, timeTaken }: UpdateQuizAttemptRequest = req.body; // Receive attemptId and selectedOptions

        // Find the quiz attempt
        const attemptIndex = quizAttempts.findIndex(a => a.id === attemptId);
        if (attemptIndex === -1) {
            return res.status(404).json({ message: 'Quiz attempt not found' });
        }

        // Get the quizAttempt for updating
        const quizAttempt = quizAttempts[attemptIndex];

        // Find the quiz
        const quiz = quizzes.find(q => q.id === quizAttempt.quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Initialize counters for score and correct answers
        let totalCorrect = 0;
        let totalScore = 0;
        const attemptedQuestions = new Set<string>(); // Track questions already attempted

        // Loop through selectedOptions, assuming it is an array of objects containing questionId and selected options
        selectedOptions.forEach((option: Option) => {
            // Check if the question has already been attempted
            if (attemptedQuestions.has(questionId)) return;

            const question = quiz.questions.find(q => q.id === questionId);

            if (question) {
                // Get correct options for the question
                const correctOptions = question.options.filter(opt => opt.isCorrect).map(opt => opt.optionText);

                // Check if the user's selected options are correct
                const allSelectedCorrect = selectedOptions.every(opt => correctOptions.includes(opt.optionText));
                const hasWrongOptions = selectedOptions.some(opt => !correctOptions.includes(opt.optionText));

                // Update score based on user's selection
                if (allSelectedCorrect && selectedOptions.length === correctOptions.length) {
                    totalCorrect += 1; // Increment totalCorrect only once
                    totalScore += question.correctAnswerScore; // Add correct score
                } else if (hasWrongOptions) {
                    totalScore += question.wrongAnswerScore; // Deduct wrong score only once
                }

                // Update userResponses for the current question
                quizAttempts[attemptIndex].userResponses.push({ questionId, selectedOptions: selectedOptions, timeTaken });
                attemptedQuestions.add(questionId); // Mark this question as attempted
            }
        });

        // Update the attempt object with final scores
        quizAttempts[attemptIndex].totalCorrect += totalCorrect; // Add to existing totalCorrect
        quizAttempts[attemptIndex].score += totalScore; // Update score

        // If the quiz is completed, update the 'completedAt' timestamp
        if (quizCompleted) {
            quizAttempts[attemptIndex].completedAt = new Date().toString() // Set current timestamp
        }

        // Persist the updated quizAttempts to the file
        const filePath = path.join(process.cwd(), 'src/utils/quizAttempt/demo-data.ts');
        const fileContent = `
      import { QuizAttempt } from "./type";
      
      export const quizAttempts: QuizAttempt[] = ${JSON.stringify(quizAttempts, null, 4)};
    `;

        fs.writeFileSync(filePath, fileContent);

        return res.status(200).json({ message: 'Quiz attempt updated' });
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
