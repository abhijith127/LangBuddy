import React, { useState } from 'react';

const Leaderboards = () => {
  const [activeBoard, setActiveBoard] = useState('contributors');

  const leaderboardTypes = [
    { id: 'contributors', name: 'Top Contributors', icon: '🏆', description: 'Most helpful community members' },
    { id: 'learners', name: 'Active Learners', icon: '📚', description: 'Most dedicated students' },
    { id: 'streaks', name: 'Learning Streaks', icon: '🔥', description: 'Longest daily practice streaks' },
    { id: 'reviewers', name: 'Peer Reviewers', icon: '✍️', description: 'Most helpful reviewers' }
  ];

  const contributors = [
    {
      rank: 1,
      name: 'Dr. Anita Das',
      avatar: '👩‍🏫',
      points: 2847,
      badge: 'Expert Contributor',
      specialty: 'Bengali Grammar',
      helpfulAnswers: 156,
      change: '+2'
    },
    {
      rank: 2,
      name: 'Priya Sharma',
      avatar: '👩‍🎓',
      points: 2156,
      badge: 'Community Helper',
      specialty: 'Hindi Conversation',
      helpfulAnswers: 134,
      change: '0'
    },
    {
      rank: 3,
      name: 'Raj Kumar',
      avatar: '👨‍💼',
      points: 1923,
      badge: 'Language Mentor',
      specialty: 'Pronunciation',
      helpfulAnswers: 98,
      change: '-1'
    },
    {
      rank: 4,
      name: 'Meera Krishnan',
      avatar: '👩‍🎨',
      points: 1654,
      badge: 'Cultural Expert',
      specialty: 'Tamil Literature',
      helpfulAnswers: 87,
      change: '+1'
    },
    {
      rank: 5,
      name: 'Vikram Singh',
      avatar: '👨‍🎨',
      points: 1432,
      badge: 'Active Helper',
      specialty: 'Punjabi Culture',
      helpfulAnswers: 76,
      change: '+3'
    }
  ];

  const learners = [
    {
      rank: 1,
      name: 'Sarah Johnson',
      avatar: '👩‍💻',
      points: 3456,
      streak: 89,
      lessonsCompleted: 234,
      language: 'Hindi',
      level: 'Intermediate'
    },
    {
      rank: 2,
      name: 'Mike Chen',
      avatar: '👨‍💻',
      points: 3234,
      streak: 67,
      lessonsCompleted: 198,
      language: 'Bengali',
      level: 'Beginner'
    },
    {
      rank: 3,
      name: 'Emma Wilson',
      avatar: '👩‍🎓',
      points: 2987,
      streak: 45,
      lessonsCompleted: 176,
      language: 'Tamil',
      level: 'Advanced'
    }
  ];

  const achievements = [
    { id: 1, name: 'First Answer', icon: '🎯', description: 'Posted your first helpful answer' },
    { id: 2, name: 'Community Helper', icon: '🤝', description: 'Helped 50+ community members' },
    { id: 3, name: 'Expert Contributor', icon: '🏆', description: 'Top contributor for 3 months' },
    { id: 4, name: 'Learning Streak', icon: '🔥', description: 'Maintained 30-day learning streak' },
    { id: 5, name: 'Cultural Ambassador', icon: '🌍', description: 'Shared cultural insights' }
  ];

  const getCurrentLeaderboard = () => {
    switch (activeBoard) {
      case 'contributors':
        return contributors;
      case 'learners':
        return learners;
      case 'streaks':
        return learners.sort((a, b) => b.streak - a.streak);
      case 'reviewers':
        return contributors.filter(c => c.helpfulAnswers > 50);
      default:
        return contributors;
    }
  };

  return (
    <div className="leaderboards">
      <div className="leaderboards-header">
        <div className="header-info">
          <h2 className="leaderboards-title">🏆 Community Leaderboards</h2>
          <p className="leaderboards-subtitle">Celebrate our most active and helpful community members</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">15,234</span>
            <span className="stat-label">Total Members</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2,847</span>
            <span className="stat-label">Active This Month</span>
          </div>
        </div>
      </div>

      <div className="leaderboard-tabs">
        {leaderboardTypes.map((type, index) => (
          <button
            key={type.id}
            className={`tab-btn ${activeBoard === type.id ? 'active' : ''}`}
            onClick={() => setActiveBoard(type.id)}
            style={{ '--delay': `${index * 0.1}s` }}
          >
            <span className="tab-icon">{type.icon}</span>
            <div className="tab-content">
              <span className="tab-name">{type.name}</span>
              <span className="tab-description">{type.description}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="leaderboard-content">
        <div className="leaderboard-list">
          {getCurrentLeaderboard().map((member, index) => (
            <div
              key={member.rank || index}
              className={`leaderboard-item ${index < 3 ? 'top-three' : ''}`}
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <div className="rank-section">
                <div className={`rank-number rank-${index + 1}`}>
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && (index + 1)}
                </div>
                {member.change && (
                  <div className={`rank-change ${member.change.startsWith('+') ? 'up' : member.change === '0' ? 'same' : 'down'}`}>
                    {member.change !== '0' && (member.change.startsWith('+') ? '↗️' : '↘️')}
                    {member.change === '0' && '➡️'}
                  </div>
                )}
              </div>

              <div className="member-info">
                <div className="member-avatar">{member.avatar}</div>
                <div className="member-details">
                  <h4 className="member-name">{member.name}</h4>
                  {member.badge && <span className="member-badge">{member.badge}</span>}
                  {member.specialty && <span className="member-specialty">{member.specialty}</span>}
                  {member.language && <span className="member-language">Learning: {member.language}</span>}
                </div>
              </div>

              <div className="member-stats">
                <div className="stat-item">
                  <span className="stat-number">{member.points}</span>
                  <span className="stat-label">Points</span>
                </div>
                {member.helpfulAnswers && (
                  <div className="stat-item">
                    <span className="stat-number">{member.helpfulAnswers}</span>
                    <span className="stat-label">Helpful Answers</span>
                  </div>
                )}
                {member.streak && (
                  <div className="stat-item">
                    <span className="stat-number">{member.streak}</span>
                    <span className="stat-label">Day Streak</span>
                  </div>
                )}
                {member.lessonsCompleted && (
                  <div className="stat-item">
                    <span className="stat-number">{member.lessonsCompleted}</span>
                    <span className="stat-label">Lessons</span>
                  </div>
                )}
              </div>

              <div className="member-actions">
                <button className="follow-btn">👤 Follow</button>
                <button className="message-btn">💌 Message</button>
              </div>
            </div>
          ))}
        </div>

        <div className="achievements-sidebar">
          <h3 className="sidebar-title">🏅 Achievements</h3>
          <div className="achievements-list">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className="achievement-item"
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-info">
                  <h4 className="achievement-name">{achievement.name}</h4>
                  <p className="achievement-description">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="my-progress">
            <h3 className="sidebar-title">📊 My Progress</h3>
            <div className="progress-stats">
              <div className="progress-item">
                <span className="progress-label">Current Rank:</span>
                <span className="progress-value">#47</span>
              </div>
              <div className="progress-item">
                <span className="progress-label">Points:</span>
                <span className="progress-value">234</span>
              </div>
              <div className="progress-item">
                <span className="progress-label">Next Badge:</span>
                <span className="progress-value">Community Helper</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
            <p className="progress-text">65% to next achievement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboards;
