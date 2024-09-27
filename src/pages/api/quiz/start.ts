import { quizzes } from '@/utils/quiz/demo-data';
import { quizAttempts } from '@/utils/quizAttempt/demo-data'; // Import the existing array
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { QuizAttempt } from '@/utils/quizAttempt/type';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Get quizId and userId from the request body
        const quizId = req.body.quizId;
        const userId = req.body.userId;
        const quiz = quizzes.find(q => q.id === quizId);

        // If quiz doesn't exist, return an error
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Create a new quiz attempt object
        const newAttempt: QuizAttempt = {
            id: 'attempt-' + Math.random().toString(36).substr(2, 9),
            userId: userId,
            quizId: quizId,
            startedAt: new Date().toString(),
            completedAt: null,
            totalCorrect: 0,
            score: 0,
            userResponses: [],
        };

        // Push the new quiz attempt into the quizAttempts array
        quizAttempts.push(newAttempt);

        // Path to the file where quizAttempts is stored
        const filePath = path.join(process.cwd(), 'src/utils/quizAttempt/demo-data.ts');

        // File content with only the updated quizAttempts array
        const updatedContent = `import { QuizAttempt } from "./type";

        export const quizAttempts: QuizAttempt[] = ${JSON.stringify(quizAttempts, null, 4)};`;

        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent);

        // Respond with the new attempt and quiz questions
        res.status(200).json({ attempt: newAttempt, questions: quiz.questions });
    } else {
        // Method not allowed for requests other than POST
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
