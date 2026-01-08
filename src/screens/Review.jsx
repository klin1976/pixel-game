import React from 'react';
import { useGameStore } from '../hooks/useGame';
import { PixelButton } from '../components/PixelCard';

export const Review = () => {
    const { questions, answers, userAnswers, hideReview } = useGameStore();

    const optionLabels = ['A', 'B', 'C', 'D'];

    return (
        <div style={{
            width: '100%',
            maxWidth: '700px',
            padding: '20px',
            maxHeight: '100vh',
            overflowY: 'auto'
        }}>
            <h1 style={{
                textAlign: 'center',
                color: 'var(--color-primary)',
                marginBottom: '30px',
                textShadow: '3px 3px 0 #000'
            }}>
                REVIEW ANSWERS
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {questions.map((q, idx) => {
                    const isCorrect = answers[idx];
                    const userOptionIdx = userAnswers[idx];
                    const userAnswer = q.options[userOptionIdx];
                    const correctOptionIdx = optionLabels.indexOf(q.answer);
                    const correctAnswer = q.options[correctOptionIdx];

                    return (
                        <div
                            key={idx}
                            style={{
                                border: `4px solid ${isCorrect ? '#22c55e' : '#ef4444'}`,
                                backgroundColor: 'var(--color-surface)',
                                padding: '16px',
                                position: 'relative'
                            }}
                        >
                            {/* Badge */}
                            <div style={{
                                position: 'absolute',
                                top: '-12px',
                                right: '10px',
                                backgroundColor: isCorrect ? '#22c55e' : '#ef4444',
                                color: 'white',
                                padding: '4px 12px',
                                fontSize: '0.7rem',
                                fontWeight: 'bold'
                            }}>
                                {isCorrect ? 'CORRECT' : 'WRONG'}
                            </div>

                            {/* Question */}
                            <div style={{
                                fontSize: '1rem',
                                marginBottom: '12px',
                                lineHeight: '1.5'
                            }}>
                                {idx + 1}. {q.question}
                            </div>

                            {/* User's Answer */}
                            <div style={{
                                color: isCorrect ? '#22c55e' : '#ef4444',
                                fontSize: '0.9rem',
                                marginBottom: isCorrect ? '0' : '8px'
                            }}>
                                YOURS: {userAnswer}
                            </div>

                            {/* Correct Answer (only if wrong) */}
                            {!isCorrect && (
                                <div style={{
                                    color: '#22c55e',
                                    fontSize: '0.9rem'
                                }}>
                                    RIGHT: {correctAnswer}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Back Button */}
            <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}>
                <PixelButton onClick={hideReview} variant="primary" style={{
                    backgroundColor: '#facc15',
                    color: '#000',
                    width: '200px'
                }}>
                    BACK
                </PixelButton>
            </div>
        </div>
    );
};
