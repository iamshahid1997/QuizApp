import { Option, Quiz } from "@/utils/quiz/types";
import { QuizAttempt } from "@/utils/quizAttempt/type";

export interface GetQuizRequest {
    quizId: string | string[] | undefined;
}

export type GetQuizResponse = Quiz;

export interface GetQuizAttemptRequest {
    attemptId: string;
}

export interface GetQuizAttemptResponse {
    quizAttempt: QuizAttempt
}

export interface StartQuizRequest {
    userId: string;
    quizId: string | string[] | undefined;
}

export interface StartQuizResponse {
    attempt: QuizAttempt;
}

export interface UpdateQuizAttemptRequest {
    attemptId: string;
    questionId: string;
    selectedOptions: Option[];
    quizCompleted: boolean;
    timeTaken: number;
}

export interface UpdateQuizAttemptResponse {
    message: string;
}