import React from 'react';

export const Boss = ({ seed }) => {
    const avatarUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}&scale=120&radius=0`;

    return (
        <div className="boss-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
                display: 'inline-block',
                border: '4px solid var(--color-secondary)',
                backgroundColor: '#fff',
                padding: '4px',
                animation: 'float 3s ease-in-out infinite'
            }}>
                <img
                    src={avatarUrl}
                    alt="Boss"
                    style={{ width: '120px', height: '120px', display: 'block', imageRendering: 'pixelated' }}
                />
            </div>
            <style>{`
        @keyframes float {
            0% { transform: translate(0, 0px); }
            50% { transform: translate(0, -10px); }
            100% { transform: translate(0, 0px); }
        }
      `}</style>
        </div>
    );
};
