import React from 'react';
import { Layout } from './components/Layout';
import { Home } from './screens/Home';
import { Quiz } from './screens/Quiz';
import { Result } from './screens/Result';
import { useGameStore } from './hooks/useGame';

function App() {
  const { gameState } = useGameStore();

  const renderScreen = () => {
    switch (gameState) {
      case 'home':
        return <Home />;
      case 'loading':
        return <div style={{ color: 'var(--color-primary)', fontSize: '2rem', animation: 'blink 1s infinite' }}>LOADING...</div>;
      case 'quiz':
        return <Quiz />;
      case 'sending':
        return <div style={{ color: 'var(--color-accent)', fontSize: '2rem' }}>UPLOADING RESULTS...</div>;
      case 'result':
        return <Result />;
      case 'error':
        // Simple error handling
        return (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'red' }}>SYSTEM ERROR</h2>
            <button onClick={() => window.location.reload()} style={{ color: 'white', marginTop: 20 }}>REBOOT SYSTEM</button>
          </div>
        );
      default:
        return <Home />;
    }
  };

  return (
    <Layout>
      {renderScreen()}
      <style>{`
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
      `}</style>
    </Layout>
  );
}

export default App;
