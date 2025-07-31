import React from 'react';
import './Result.css';

export default function Result({ score, onRestart }) {
  const totalQuestions = 15; // Approximate total questions
  const percentage = Math.round((score / totalQuestions) * 100);

  const getPerformanceLevel = () => {
    if (percentage >= 90) return { level: 'Excellent', emoji: '🌟', color: '#f39c12' };
    if (percentage >= 75) return { level: 'Great', emoji: '🎉', color: '#27ae60' };
    if (percentage >= 60) return { level: 'Good', emoji: '👍', color: '#3498db' };
    if (percentage >= 40) return { level: 'Fair', emoji: '📚', color: '#e67e22' };
    return { level: 'Keep Practicing', emoji: '💪', color: '#e74c3c' };
  };

  const performance = getPerformanceLevel();

  const getEncouragementMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a language learning superstar! 🌟";
    if (percentage >= 75) return "Fantastic work! You're making excellent progress! 🎊";
    if (percentage >= 60) return "Well done! You're getting the hang of it! 👏";
    if (percentage >= 40) return "Good effort! Keep practicing and you'll improve! 📈";
    return "Don't give up! Every expert was once a beginner! 🚀";
  };

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-header">
          <div className="performance-emoji">{performance.emoji}</div>
          <h2 className="result-title">Quiz Complete!</h2>
        </div>

        <div className="score-section">
          <div className="score-circle" style={{ borderColor: performance.color }}>
            <div className="score-number" style={{ color: performance.color }}>
              {score}
            </div>
            <div className="score-total">/ {totalQuestions}</div>
          </div>

          <div className="percentage-display">
            <span className="percentage" style={{ color: performance.color }}>
              {percentage}%
            </span>
          </div>

          <div className="performance-level" style={{ color: performance.color }}>
            {performance.level}
          </div>
        </div>

        <div className="encouragement-section">
          <p className="encouragement-message">
            {getEncouragementMessage()}
          </p>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-icon">✅</span>
            <span className="stat-label">Correct</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">❌</span>
            <span className="stat-label">Incorrect</span>
            <span className="stat-value">{totalQuestions - score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            <span className="stat-label">Accuracy</span>
            <span className="stat-value">{percentage}%</span>
          </div>
        </div>

        <div className="action-buttons">
          <button className="restart-button" onClick={onRestart}>
            🔄 Try Another Language
          </button>
          <button className="practice-button" onClick={onRestart}>
            📚 Practice Again
          </button>
        </div>

        <div className="motivational-quote">
          <p>"The limits of my language mean the limits of my world." - Ludwig Wittgenstein</p>
        </div>
      </div>
    </div>
  );
}
