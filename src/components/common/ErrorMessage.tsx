/**
 * ErrorMessage Component
 * Displays error message with optional retry button
 */

import React from 'react';

interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

/**
 * Error message component with optional retry functionality
 * @param message - Error message to display
 * @param retry - Optional callback function for retry button
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, retry }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        fontSize: '16px',
        color: '#d32f2f',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            marginBottom: '12px',
            fontSize: '32px',
          }}
        >
          ❌
        </div>
        <p
          style={{
            margin: '0 0 16px 0',
            color: '#d32f2f',
            fontWeight: '500',
          }}
        >
          {message}
        </p>
        {retry && (
          <button
            onClick={retry}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1565c0';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1976d2';
            }}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
