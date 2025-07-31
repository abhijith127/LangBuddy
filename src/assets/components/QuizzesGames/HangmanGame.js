import React, { useState, useEffect } from 'react';
import './HangmanGame.css';

const HangmanGame = ({ onBack, language = 'hindi' }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [score, setScore] = useState(0);
  const [hint, setHint] = useState('');

  // Sample words for different languages
  const wordLists = {
    hindi: [
      { word: 'नमस्ते', english: 'namaste', meaning: 'Hello/Goodbye', hint: 'A common greeting' },
      { word: 'पानी', english: 'paani', meaning: 'Water', hint: 'Essential for life' },
      { word: 'खुशी', english: 'khushi', meaning: 'Happiness', hint: 'A positive emotion' },
      { word: 'किताब', english: 'kitaab', meaning: 'Book', hint: 'You read this' },
      { word: 'दोस्त', english: 'dost', meaning: 'Friend', hint: 'Someone close to you' }
    ],
    bengali: [
      { word: 'নমস্কার', english: 'namaskar', meaning: 'Hello', hint: 'A greeting' },
      { word: 'জল', english: 'jol', meaning: 'Water', hint: 'Essential liquid' },
      { word: 'বই', english: 'boi', meaning: 'Book', hint: 'Reading material' }
    ]
  };

  const maxWrongGuesses = 6;
  const hangmanParts = ['😵', '👤', '🫱', '🫲', '🦵', '🦵'];

  useEffect(() => {
    startNewGame();
  }, [language]);

  const startNewGame = () => {
    const words = wordLists[language] || wordLists.hindi;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord.word);
    setHint(randomWord.hint);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus('playing');
  };

  const handleLetterGuess = (letter) => {
    if (guessedLetters.includes(letter) || gameStatus !== 'playing') return;

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    if (!currentWord.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      
      if (newWrongGuesses >= maxWrongGuesses) {
        setGameStatus('lost');
      }
    } else {
      // Check if word is complete
      const isComplete = currentWord.split('').every(char => 
        newGuessedLetters.includes(char) || char === ' '
      );
      
      if (isComplete) {
        setGameStatus('won');
        setScore(score + (maxWrongGuesses - wrongGuesses) * 10);
      }
    }
  };

  const getDisplayWord = () => {
    return currentWord.split('').map(char => {
      if (char === ' ') return ' ';
      return guessedLetters.includes(char) ? char : '_';
    }).join(' ');
  };

  const getAlphabet = () => {
    // For Hindi, we'll use English letters for simplicity
    // In a real app, you'd use the appropriate script
    return 'अआइईउऊएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह'.split('');
  };

  const renderHangman = () => {
    return (
      <div className="hangman-display">
        <div className="gallows">
          <div className="gallows-top">┌─────┐</div>
          <div className="gallows-rope">│     │</div>
          <div className="gallows-body">│     {wrongGuesses >= 1 ? hangmanParts[0] : ''}</div>
          <div className="gallows-arms">│    {wrongGuesses >= 3 ? hangmanParts[2] : ' '}{wrongGuesses >= 2 ? hangmanParts[1] : ' '}{wrongGuesses >= 4 ? hangmanParts[3] : ' '}</div>
          <div className="gallows-legs">│    {wrongGuesses >= 5 ? hangmanParts[4] : ' '} {wrongGuesses >= 6 ? hangmanParts[5] : ' '}</div>
          <div className="gallows-base">│</div>
          <div className="gallows-ground">└─────────</div>
        </div>
        <div className="wrong-count">
          Wrong guesses: {wrongGuesses}/{maxWrongGuesses}
        </div>
      </div>
    );
  };

  return (
    <div className="hangman-game">
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>← Back to Games</button>
        <h1 className="game-title">🎪 Word Hangman</h1>
        <div className="score-display">Score: {score}</div>
      </div>

      <div className="game-content">
        <div className="game-area">
          {/* Hangman Display */}
          <div className="hangman-section">
            {renderHangman()}
          </div>

          {/* Word Display */}
          <div className="word-section">
            <div className="word-display">
              {getDisplayWord()}
            </div>
            <div className="hint-section">
              <span className="hint-label">💡 Hint:</span>
              <span className="hint-text">{hint}</span>
            </div>
          </div>

          {/* Letter Selection */}
          <div className="letters-section">
            <h3 className="letters-title">Select a letter:</h3>
            <div className="letters-grid">
              {getAlphabet().map((letter, index) => (
                <button
                  key={index}
                  className={`letter-btn ${guessedLetters.includes(letter) ? 'guessed' : ''} ${
                    guessedLetters.includes(letter) && !currentWord.includes(letter) ? 'wrong' : ''
                  } ${guessedLetters.includes(letter) && currentWord.includes(letter) ? 'correct' : ''}`}
                  onClick={() => handleLetterGuess(letter)}
                  disabled={guessedLetters.includes(letter) || gameStatus !== 'playing'}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Game Status */}
        {gameStatus !== 'playing' && (
          <div className={`game-result ${gameStatus}`}>
            <div className="result-content">
              {gameStatus === 'won' ? (
                <>
                  <div className="result-icon">🎉</div>
                  <h2 className="result-title">Congratulations!</h2>
                  <p className="result-message">You guessed the word correctly!</p>
                  <div className="result-word">
                    <strong>Word:</strong> {currentWord}
                  </div>
                  <div className="result-score">
                    <strong>Points Earned:</strong> {(maxWrongGuesses - wrongGuesses) * 10}
                  </div>
                </>
              ) : (
                <>
                  <div className="result-icon">😔</div>
                  <h2 className="result-title">Game Over!</h2>
                  <p className="result-message">Better luck next time!</p>
                  <div className="result-word">
                    <strong>The word was:</strong> {currentWord}
                  </div>
                </>
              )}
              <div className="result-actions">
                <button className="play-again-btn" onClick={startNewGame}>
                  🔄 Play Again
                </button>
                <button className="back-to-games-btn" onClick={onBack}>
                  🎮 Back to Games
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Game Instructions */}
      <div className="game-instructions">
        <h3>📋 How to Play:</h3>
        <ul>
          <li>Guess the hidden word by selecting letters</li>
          <li>Each wrong guess adds a part to the hangman</li>
          <li>Win by guessing the word before the drawing is complete</li>
          <li>Use the hint to help you guess!</li>
        </ul>
      </div>
    </div>
  );
};

export default HangmanGame;
