import { useMutation } from "@tanstack/react-query";
import { StartQuizRequest, UpdateQuizAttemptRequest } from "./types";
import { startQuiz, updateQuizAttempt } from "./api";

export function useStartQuiz() {
    return useMutation({
        mutationKey: ['start-quiz'],
        mutationFn: (data: StartQuizRequest) => startQuiz(data)
    })
}

export function useUpdateQuizAttempt() {
    return useMutation({
        mutationKey: ['update-quiz-attempt'],
        mutationFn: (data: UpdateQuizAttemptRequest) => updateQuizAttempt(data)
    })
}