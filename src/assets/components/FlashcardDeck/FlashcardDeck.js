import React, { useState } from 'react';
import Flashcard from '../Flashcard/Flashcard';
import './FlashcardDeck.css';

export default function FlashcardDeck({ words, onQuiz, onComplete }) {
  const [index, setIndex] = useState(0);

  if (!words || words.length === 0) {
    return (
      <div className="no-words">
        <h2>🚫 No words found</h2>
        <p>Please select a language to start learning!</p>
      </div>
    );
  }

  const goToPrevious = () => {
    if (index > 0) setIndex(index - 1);
  };

  const goToNext = () => {
    if (index < words.length - 1) setIndex(index + 1);
  };

  const progressPercentage = ((index + 1) / words.length) * 100;

  return (
    <div className="flashcard-deck">
      <div className="deck-header">
        <h2 className="deck-title">📚 Learning Flashcards</h2>
        <div className="progress-section">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="progress-text">
            Card {index + 1} of {words.length}
          </span>
        </div>
      </div>

      <Flashcard data={words[index]} />

      <div className="navigation-controls">
        <button
          className="nav-button prev-button"
          disabled={index === 0}
          onClick={goToPrevious}
        >
          ← Previous
        </button>

        <div className="card-counter">
          <span className="current-card">{index + 1}</span>
          <span className="separator">/</span>
          <span className="total-cards">{words.length}</span>
        </div>

        <button
          className="nav-button next-button"
          disabled={index === words.length - 1}
          onClick={goToNext}
        >
          Next →
        </button>
      </div>

      {index === words.length - 1 && (
        <div className="quiz-section">
          <div className="completion-message">
            <h3>🎉 Great job! You've completed all flashcards!</h3>
            <p>Ready to test your knowledge?</p>
          </div>
          <button className="quiz-button" onClick={() => {
            // Track flashcard completion
            if (onComplete) {
              onComplete(words.length);
            }
            onQuiz();
          }}>
            🎯 Take Quiz!
          </button>
        </div>
      )}
    </div>
  );
}
