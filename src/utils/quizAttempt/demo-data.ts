import { QuizAttempt } from "./type";

export const quizAttempts: QuizAttempt[] = [
    {
        "id": "attempt-jasovsmi9",
        "userId": "user1",
        "quizId": "1",
        "startedAt": "Fri Sep 27 2024 13:52:16 GMT+0530 (India Standard Time)",
        "completedAt": "Fri Sep 27 2024 13:52:23 GMT+0530 (India Standard Time)",
        "totalCorrect": 1,
        "score": 0,
        "userResponses": [
            {
                "questionId": "q1",
                "selectedOptions": [
                    {
                        "optionText": "A function inside another function",
                        "isCorrect": true
                    }
                ],
                "timeTaken": 2
            },
            {
                "questionId": "q2",
                "selectedOptions": [
                    {
                        "optionText": "Microsoft",
                        "isCorrect": false
                    }
                ],
                "timeTaken": 1
            },
            {
                "questionId": "q3",
                "selectedOptions": [
                    {
                        "optionText": "A CSS framework",
                        "isCorrect": false
                    }
                ],
                "timeTaken": 2
            }
        ]
    }
];