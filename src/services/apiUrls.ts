export const API_URLS = {
    getQuiz: (quizId: string | string[] | undefined) => `/api/quiz/${quizId}`,
    getQuizAttempt: (attemptId: string) => `/api/quizAttempt/${attemptId}`,
    startQuiz: '/api/quiz/start',
    updateQuizAttempt: '/api/quizAttempt/update',
};