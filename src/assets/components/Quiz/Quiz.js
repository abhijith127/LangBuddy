import React, { useState } from 'react';
import './Quiz.css';

function getQuizQuestions(words) {
  // Create different types of questions
  const questions = [];

  // Multiple choice questions (meaning to word)
  words.slice(0, Math.min(10, words.length)).forEach((wordObj, idx, arr) => {
    let options = [wordObj.word];
    while (options.length < 4 && arr.length > 1) {
      const random = arr[Math.floor(Math.random() * arr.length)].word;
      if (!options.includes(random)) options.push(random);
    }
    questions.push({
      type: 'multiple-choice',
      question: `What is the word for "${wordObj.meaning}"?`,
      options: options.sort(() => Math.random() - 0.5),
      answer: wordObj.word,
      pronunciation: wordObj.pronunciation
    });
  });

  // Drag and drop questions (pronunciation to meaning)
  words.slice(0, Math.min(5, words.length)).forEach((wordObj, idx, arr) => {
    let meanings = [wordObj.meaning];
    while (meanings.length < 4 && arr.length > 1) {
      const random = arr[Math.floor(Math.random() * arr.length)].meaning;
      if (!meanings.includes(random)) meanings.push(random);
    }
    questions.push({
      type: 'drag-drop',
      question: `Drag the correct meaning for "${wordObj.pronunciation}"`,
      word: wordObj.word,
      pronunciation: wordObj.pronunciation,
      meanings: meanings.sort(() => Math.random() - 0.5),
      answer: wordObj.meaning
    });
  });

  return questions.sort(() => Math.random() - 0.5);
}

export default function Quiz({ words, onFinish }) {
  const [questions] = useState(() => getQuizQuestions(words));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropZoneActive, setDropZoneActive] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="no-quiz">
        <h2>🚫 No quiz questions available</h2>
        <p>Please try again with more words!</p>
      </div>
    );
  }

  const currentQuestion = questions[index];

  const handleMultipleChoiceAnswer = (selected) => {
    setSelectedAnswer(selected);
    setShowResult(true);

    const isCorrect = selected === currentQuestion.answer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (index === questions.length - 1) {
        onFinish(score + (isCorrect ? 1 : 0), questions.length);
      } else {
        setIndex(index + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 1500);
  };

  const handleDragStart = (e, meaning) => {
    setDraggedItem(meaning);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDropZoneActive(true);
  };

  const handleDragLeave = () => {
    setDropZoneActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDropZoneActive(false);

    if (draggedItem) {
      setSelectedAnswer(draggedItem);
      setShowResult(true);

      const isCorrect = draggedItem === currentQuestion.answer;
      if (isCorrect) {
        setScore(score + 1);
      }

      setTimeout(() => {
        if (index === questions.length - 1) {
          onFinish(score + (isCorrect ? 1 : 0), questions.length);
        } else {
          setIndex(index + 1);
          setSelectedAnswer(null);
          setShowResult(false);
          setDraggedItem(null);
        }
      }, 1500);
    }
  };

  const progressPercentage = ((index + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2 className="quiz-title">🎯 Quiz Time!</h2>
        <div className="quiz-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="progress-text">
            Question {index + 1} of {questions.length}
          </span>
        </div>
        <div className="score-display">
          Score: {score}/{questions.length}
        </div>
      </div>

      <div className="question-card">
        <h3 className="question-text">{currentQuestion.question}</h3>

        {currentQuestion.type === 'multiple-choice' && (
          <div className="multiple-choice">
            <div className="options-grid">
              {currentQuestion.options.map((option, optIndex) => (
                <button
                  key={optIndex}
                  className={`option-button ${
                    showResult
                      ? option === currentQuestion.answer
                        ? 'correct'
                        : option === selectedAnswer
                          ? 'incorrect'
                          : 'neutral'
                      : ''
                  }`}
                  onClick={() => !showResult && handleMultipleChoiceAnswer(option)}
                  disabled={showResult}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentQuestion.type === 'drag-drop' && (
          <div className="drag-drop">
            <div className="word-display">
              <span className="target-word">{currentQuestion.word}</span>
              <span className="pronunciation-hint">({currentQuestion.pronunciation})</span>
            </div>

            <div
              className={`drop-zone ${dropZoneActive ? 'active' : ''} ${
                showResult
                  ? selectedAnswer === currentQuestion.answer
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {selectedAnswer ? (
                <span className="dropped-answer">{selectedAnswer}</span>
              ) : (
                <span className="drop-hint">Drop the meaning here</span>
              )}
            </div>

            <div className="meanings-container">
              {currentQuestion.meanings.map((meaning, meaningIndex) => (
                <div
                  key={meaningIndex}
                  className={`meaning-item ${draggedItem === meaning ? 'dragging' : ''}`}
                  draggable={!showResult}
                  onDragStart={(e) => handleDragStart(e, meaning)}
                >
                  {meaning}
                </div>
              ))}
            </div>
          </div>
        )}

        {showResult && (
          <div className={`result-feedback ${selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect'}`}>
            {selectedAnswer === currentQuestion.answer ? (
              <span>✅ Correct! Well done!</span>
            ) : (
              <span>❌ Incorrect. The correct answer is: {currentQuestion.answer}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
