import { create } from 'zustand';
import { api } from '../services/api';

const QUESTION_COUNT = Number(import.meta.env.VITE_QUESTION_COUNT) || 5;
const PASS_THRESHOLD = Number(import.meta.env.VITE_PASS_THRESHOLD) || 3;

export const useGameStore = create((set, get) => ({
    gameState: 'home', // home, loading, quiz, sending, result, error
    error: null,
    userId: '',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    answers: [], // Record of correctly answered or not, e.g. [true, false, true]
    passThreshold: PASS_THRESHOLD,

    answering: false,

    setUserId: (id) => set({ userId: id }),

    startGame: async () => {
        const { userId } = get();
        if (!userId.trim()) return;

        set({ gameState: 'loading', error: null, score: 0, answers: [], currentQuestionIndex: 0, answering: false });

        try {
            const questions = await api.fetchQuestions(QUESTION_COUNT);
            // Ensure questions have options A,B,C,D mapped correctly if GAS returns loose structure
            // Assuming GAS returns { question, A, B, C, D, answer: 'A' } or similar
            // Normalized structure expected: { id, question, options: ['text', 'text', ...], answer: 'A' }

            set({
                questions,
                gameState: 'quiz'
            });
        } catch (err) {
            set({ gameState: 'error', error: 'Failed to load questions. Please try again.' });
        }
    },

    submitAnswer: (selectedOption) => {
        const { questions, currentQuestionIndex, answers, answering, score } = get();

        // Prevent double submission
        if (answering) return;
        set({ answering: true });

        const currentQuestion = questions[currentQuestionIndex];

        // Check correctness (assuming options are A,B,C,D mapped to 0,1,2,3 or direct value?)
        // Let's assume options is array [A text, B text, C text, D text]
        // And answer is 'A', 'B', 'C', or 'D'.

        const optionMap = ['A', 'B', 'C', 'D'];
        const selectedLetter = optionMap[selectedOption];
        const isCorrect = selectedLetter === currentQuestion.answer; // Assuming answer is 'A', 'B',...

        // Calculate new score immediately based on current state + this answer
        const newScore = isCorrect ? score + 1 : score;
        const newAnswers = [...answers, isCorrect];

        set({ answers: newAnswers, score: newScore });

        if (currentQuestionIndex + 1 < questions.length) {
            setTimeout(() => {
                set({ currentQuestionIndex: currentQuestionIndex + 1, answering: false });
            }, 500); // Small delay for visual feedback
        } else {
            setTimeout(() => {
                get().finishGame(newScore);
                // Don't reset answering here, as we are moving to saving state
            }, 500);
        }
    },

    finishGame: async (finalScore) => {
        set({ gameState: 'sending' });
        const { userId, answers } = get();

        // Calculate pass/fail
        // const passed = finalScore >= PASS_THRESHOLD; 

        try {
            await api.submitScore({
                id: userId,
                score: finalScore,
                passed: finalScore >= PASS_THRESHOLD,
                answers // Optional: send details if needed
            });
            set({ gameState: 'result' });
        } catch (err) {
            // Even if upload fails, show result? Or show error?
            // Let's show result but maybe log error.
            set({ gameState: 'result', error: 'Score upload failed, but good game!' });
        }
    },

    restartGame: () => {
        set({
            gameState: 'home',
            questions: [],
            currentQuestionIndex: 0,
            score: 0,
            answers: [],
            error: null
        });
    }
}));
