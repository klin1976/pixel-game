import React from 'react';
import { useGameStore } from '../hooks/useGame';
import { PixelCard, PixelButton } from '../components/PixelCard';

export const Home = () => {
    const { userId, setUserId, startGame, gameState } = useGameStore();

    const handleStart = () => {
        startGame();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <h1 style={{
                color: 'var(--color-primary)',
                textShadow: '4px 4px 0 #000',
                fontSize: '3rem',
                marginBottom: '40px',
                textAlign: 'center'
            }}>
                PIXEL LEGEND
            </h1>

            <PixelCard>
                <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>
                    ENTER YOUR ID TO START THE CHALLENGE
                </p>

                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="PLAYER ID"
                    style={{
                        background: '#000',
                        border: '4px solid var(--color-border)',
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-pixel)',
                        fontSize: '1.5rem',
                        padding: '12px',
                        width: '100%',
                        textAlign: 'center',
                        marginBottom: '20px',
                        outline: 'none'
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                />

                <PixelButton
                    onClick={handleStart}
                    disabled={!userId || gameState === 'loading'}
                    variant="primary"
                    style={{ width: '100%' }}
                >
                    {gameState === 'loading' ? 'INITIALIZING...' : 'INSERT COIN (START)'}
                </PixelButton>
            </PixelCard>
        </div>
    );
};
