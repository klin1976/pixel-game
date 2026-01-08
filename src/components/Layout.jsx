import React from 'react';

export const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="scanlines"></div>
      <div className="crt-flicker"></div>
      <div className="content-wrapper" style={{ 
          position: 'relative', 
          zIndex: 1, 
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
      }}>
        {children}
      </div>
    </div>
  );
};
