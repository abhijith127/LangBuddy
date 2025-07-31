import React, { useState, useEffect } from 'react';
import { getUserProgress, updateUserProfile, getLearningStats, resetUserProgress } from '../../../utils/userProgress';
import './Profile.css';

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

export default function Profile({ onBack }) {
  const [userProgress, setUserProgress] = useState(null);
  const [stats, setStats] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');

  const avatarOptions = ['🌟', '📚', '🎯', '🏆', '🚀', '💡', '🎨', '🌈', '⭐', '🔥'];

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const progress = getUserProgress();
    const learningStats = getLearningStats();
    setUserProgress(progress);
    setStats(learningStats);
    setEditName(progress.profile.name);
    setSelectedAvatar(progress.profile.avatar);
  };

  const handleSaveProfile = () => {
    const updates = {
      name: editName.trim() || 'Language Learner',
      avatar: selectedAvatar
    };
    updateUserProfile(updates);
    setIsEditing(false);
    loadUserData();
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
      resetUserProgress();
      loadUserData();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return '#27ae60';
    if (percentage >= 60) return '#f39c12';
    if (percentage >= 40) return '#e67e22';
    return '#e74c3c';
  };

  if (!userProgress || !stats) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Languages
        </button>
        <h1 className="profile-title">👤 My Profile</h1>
      </div>

      <div className="profile-content">
        {/* User Info Card */}
        <div className="profile-card user-info-card">
          <div className="user-avatar-section">
            <div className="user-avatar">{userProgress.profile.avatar}</div>
            {isEditing && (
              <div className="avatar-selector">
                {avatarOptions.map(avatar => (
                  <button
                    key={avatar}
                    className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                    onClick={() => setSelectedAvatar(avatar)}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="user-details">
            {isEditing ? (
              <div className="edit-profile">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter your name"
                  className="name-input"
                />
                <div className="edit-buttons">
                  <button className="save-button" onClick={handleSaveProfile}>
                    ✅ Save
                  </button>
                  <button className="cancel-button" onClick={() => setIsEditing(false)}>
                    ❌ Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-info">
                <h2 className="user-name">{userProgress.profile.name}</h2>
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                  ✏️ Edit Profile
                </button>
              </div>
            )}
            
            <div className="user-stats-summary">
              <div className="stat-item">
                <span className="stat-icon">📅</span>
                <span className="stat-label">Joined:</span>
                <span className="stat-value">{formatDate(userProgress.profile.joinDate)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🔥</span>
                <span className="stat-label">Current Streak:</span>
                <span className="stat-value">{stats.currentStreak} days</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🏆</span>
                <span className="stat-label">Longest Streak:</span>
                <span className="stat-value">{stats.longestStreak} days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Statistics */}
        <div className="profile-card stats-card">
          <h3 className="card-title">📊 Learning Statistics</h3>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">{stats.languagesStarted}</div>
              <div className="stat-label">Languages Started</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{stats.languagesCompleted}</div>
              <div className="stat-label">Languages Completed</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{stats.totalQuizzes}</div>
              <div className="stat-label">Quizzes Taken</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{stats.totalFlashcards}</div>
              <div className="stat-label">Flashcards Studied</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{stats.averageScore}%</div>
              <div className="stat-label">Average Score</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{stats.completionRate}%</div>
              <div className="stat-label">Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Language Progress */}
        <div className="profile-card languages-card">
          <h3 className="card-title">🌍 Language Progress</h3>
          {Object.keys(userProgress.languages).length === 0 ? (
            <div className="no-progress">
              <p>🚀 Start learning your first language!</p>
              <p>Your progress will appear here as you study.</p>
            </div>
          ) : (
            <div className="languages-list">
              {Object.entries(userProgress.languages).map(([code, data]) => (
                <div key={code} className="language-progress-item">
                  <div className="language-info">
                    <div className="language-name">
                      {data.completed && <span className="completed-badge">✅</span>}
                      {languageNames[code] || code}
                    </div>
                    <div className="language-stats">
                      <span>Best Score: {data.bestScore}%</span>
                      <span>Attempts: {data.attempts}</span>
                      <span>Last Studied: {formatDate(data.lastStudied)}</span>
                    </div>
                  </div>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill"
                      style={{ 
                        width: `${data.bestScore}%`,
                        backgroundColor: getProgressColor(data.bestScore)
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {stats.recentLanguages.length > 0 && (
          <div className="profile-card recent-activity-card">
            <h3 className="card-title">📈 Recent Activity</h3>
            <div className="recent-languages">
              {stats.recentLanguages.map((lang, index) => (
                <div key={lang.code} className="recent-language-item">
                  <div className="recent-rank">#{index + 1}</div>
                  <div className="recent-info">
                    <div className="recent-name">{languageNames[lang.code]}</div>
                    <div className="recent-date">Last studied: {formatDate(lang.lastStudied)}</div>
                  </div>
                  <div className="recent-score">{lang.bestScore}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="profile-card actions-card">
          <h3 className="card-title">⚙️ Actions</h3>
          <div className="action-buttons">
            <button className="action-button reset-button" onClick={handleResetProgress}>
              🔄 Reset All Progress
            </button>
          </div>
          <p className="reset-warning">
            ⚠️ Resetting will permanently delete all your learning progress and statistics.
          </p>
        </div>
      </div>
    </div>
  );
}
