export interface Option {
    optionText: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    questionText: string;
    options: Option[];
    image?: string; // Optional image field
    questionType: string;
    correctAnswerScore: number; // Score awarded for this question if answered correctly
    wrongAnswerScore: number;    // Score deducted for this question if answered incorrectly
}

export interface Quiz {
    id: string;
    title: string;
    description: string;
    questions: Question[];
}
