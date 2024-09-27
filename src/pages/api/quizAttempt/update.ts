import { quizzes } from '@/utils/quiz/demo-data';
import { quizAttempts } from '@/utils/quizAttempt/demo-data';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Option, Question } from '@/utils/quiz/types';
import { UpdateQuizAttemptPayload } from '@/services/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { attemptId, selectedOptions, questionId, quizCompleted, timeTaken }: UpdateQuizAttemptPayload = req.body;

        try {
            // Find the quiz and attempt
            const { quiz, quizAttempt, attemptIndex } = findQuizAndAttempt(attemptId);

            // Update quiz attempt and calculate scores
            const { totalCorrect, totalScore } = updateQuizAttemptAndCalculate(
                quiz,
                quizAttempt,
                selectedOptions,
                questionId,
                timeTaken,
            );

            // Update attempt data
            quizAttempts[attemptIndex].totalCorrect += totalCorrect;
            quizAttempts[attemptIndex].score += totalScore;

            if (quizCompleted) {
                quizAttempts[attemptIndex].completedAt = new Date().toString();
            }

            // Write updated attempts back to the file
            writeQuizAttemptsToFile();

            return res.status(200).json({ message: 'Quiz attempt updated' });

        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }

    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

// Find the quiz and attempt
export function findQuizAndAttempt(attemptId: string) {
    const attemptIndex = quizAttempts.findIndex(a => a.id === attemptId);
    if (attemptIndex === -1) {
        throw new Error('Quiz attempt not found');
    }

    const quizAttempt = quizAttempts[attemptIndex];
    const quiz = quizzes.find(q => q.id === quizAttempt.quizId);
    if (!quiz) {
        throw new Error('Quiz not found');
    }

    return { quiz, quizAttempt, attemptIndex };
}

// updates the quiz attempt by comparing the selected options with correct answers and calculates the total correct answers and score.

export function updateQuizAttemptAndCalculate(
    quiz: { questions: Question[] },
    quizAttempt: any,
    selectedOptions: Option[],
    questionId: string,
    timeTaken: number,
) {
    let totalCorrect = 0; // Initialize correct answers counter
    let totalScore = 0;   // Initialize score counter
    const attemptedQuestions = new Set<string>(); // Keep track of questions already attempted

    // Find the question by its ID
    const question = quiz.questions.find(q => q.id === questionId);

    if (question) {
        // Get the correct options for the question
        const correctOptions = question.options.filter(opt => opt.isCorrect).map(opt => opt.optionText);

        // Check if all selected options are correct
        const allSelectedCorrect = selectedOptions.every(opt => correctOptions.includes(opt.optionText));

        // Check if any of the selected options are wrong
        const hasWrongOptions = selectedOptions.some(opt => !correctOptions.includes(opt.optionText));

        // Calculate score based on the correctness of the answers
        if (allSelectedCorrect && selectedOptions.length === correctOptions.length) {
            totalCorrect += 1; // Increment correct answers
            totalScore += question.correctAnswerScore; // Add correct score
        } else if (hasWrongOptions) {
            totalScore += question.wrongAnswerScore; // Deduct points for wrong answers
        }

        // Record the user's response and time taken for this question
        quizAttempt.userResponses.push({ questionId, selectedOptions: selectedOptions, timeTaken });
        attemptedQuestions.add(questionId); // Mark question as attempted
    }

    // Return the total correct answers and score for this question
    return { totalCorrect, totalScore };
}

// Writes the updated quiz attempts back to the file (demo-data.ts).
export function writeQuizAttemptsToFile() {
    // Path to the file where quizAttempts are stored
    const filePath = path.join(process.cwd(), 'src/utils/quizAttempt/demo-data.ts');

    // Create file content string with updated quizAttempts
    const fileContent = `
        import { QuizAttempt } from "./type";
        export const quizAttempts: QuizAttempt[] = ${JSON.stringify(quizAttempts, null, 4)};
    `;

    // Write the updated content back to the file
    fs.writeFileSync(filePath, fileContent);
}
