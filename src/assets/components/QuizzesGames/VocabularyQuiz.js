import React, { useState, useEffect } from 'react';
import './VocabularyQuiz.css';

const VocabularyQuiz = ({ onBack, language = 'hindi' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState([]);

  // Sample vocabulary questions
  const questions = [
    {
      type: 'multiple-choice',
      question: 'What does "नमस्ते" mean in English?',
      options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
      correct: 0,
      explanation: 'नमस्ते (namaste) is a common greeting meaning hello or goodbye'
    },
    {
      type: 'translation',
      question: 'How do you say "Water" in Hindi?',
      options: ['पानी', 'दूध', 'चाय', 'रस'],
      correct: 0,
      explanation: 'पानी (paani) means water in Hindi'
    },
    {
      type: 'fill-blank',
      question: 'Complete the sentence: मैं ___ पढ़ता हूँ (I read ___)',
      options: ['किताब', 'खाना', 'पानी', 'गाना'],
      correct: 0,
      explanation: 'किताब (kitaab) means book, completing "I read a book"'
    },
    {
      type: 'match-pair',
      question: 'Match the Hindi word with its English meaning: "दोस्त"',
      options: ['Enemy', 'Friend', 'Teacher', 'Student'],
      correct: 1,
      explanation: 'दोस्त (dost) means friend in Hindi'
    },
    {
      type: 'multiple-choice',
      question: 'Which word means "Happy" in Hindi?',
      options: ['उदास', 'खुश', 'गुस्सा', 'डरा'],
      correct: 1,
      explanation: 'खुश (khush) means happy in Hindi'
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, showResult, quizComplete]);

  const handleTimeUp = () => {
    setSelectedAnswer(null);
    handleAnswerSubmit();
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleAnswerSubmit = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    const newAnswers = [...answers, {
      question: currentQuestion,
      selected: selectedAnswer,
      correct: questions[currentQuestion].correct,
      isCorrect
    }];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + (timeLeft > 0 ? Math.max(10, timeLeft) : 5));
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setQuizComplete(true);
      }
    }, 2000);
  };

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case 'multiple-choice': return '🔤';
      case 'translation': return '🔄';
      case 'fill-blank': return '📝';
      case 'match-pair': return '🧩';
      default: return '❓';
    }
  };

  const getScorePercentage = () => {
    const maxScore = questions.length * 30; // Max 30 points per question
    return Math.round((score / maxScore) * 100);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(30);
    setQuizComplete(false);
    setAnswers([]);
  };

  if (quizComplete) {
    return (
      <div className="quiz-complete">
        <div className="completion-content">
          <div className="completion-header">
            <div className="completion-icon">
              {getScorePercentage() >= 80 ? '🏆' : getScorePercentage() >= 60 ? '🥈' : '📚'}
            </div>
            <h1 className="completion-title">Quiz Complete!</h1>
            <div className="final-score">
              <span className="score-number">{score}</span>
              <span className="score-label">Total Points</span>
            </div>
            <div className="score-percentage">
              {getScorePercentage()}% Accuracy
            </div>
          </div>

          <div className="quiz-summary">
            <h3>📊 Quiz Summary</h3>
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-value">{answers.filter(a => a.isCorrect).length}</span>
                <span className="stat-label">Correct</span>
              </div>
              <div className="stat">
                <span className="stat-value">{answers.filter(a => !a.isCorrect).length}</span>
                <span className="stat-label">Wrong</span>
              </div>
              <div className="stat">
                <span className="stat-value">{questions.length}</span>
                <span className="stat-label">Total</span>
              </div>
            </div>
          </div>

          <div className="completion-actions">
            <button className="restart-btn" onClick={restartQuiz}>
              🔄 Try Again
            </button>
            <button className="back-btn" onClick={onBack}>
              ← Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="vocabulary-quiz">
      <div className="quiz-header">
        <button className="back-btn" onClick={onBack}>← Back to Quizzes</button>
        <div className="quiz-info">
          <h1 className="quiz-title">📝 Vocabulary Quiz</h1>
          <div className="quiz-meta">
            <span className="question-counter">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="quiz-type">
              {getQuestionTypeIcon(currentQ.type)} {currentQ.type.replace('-', ' ').toUpperCase()}
            </span>
          </div>
        </div>
        <div className="quiz-stats">
          <div className="score">Score: {score}</div>
          <div className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}>
            ⏰ {timeLeft}s
          </div>
        </div>
      </div>

      <div className="quiz-content">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="question-section">
          <div className="question-card">
            <div className="question-type-badge">
              {getQuestionTypeIcon(currentQ.type)} {currentQ.type.replace('-', ' ')}
            </div>
            <h2 className="question-text">{currentQ.question}</h2>
          </div>

          <div className="answers-section">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                className={`answer-option ${selectedAnswer === index ? 'selected' : ''} ${
                  showResult ? (
                    index === currentQ.correct ? 'correct' : 
                    selectedAnswer === index ? 'wrong' : ''
                  ) : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
                {showResult && index === currentQ.correct && (
                  <span className="correct-indicator">✓</span>
                )}
                {showResult && selectedAnswer === index && index !== currentQ.correct && (
                  <span className="wrong-indicator">✗</span>
                )}
              </button>
            ))}
          </div>

          {!showResult && selectedAnswer !== null && (
            <button className="submit-btn" onClick={handleAnswerSubmit}>
              Submit Answer →
            </button>
          )}

          {showResult && (
            <div className="explanation-section">
              <div className="explanation-card">
                <h3 className="explanation-title">
                  {selectedAnswer === currentQ.correct ? '🎉 Correct!' : '❌ Incorrect'}
                </h3>
                <p className="explanation-text">{currentQ.explanation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VocabularyQuiz;
