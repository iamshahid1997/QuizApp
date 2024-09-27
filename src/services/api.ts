import { axiosInstance } from "./contants";
import { GetQuizAttemptRequest, GetQuizAttemptResponse, GetQuizRequest, GetQuizResponse, StartQuizRequest, StartQuizResponse, UpdateQuizAttemptRequest, UpdateQuizAttemptResponse } from "./types";

export const getQuiz = async (data: GetQuizRequest) => {
    const response: GetQuizResponse = (await axiosInstance.get(`/api/quiz/${data.quizId}`)).data;
    return response;
}

export const getQuizAttempt = async (data: GetQuizAttemptRequest) => {
    const response: GetQuizAttemptResponse = (await axiosInstance.get(`/api/quizAttempt/${data.attemptId}`)).data;
    return response;
}

export const startQuiz = async (data: StartQuizRequest) => {
    const response: StartQuizResponse = (await axiosInstance.post('/api/quiz/start', {
        userId: data.userId,
        quizId: data.quizId
    })).data;
    return response;
}

export const updateQuizAttempt = async (data: UpdateQuizAttemptRequest) => {
    const response: UpdateQuizAttemptResponse = (await axiosInstance.put('/api/quizAttempt/update', {
        attemptId: data.attemptId,
        questionId: data.questionId,
        selectedOptions: data.selectedOptions,
        quizCompleted: data.quizCompleted,
        timeTaken: data.timeTaken
    })).data;
    return response;
}