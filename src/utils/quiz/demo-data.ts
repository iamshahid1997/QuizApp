import { Quiz } from "./types";

// /utils/quiz/demo-data.ts
export const quizzes: Quiz[] = [
    {
        id: '1',
        title: 'JavaScript Basics',
        description: 'Test your knowledge on JavaScript fundamentals!',
        questions: [
            {
                id: 'q1',
                questionText: 'What is a closure in JavaScript?',
                options: [
                    { optionText: 'A function inside another function', isCorrect: true },
                    { optionText: 'A variable that is globally accessible', isCorrect: false },
                    { optionText: 'A data structure', isCorrect: false },
                ],
                questionType: 'MCQ',
                correctAnswerScore: 10,
                wrongAnswerScore: -5
            },
            {
                id: 'q2',
                questionText: 'Which company developed JavaScript?',
                options: [
                    { optionText: 'Microsoft', isCorrect: false },
                    { optionText: 'Netscape', isCorrect: true },
                    { optionText: 'Google', isCorrect: false },
                ],
                questionType: 'MCQ',
                correctAnswerScore: 10,
                wrongAnswerScore: -5,
                image: '/assets/questionLayout/JavaScript-logo.png'
            },
            {
                id: 'q3',
                questionText: 'What is JSX?',
                options: [
                    { optionText: 'A syntax extension for JavaScript', isCorrect: true },
                    { optionText: 'A CSS framework', isCorrect: false },
                    { optionText: 'A JavaScript library', isCorrect: false },
                ],
                questionType: 'MCQ',
                correctAnswerScore: 10,
                wrongAnswerScore: -5
            },
        ],
    },
    {
        id: '2',
        title: 'React Essentials',
        description: 'Learn about core React concepts!',
        questions: [
            {
                id: 'q4',
                questionText: 'What is JSX?',
                options: [
                    { optionText: 'A syntax extension for JavaScript', isCorrect: true },
                    { optionText: 'A CSS framework', isCorrect: false },
                    { optionText: 'A JavaScript library', isCorrect: false },
                ],
                questionType: 'MCQ',
                correctAnswerScore: 10,
                wrongAnswerScore: -5
            },
        ],
    },
];
