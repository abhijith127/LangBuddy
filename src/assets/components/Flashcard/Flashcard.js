import React, { useState } from 'react';
import './Flashcard.css';

export default function Flashcard({ data }) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!data) return null;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flashcard-front">
          <div className="card-header">
            <span className="flip-hint">👆 Tap to flip</span>
          </div>
          <div className="word-display">
            <h2 className="native-word">{data.word}</h2>
            <div className="pronunciation">
              <span className="pronunciation-label">🔊 Pronunciation:</span>
              <span className="pronunciation-text">{data.pronunciation}</span>
            </div>
          </div>
          <div className="card-footer">
            <span className="card-type">Front</span>
          </div>
        </div>

        <div className="flashcard-back">
          <div className="card-header">
            <span className="flip-hint">👆 Tap to flip back</span>
          </div>
          <div className="meaning-display">
            <h3 className="meaning-title">Meaning</h3>
            <p className="meaning-text">{data.meaning}</p>
            <div className="example-section">
              <span className="example-label">📝 Example:</span>
              <p className="example-text">{data.example}</p>
            </div>
          </div>
          <div className="card-footer">
            <span className="card-type">Back</span>
          </div>
        </div>
      </div>

      <div className="flip-instruction">
        <p>💡 Click the card to see the meaning and example!</p>
      </div>
    </div>
  );
}
