import React from 'react';
import { useGameStore } from '../hooks/useGame';
import { PixelCard, PixelButton } from '../components/PixelCard';
import { Boss } from '../components/Boss';

export const Quiz = () => {
    const { questions, currentQuestionIndex, submitAnswer } = useGameStore();

    const currentQ = questions[currentQuestionIndex];

    if (!currentQ) return <div style={{ color: 'white' }}>LOADING LEVEL...</div>;

    return (
        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '10px',
                padding: '0 20px',
                color: 'var(--color-accent)'
            }}>
                <span>LEVEL: {currentQuestionIndex + 1}/{questions.length}</span>
                <span>BOSS: {currentQ.id || 'Unknown'}</span>
            </div>

            {(import.meta.env.VITE_GOOGLE_SCRIPT_URL || '').includes('REPLACE') && (
                <div style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '4px 8px',
                    marginBottom: '12px',
                    border: '2px solid white',
                    fontSize: '0.8rem',
                    animation: 'blink 2s infinite'
                }}>
                    ⚠ DEMO MODE - DATA WILL NOT SAVE
                </div>
            )}

            <Boss seed={`level-${currentQ.id || currentQuestionIndex}`} />

            <PixelCard className="question-card" style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.2rem', lineHeight: '1.6', margin: 0 }}>
                    {currentQ.question}
                </h2>
            </PixelCard>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                width: '100%',
                maxWidth: '600px'
            }}>
                {currentQ.options.map((opt, idx) => (
                    <PixelButton
                        key={idx}
                        onClick={() => submitAnswer(idx)}
                        variant="secondary"
                    >
                        {opt}
                    </PixelButton>
                ))}
            </div>
        </div>
    );
};
