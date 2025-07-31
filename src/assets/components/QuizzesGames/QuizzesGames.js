import React, { useState, useEffect } from 'react';
import { getUserProgress } from '../../../utils/userProgress';
import HangmanGame from './HangmanGame';
import VocabularyQuiz from './VocabularyQuiz';
import './QuizzesGames.css';

const QuizzesGames = () => {
  const [activeView, setActiveView] = useState('hub');
  const [selectedQuizType, setSelectedQuizType] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const quizTypes = [
    {
      id: 'vocabulary',
      title: 'Vocabulary Quizzes',
      icon: '📝',
      description: 'Test your word knowledge with multiple choice, matching, and fill-in-the-blank questions',
      difficulty: 'Beginner to Advanced',
      estimatedTime: '5-15 min',
      color: '#3498db',
      features: ['Multiple Choice', 'Match-the-Pair', 'Fill-in-the-Blank', 'Translation']
    },
    {
      id: 'grammar',
      title: 'Grammar Quizzes',
      icon: '📚',
      description: 'Master language structure with grammar rules, verb conjugations, and sentence construction',
      difficulty: 'Intermediate to Advanced',
      estimatedTime: '10-20 min',
      color: '#2ecc71',
      features: ['Grammar Rules', 'Verb Conjugation', 'Sentence Structure', 'Error Correction']
    },
    {
      id: 'reading',
      title: 'Reading Comprehension',
      icon: '📖',
      description: 'Improve understanding with passages and contextual questions',
      difficulty: 'Intermediate to Advanced',
      estimatedTime: '15-25 min',
      color: '#e74c3c',
      features: ['Short Stories', 'News Articles', 'Cultural Texts', 'Comprehension Questions']
    },
    {
      id: 'listening',
      title: 'Listening Quizzes',
      icon: '🎧',
      description: 'Enhance audio comprehension with native speaker recordings',
      difficulty: 'Beginner to Advanced',
      estimatedTime: '10-20 min',
      color: '#f39c12',
      features: ['Audio Phrases', 'Dictation', 'Pronunciation', 'Accent Recognition']
    },
    {
      id: 'mixed',
      title: 'Mixed Language',
      icon: '🌍',
      description: 'Challenge yourself with cross-language questions and translations',
      difficulty: 'Advanced',
      estimatedTime: '15-30 min',
      color: '#9b59b6',
      features: ['Cross-Translation', 'Cultural Context', 'Idioms', 'Advanced Concepts']
    }
  ];

  const games = [
    {
      id: 'charades',
      title: 'Language Charades',
      icon: '🎭',
      description: 'Act out words and phrases for others to guess',
      players: '2-8 players',
      difficulty: 'All Levels',
      color: '#e67e22'
    },
    {
      id: 'pictionary',
      title: 'Word Pictionary',
      icon: '🎨',
      description: 'Draw vocabulary items for teammates to guess',
      players: '2-6 players',
      difficulty: 'Beginner to Intermediate',
      color: '#1abc9c'
    },
    {
      id: 'bingo',
      title: 'Language Bingo',
      icon: '🎯',
      description: 'Traditional bingo with vocabulary and numbers',
      players: '1-20 players',
      difficulty: 'Beginner',
      color: '#34495e'
    },
    {
      id: 'hangman',
      title: 'Word Hangman',
      icon: '🎪',
      description: 'Classic spelling and vocabulary guessing game',
      players: '1-2 players',
      difficulty: 'Beginner to Intermediate',
      color: '#e74c3c'
    },
    {
      id: 'matching',
      title: 'Matching Games',
      icon: '🧩',
      description: 'Match words with pictures, synonyms, or translations',
      players: '1 player',
      difficulty: 'All Levels',
      color: '#3498db'
    },
    {
      id: 'crossword',
      title: 'Crossword Puzzles',
      icon: '📋',
      description: 'Solve crosswords to reinforce vocabulary and spelling',
      players: '1 player',
      difficulty: 'Intermediate to Advanced',
      color: '#8e44ad'
    },
    {
      id: 'madlibs',
      title: 'Mad Libs',
      icon: '📝',
      description: 'Fill-in-the-blank storytelling for grammar practice',
      players: '1-4 players',
      difficulty: 'Intermediate',
      color: '#f39c12'
    },
    {
      id: 'jeopardy',
      title: 'Language Jeopardy',
      icon: '🏆',
      description: 'Quiz show format with categories and point values',
      players: '1-4 players',
      difficulty: 'All Levels',
      color: '#2ecc71'
    }
  ];

  useEffect(() => {
    loadUserData();
    loadLeaderboard();
    loadAchievements();
  }, []);

  const loadUserData = () => {
    const progress = getUserProgress();
    setUserProgress(progress);
  };

  const loadLeaderboard = () => {
    // Mock leaderboard data - in real app, this would come from a server
    const mockLeaderboard = [
      { rank: 1, name: 'Language Master', score: 2450, avatar: '🏆' },
      { rank: 2, name: 'Quiz Champion', score: 2380, avatar: '🥈' },
      { rank: 3, name: 'Word Wizard', score: 2290, avatar: '🥉' },
      { rank: 4, name: 'Grammar Guru', score: 2150, avatar: '📚' },
      { rank: 5, name: 'Vocab Victor', score: 2050, avatar: '📝' }
    ];
    setLeaderboard(mockLeaderboard);
  };

  const loadAchievements = () => {
    // Mock achievements data
    const mockAchievements = [
      { id: 'first_quiz', title: 'First Steps', description: 'Complete your first quiz', icon: '🎯', unlocked: true },
      { id: 'perfect_score', title: 'Perfect Score', description: 'Get 100% on any quiz', icon: '💯', unlocked: true },
      { id: 'speed_demon', title: 'Speed Demon', description: 'Complete a quiz in under 2 minutes', icon: '⚡', unlocked: false },
      { id: 'game_master', title: 'Game Master', description: 'Play 5 different games', icon: '🎮', unlocked: false },
      { id: 'streak_master', title: 'Streak Master', description: 'Maintain a 7-day quiz streak', icon: '🔥', unlocked: false },
      { id: 'polyglot', title: 'Polyglot', description: 'Complete quizzes in 5 languages', icon: '🌍', unlocked: false }
    ];
    setAchievements(mockAchievements);
  };

  const handleQuizStart = (quizType) => {
    setSelectedQuizType(quizType);
    setActiveView('quiz');
  };

  const handleGameStart = (game) => {
    setSelectedGame(game);
    setActiveView('game');
  };

  const handleBackToHub = () => {
    setActiveView('hub');
    setSelectedQuizType(null);
    setSelectedGame(null);
  };

  // Render individual quiz/game components
  if (activeView === 'quiz') {
    // Render specific quizzes
    if (selectedQuizType?.id === 'vocabulary') {
      return <VocabularyQuiz onBack={handleBackToHub} />;
    }

    // Placeholder for other quiz types
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <button className="back-btn" onClick={handleBackToHub}>← Back to Hub</button>
          <h1>{selectedQuizType?.title}</h1>
        </div>
        <div className="quiz-content">
          <div className="quiz-placeholder">
            <div className="placeholder-icon">{selectedQuizType?.icon}</div>
            <h2>🚧 {selectedQuizType?.title} Coming Soon!</h2>
            <p>This quiz type is under development. Check back soon for interactive {selectedQuizType?.title.toLowerCase()}!</p>
            <div className="features-preview">
              <h3>Features will include:</h3>
              <ul>
                {selectedQuizType?.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            <button className="return-btn" onClick={handleBackToHub}>Return to Hub</button>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'game') {
    // Render specific games
    if (selectedGame?.id === 'hangman') {
      return <HangmanGame onBack={handleBackToHub} />;
    }

    // Placeholder for other games
    return (
      <div className="game-container">
        <div className="game-header">
          <button className="back-btn" onClick={handleBackToHub}>← Back to Hub</button>
          <h1>{selectedGame?.title}</h1>
        </div>
        <div className="game-content">
          <div className="game-placeholder">
            <div className="placeholder-icon">{selectedGame?.icon}</div>
            <h2>🚧 {selectedGame?.title} Coming Soon!</h2>
            <p>This game is under development. Check back soon for interactive {selectedGame?.title.toLowerCase()}!</p>
            <div className="game-info">
              <p><strong>Players:</strong> {selectedGame?.players}</p>
              <p><strong>Difficulty:</strong> {selectedGame?.difficulty}</p>
            </div>
            <button className="return-btn" onClick={handleBackToHub}>Return to Hub</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quizzes-games">
      <div className="hub-header">
        <div className="header-content">
          <h1 className="hub-title">🎮 Quizzes & Games</h1>
          <p className="hub-subtitle">Challenge yourself and have fun while learning!</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-icon">🏆</span>
            <div className="stat-info">
              <span className="stat-number">{userProgress?.statistics?.totalQuizzesTaken || 0}</span>
              <span className="stat-label">Quizzes Taken</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <div className="stat-info">
              <span className="stat-number">{achievements.filter(a => a.unlocked).length}</span>
              <span className="stat-label">Achievements</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            <div className="stat-info">
              <span className="stat-number">{userProgress?.statistics?.averageQuizScore || 0}%</span>
              <span className="stat-label">Avg Score</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hub-content">
        {/* Quiz Types Section */}
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">📝 Quiz Types</h2>
            <p className="section-subtitle">Test your knowledge with various quiz formats</p>
          </div>
          <div className="quiz-types-grid">
            {quizTypes.map((quiz, index) => (
              <div 
                key={quiz.id} 
                className="quiz-card"
                style={{ '--delay': `${index * 0.1}s`, '--color': quiz.color }}
                onClick={() => handleQuizStart(quiz)}
              >
                <div className="card-header">
                  <div className="quiz-icon">{quiz.icon}</div>
                  <div className="difficulty-badge">{quiz.difficulty}</div>
                </div>
                <div className="card-content">
                  <h3 className="quiz-title">{quiz.title}</h3>
                  <p className="quiz-description">{quiz.description}</p>
                  <div className="quiz-meta">
                    <span className="time-estimate">⏱️ {quiz.estimatedTime}</span>
                  </div>
                  <div className="quiz-features">
                    {quiz.features.map((feature, idx) => (
                      <span key={idx} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>
                <div className="card-footer">
                  <button className="start-quiz-btn">
                    Start Quiz →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Games Section */}
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">🎮 Interactive Games</h2>
            <p className="section-subtitle">Learn through play with engaging language games</p>
          </div>
          <div className="games-grid">
            {games.map((game, index) => (
              <div 
                key={game.id} 
                className="game-card"
                style={{ '--delay': `${index * 0.1}s`, '--color': game.color }}
                onClick={() => handleGameStart(game)}
              >
                <div className="game-icon-container">
                  <div className="game-icon">{game.icon}</div>
                  <div className="icon-glow"></div>
                </div>
                <div className="game-content">
                  <h3 className="game-title">{game.title}</h3>
                  <p className="game-description">{game.description}</p>
                  <div className="game-meta">
                    <span className="players-info">👥 {game.players}</span>
                    <span className="difficulty-info">📊 {game.difficulty}</span>
                  </div>
                </div>
                <div className="game-footer">
                  <button className="play-game-btn">
                    Play Now 🎮
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leaderboard & Achievements */}
        <div className="hub-sidebar">
          {/* Leaderboard */}
          <div className="sidebar-section leaderboard">
            <div className="sidebar-header">
              <h3 className="sidebar-title">🏆 Leaderboard</h3>
              <span className="update-time">Updated daily</span>
            </div>
            <div className="leaderboard-list">
              {leaderboard.map((player, index) => (
                <div key={index} className="leaderboard-item">
                  <div className="player-rank">#{player.rank}</div>
                  <div className="player-avatar">{player.avatar}</div>
                  <div className="player-info">
                    <span className="player-name">{player.name}</span>
                    <span className="player-score">{player.score.toLocaleString()} pts</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="view-full-leaderboard">View Full Leaderboard</button>
          </div>

          {/* Achievements */}
          <div className="sidebar-section achievements">
            <div className="sidebar-header">
              <h3 className="sidebar-title">⭐ Achievements</h3>
              <span className="achievement-progress">{achievements.filter(a => a.unlocked).length}/{achievements.length}</span>
            </div>
            <div className="achievements-list">
              {achievements.slice(0, 4).map((achievement, index) => (
                <div key={achievement.id} className={`achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-info">
                    <span className="achievement-title">{achievement.title}</span>
                    <span className="achievement-description">{achievement.description}</span>
                  </div>
                  {achievement.unlocked && <div className="unlock-indicator">✓</div>}
                </div>
              ))}
            </div>
            <button className="view-all-achievements">View All Achievements</button>
          </div>

          {/* Daily Challenge */}
          <div className="sidebar-section daily-challenge">
            <div className="sidebar-header">
              <h3 className="sidebar-title">🎯 Daily Challenge</h3>
              <span className="challenge-timer">⏰ 18:42:15</span>
            </div>
            <div className="challenge-content">
              <div className="challenge-icon">🔥</div>
              <h4 className="challenge-title">Vocabulary Sprint</h4>
              <p className="challenge-description">Answer 20 vocabulary questions in under 5 minutes</p>
              <div className="challenge-reward">
                <span className="reward-text">Reward: 500 XP + Special Badge</span>
              </div>
              <button className="start-challenge-btn">Start Challenge</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizzesGames;
