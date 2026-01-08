import React from 'react';
import clsx from 'clsx';

export const PixelCard = ({ children, className, variant = 'primary' }) => {
    const borderColor = {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
    }[variant] || 'white';

    const style = {
        boxShadow: `
      -4px 0 0 0 ${borderColor},
      4px 0 0 0 ${borderColor},
      0 -4px 0 0 ${borderColor},
      0 4px 0 0 ${borderColor}
    `,
        backgroundColor: 'var(--color-surface)',
        padding: '24px',
        margin: '8px',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
        position: 'relative'
    };

    return (
        <div className={clsx('pixel-card', className)} style={style}>
            {/* Corner pieces for extra pixel detail */}
            <div style={{ position: 'absolute', top: -4, left: -4, width: 4, height: 4, background: 'var(--color-bg)' }}></div>
            <div style={{ position: 'absolute', top: -4, right: -4, width: 4, height: 4, background: 'var(--color-bg)' }}></div>
            <div style={{ position: 'absolute', bottom: -4, left: -4, width: 4, height: 4, background: 'var(--color-bg)' }}></div>
            <div style={{ position: 'absolute', bottom: -4, right: -4, width: 4, height: 4, background: 'var(--color-bg)' }}></div>

            {children}
        </div>
    );
};

export const PixelButton = ({ children, onClick, disabled, variant = 'primary', style = {} }) => {
    const bg = {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
    }[variant] || 'white';

    const color = variant === 'primary' ? 'black' : 'white';

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '1rem',
                padding: '16px 24px',
                marginTop: '16px',
                backgroundColor: disabled ? '#555' : bg,
                color: disabled ? '#888' : color,
                boxShadow: disabled ? 'none' : `4px 4px 0px 0px rgba(0,0,0,0.5)`,
                transform: 'translate(0, 0)',
                transition: 'all 0.1s',
                ...style
            }}
            onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = 'translate(2px, 2px)', e.currentTarget.style.boxShadow = '2px 2px 0px 0px rgba(0,0,0,0.5)')}
            onMouseUp={(e) => !disabled && (e.currentTarget.style.transform = 'translate(0, 0)', e.currentTarget.style.boxShadow = '4px 4px 0px 0px rgba(0,0,0,0.5)')}
            onMouseLeave={(e) => !disabled && (e.currentTarget.style.transform = 'translate(0, 0)', e.currentTarget.style.boxShadow = '4px 4px 0px 0px rgba(0,0,0,0.5)')}
        >
            {children}
        </button>
    )
}
