import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useGameStore } from '../hooks/useGame';
import { PixelCard, PixelButton } from '../components/PixelCard';

export const Result = () => {
    const { score, questions, passThreshold, restartGame, error } = useGameStore();
    const passed = score >= passThreshold;

    useEffect(() => {
        if (passed) {
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#00ff00', '#ff00ff', '#00ffff'] // Neon colors
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#00ff00', '#ff00ff', '#00ffff']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };

            frame();
        }
    }, [passed]);

    return (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
            <h1 style={{
                color: passed ? 'var(--color-primary)' : 'var(--color-secondary)',
                fontSize: '3rem',
                textShadow: '4px 4px 0 #000',
                marginBottom: '40px'
            }}>
                {passed ? 'MISSION COMPLETE' : 'GAME OVER'}
            </h1>

            <PixelCard>
                <div style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
                    SCORE: <span style={{ color: 'var(--color-accent)' }}>{score}</span> / {questions.length}
                </div>

                <div style={{ marginBottom: '30px', lineHeight: '1.5' }}>
                    {entryText(passed, passThreshold)}
                </div>

                {error && (
                    <div style={{ color: 'red', marginBottom: '20px', fontSize: '0.8rem' }}>
                        WARNING: {error}
                    </div>
                )}

                <PixelButton onClick={restartGame} variant="primary">
                    TRY AGAIN
                </PixelButton>
            </PixelCard>
        </div>
    );
};

function entryText(passed, threshold) {
    if (passed) return "EXCELLENT WORK, LEGEND! YOUR SCORE HAS BEEN RECORDED.";
    return `YOU NEED ${threshold} POINTS TO PASS. TRAIN HARDER!`;
}
