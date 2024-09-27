import { quizAttempts } from '@/utils/quizAttempt/demo-data'; // Import your quiz attempts data
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { attemptId } = req.query; // Extract attemptId from the query params

    // Validate that attemptId is provided
    if (!attemptId || typeof attemptId !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing attemptId' });
    }

    // Find the quiz attempt by id
    const quizAttempt = quizAttempts.find(attempt => attempt.id === attemptId);

    // If no quiz attempt is found, return a 404
    if (!quizAttempt) {
        return res.status(404).json({ message: 'Quiz attempt not found' });
    }

    // Return the found quiz attempt
    return res.status(200).json({ quizAttempt });
}