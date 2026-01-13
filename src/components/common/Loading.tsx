/**
 * Loading Component
 * Simple loading indicator
 */

import React from 'react';

interface LoadingProps {
  text?: string;
}

/**
 * Loading component with optional text
 * @param text - Optional loading message (default: "Loading...")
 */
export const Loading: React.FC<LoadingProps> = ({ text = 'Loading...' }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        fontSize: '16px',
        color: '#666',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            marginBottom: '12px',
            fontSize: '24px',
            animation: 'spin 1s linear infinite',
          }}
        >
          ⏳
        </div>
        <p style={{ margin: '0' }}>{text}</p>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
