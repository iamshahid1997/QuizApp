import { axiosInstance } from "./contants";
import { API_URLS } from './apiUrls';
import {
    GetQuizAttemptParams,
    GetQuizAttemptResponse,
    GetQuizParams,
    GetQuizResponse,
    StartQuizPayload,
    StartQuizResponse,
    UpdateQuizAttemptPayload,
    UpdateQuizAttemptResponse
} from "./types";

export const getQuiz = async (data: GetQuizParams) => {
    const response: GetQuizResponse = (await axiosInstance.get(API_URLS.getQuiz(data.quizId))).data;
    return response;
}

export const getQuizAttempt = async (data: GetQuizAttemptParams) => {
    const response: GetQuizAttemptResponse = (await axiosInstance.get(API_URLS.getQuizAttempt(data.attemptId))).data;
    return response;
}

export const startQuiz = async (data: StartQuizPayload) => {
    const response: StartQuizResponse = (await axiosInstance.post(API_URLS.startQuiz, {
        userId: data.userId,
        quizId: data.quizId
    })).data;
    return response;
}

export const updateQuizAttempt = async (data: UpdateQuizAttemptPayload) => {
    const response: UpdateQuizAttemptResponse = (await axiosInstance.put(API_URLS.updateQuizAttempt, {
        attemptId: data.attemptId,
        questionId: data.questionId,
        selectedOptions: data.selectedOptions,
        quizCompleted: data.quizCompleted,
        timeTaken: data.timeTaken
    })).data;
    return response;
}