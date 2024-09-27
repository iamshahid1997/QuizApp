import { quizzes } from '@/utils/quiz/demo-data';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Extract the quizId from the query parameters
    const { quizId } = req.query;

    // Find the quiz in the demo data by matching the quizId
    const quiz = quizzes.find((q) => q.id === quizId);

     // If quiz is not found, return a 404 response
     if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
    }

    // If quiz is found, return it in the response
    return res.status(200).json(quiz);
}