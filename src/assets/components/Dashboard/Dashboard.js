import React, { useState, useEffect } from 'react';
import { getUserProgress, getLearningStats } from '../../../utils/userProgress';
import './Dashboard.css';

const languageNames = {
  hindi: 'Hindi (हिंदी)',
  bengali: 'Bengali (বাংলা)',
  gujarati: 'Gujarati (ગુજરાતી)',
  marathi: 'Marathi (मराठी)',
  punjabi: 'Punjabi (ਪੰਜਾਬੀ)',
  kannada: 'Kannada (ಕನ್ನಡ)',
  tamil: 'Tamil (தமிழ்)',
  telugu: 'Telugu (తెలుగు)',
  malayalam: 'Malayalam (മലയാളം)',
  odia: 'Odia (ଓଡ଼ିଆ)',
  assamese: 'Assamese (অসমীয়া)',
  urdu: 'Urdu (اردو)',
  sanskrit: 'Sanskrit (संस्कृत)',
  nepali: 'Nepali (नेपाली)'
};

export default function Dashboard({ onNavigate }) {
  const [userProgress, setUserProgress] = useState(null);
  const [stats, setStats] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadDashboardData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const loadDashboardData = () => {
    const progress = getUserProgress();
    const learningStats = getLearningStats();
    setUserProgress(progress);
    setStats(learningStats);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return '🌅 Good Morning';
    if (hour < 17) return '☀️ Good Afternoon';
    if (hour < 21) return '🌆 Good Evening';
    return '🌙 Good Night';
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "Every expert was once a beginner! 🌟",
      "Language is the road map of a culture 🗺️",
      "Learning never exhausts the mind 🧠",
      "The limits of my language are the limits of my world 🌍",
      "A different language is a different vision of life 👁️"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const getRecentActivities = () => {
    if (!userProgress || !userProgress.languages) return [];
    
    return Object.entries(userProgress.languages)
      .sort(([,a], [,b]) => new Date(b.lastStudied) - new Date(a.lastStudied))
      .slice(0, 5)
      .map(([code, data]) => ({
        language: languageNames[code] || code,
        action: data.completed ? 'Completed' : 'Studied',
        score: data.bestScore,
        time: new Date(data.lastStudied).toLocaleDateString()
      }));
  };

  if (!userProgress || !stats) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="welcome-title">
            {getGreeting()}, {userProgress.profile.name}!
          </h1>
          <p className="welcome-subtitle">{getMotivationalQuote()}</p>
          <div className="current-time">
            📅 {currentTime.toLocaleDateString()} • 🕐 {currentTime.toLocaleTimeString()}
          </div>
        </div>
        <div className="streak-display">
          <div className="streak-icon">🔥</div>
          <div className="streak-info">
            <span className="streak-number">{stats.currentStreak}</span>
            <span className="streak-label">Day Streak</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="quick-stats">
        <div className="stat-card languages-started">
          <div className="stat-icon">🚀</div>
          <div className="stat-content">
            <div className="stat-number">{stats.languagesStarted}</div>
            <div className="stat-label">Languages Started</div>
            <div className="stat-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(stats.languagesStarted / 14) * 100}%` }}
                ></div>
              </div>
              <span className="progress-text">{stats.languagesStarted}/14</span>
            </div>
          </div>
        </div>

        <div className="stat-card languages-completed">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-number">{stats.languagesCompleted}</div>
            <div className="stat-label">Languages Mastered</div>
            <div className="stat-subtext">80%+ Quiz Score</div>
          </div>
        </div>

        <div className="stat-card average-score">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">{stats.averageScore}%</div>
            <div className="stat-label">Average Score</div>
            <div className="stat-subtext">{stats.totalQuizzes} Quizzes Taken</div>
          </div>
        </div>

        <div className="stat-card study-time">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalFlashcards}</div>
            <div className="stat-label">Cards Studied</div>
            <div className="stat-subtext">Keep Learning!</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-content">
        {/* Recent Activity */}
        <div className="dashboard-card recent-activity">
          <div className="card-header">
            <h3 className="card-title">📈 Recent Activity</h3>
            <button 
              className="view-all-btn"
              onClick={() => onNavigate('progress')}
            >
              View All →
            </button>
          </div>
          <div className="activity-list">
            {getRecentActivities().length === 0 ? (
              <div className="no-activity">
                <div className="no-activity-icon">📚</div>
                <p>Start learning to see your activity here!</p>
                <button 
                  className="start-learning-btn"
                  onClick={() => onNavigate('courses')}
                >
                  Start Learning
                </button>
              </div>
            ) : (
              getRecentActivities().map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    {activity.action === 'Completed' ? '✅' : '📖'}
                  </div>
                  <div className="activity-content">
                    <div className="activity-text">
                      <strong>{activity.action}</strong> {activity.language}
                    </div>
                    <div className="activity-meta">
                      Score: {activity.score}% • {activity.time}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card quick-actions">
          <div className="card-header">
            <h3 className="card-title">⚡ Quick Actions</h3>
          </div>
          <div className="actions-grid">
            <button 
              className="action-btn continue-learning"
              onClick={() => onNavigate('courses')}
            >
              <div className="action-icon">📚</div>
              <div className="action-text">
                <div className="action-title">Continue Learning</div>
                <div className="action-subtitle">Pick up where you left off</div>
              </div>
            </button>
            
            <button 
              className="action-btn take-quiz"
              onClick={() => onNavigate('quizzes')}
            >
              <div className="action-icon">🎯</div>
              <div className="action-text">
                <div className="action-title">Take a Quiz</div>
                <div className="action-subtitle">Test your knowledge</div>
              </div>
            </button>
            
            <button 
              className="action-btn explore-resources"
              onClick={() => onNavigate('resources')}
            >
              <div className="action-icon">📖</div>
              <div className="action-text">
                <div className="action-title">Explore Resources</div>
                <div className="action-subtitle">Grammar & vocabulary</div>
              </div>
            </button>
            
            <button 
              className="action-btn join-community"
              onClick={() => onNavigate('community')}
            >
              <div className="action-icon">👥</div>
              <div className="action-text">
                <div className="action-title">Join Community</div>
                <div className="action-subtitle">Connect with learners</div>
              </div>
            </button>
          </div>
        </div>

        {/* Learning Goals */}
        <div className="dashboard-card learning-goals">
          <div className="card-header">
            <h3 className="card-title">🎯 Today's Goals</h3>
          </div>
          <div className="goals-list">
            <div className="goal-item">
              <div className="goal-checkbox">
                <input type="checkbox" id="goal1" />
                <label htmlFor="goal1">Study 10 flashcards</label>
              </div>
              <div className="goal-progress">7/10</div>
            </div>
            <div className="goal-item">
              <div className="goal-checkbox">
                <input type="checkbox" id="goal2" />
                <label htmlFor="goal2">Complete 1 quiz</label>
              </div>
              <div className="goal-progress">0/1</div>
            </div>
            <div className="goal-item">
              <div className="goal-checkbox">
                <input type="checkbox" id="goal3" />
                <label htmlFor="goal3">Practice pronunciation</label>
              </div>
              <div className="goal-progress">✓</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
