import { useQuery } from "@tanstack/react-query";
import { GetQuizAttemptRequest, GetQuizRequest } from "./types";
import { getQuiz, getQuizAttempt } from "./api";

export function useGetQuizQuery(data: GetQuizRequest) {
    return useQuery({
        queryKey: ['get_quiz', data.quizId],
        queryFn: () => getQuiz(data),
        enabled: !!data.quizId
    })
}

export function useGetQuizAttempt(data: GetQuizAttemptRequest) {
    return useQuery({
        queryKey: ['get_quiz_attempt', data.attemptId],
        queryFn: () => getQuizAttempt(data),
        enabled: !!data.attemptId
    })
}