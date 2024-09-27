import { Option, Quiz } from "@/utils/quiz/types";
import { QuizAttempt } from "@/utils/quizAttempt/type";

export interface GetQuizParams {
    quizId: string | string[] | undefined;
}

export type GetQuizResponse = Quiz;

export interface GetQuizAttemptParams {
    attemptId: string;
}

export interface GetQuizAttemptResponse {
    quizAttempt: QuizAttempt
}

export interface StartQuizPayload {
    userId: string;
    quizId: string | string[] | undefined;
}

export interface StartQuizResponse {
    attempt: QuizAttempt;
}

export interface UpdateQuizAttemptPayload {
    attemptId: string;
    questionId: string;
    selectedOptions: Option[];
    quizCompleted: boolean;
    timeTaken: number;
}

export interface UpdateQuizAttemptResponse {
    message: string;
}