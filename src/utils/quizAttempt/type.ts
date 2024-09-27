import { Option } from "../quiz/types";

export interface UserResponse {
    questionId: string;
    selectedOptions: Option[];
    timeTaken: number
}

export interface QuizAttempt {
    id: string;
    userId: string;
    quizId: string;
    startedAt: string;
    completedAt: string | null;
    totalCorrect: number;
    score: number;
    userResponses: UserResponse[];
}
