import React, { useState, useEffect } from 'react';
import { getUserProgress } from '../../../utils/userProgress';
import DiscussionForums from './DiscussionForums';
import Groups from './Groups';
import LanguageExchange from './LanguageExchange';
import LiveEvents from './LiveEvents';
import UserTimeline from './UserTimeline';
import PeerReview from './PeerReview';
import Messaging from './Messaging';
import Leaderboards from './Leaderboards';
import './Community.css';

const Community = () => {
  const [activeSection, setActiveSection] = useState('forums');
  const [userProgress, setUserProgress] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(127);

  const communityFeatures = [
    {
      id: 'forums',
      name: 'Discussion Forums',
      icon: '💬',
      description: 'Join language-specific discussions and get help',
      color: '#3498db',
      count: 1247
    },
    {
      id: 'groups',
      name: 'Groups & Communities',
      icon: '👥',
      description: 'Connect with learners who share your interests',
      color: '#2ecc71',
      count: 89
    },
    {
      id: 'exchange',
      name: 'Language Exchange',
      icon: '🔄',
      description: 'Find conversation partners and practice together',
      color: '#e74c3c',
      count: 342
    },
    {
      id: 'events',
      name: 'Live Events & Meetups',
      icon: '📅',
      description: 'Join virtual language cafés and Q&A sessions',
      color: '#f39c12',
      count: 23
    },
    {
      id: 'timeline',
      name: 'Community Timeline',
      icon: '📰',
      description: 'Share achievements and connect with others',
      color: '#9b59b6',
      count: 856
    },
    {
      id: 'review',
      name: 'Peer Review',
      icon: '✍️',
      description: 'Get feedback on your writing and speaking',
      color: '#1abc9c',
      count: 234
    },
    {
      id: 'messaging',
      name: 'Direct Messaging',
      icon: '💌',
      description: 'Chat privately with other learners',
      color: '#e67e22',
      count: 12
    },
    {
      id: 'leaderboards',
      name: 'Leaderboards',
      icon: '🏆',
      description: 'See top contributors and active learners',
      color: '#34495e',
      count: 50
    }
  ];

  const recentActivity = [
    {
      id: 1,
      user: 'Priya Sharma',
      avatar: '👩‍🎓',
      action: 'answered a question in',
      target: 'Hindi Grammar Forum',
      time: '2 minutes ago',
      type: 'answer'
    },
    {
      id: 2,
      user: 'Raj Patel',
      avatar: '👨‍💼',
      action: 'joined the group',
      target: 'Bengali Literature Lovers',
      time: '5 minutes ago',
      type: 'join'
    },
    {
      id: 3,
      user: 'Anita Das',
      avatar: '👩‍🏫',
      action: 'shared a resource in',
      target: 'Tamil Learning Resources',
      time: '10 minutes ago',
      type: 'share'
    },
    {
      id: 4,
      user: 'Vikram Singh',
      avatar: '👨‍🎨',
      action: 'started a language exchange with',
      target: 'Maria (Spanish)',
      time: '15 minutes ago',
      type: 'exchange'
    }
  ];

  useEffect(() => {
    const progress = getUserProgress();
    setUserProgress(progress);
    loadNotifications();
    
    // Simulate online users count updates
    const interval = setInterval(() => {
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadNotifications = () => {
    // Mock notifications
    const mockNotifications = [
      { id: 1, type: 'message', text: 'New message from Priya', time: '5m ago' },
      { id: 2, type: 'forum', text: 'Your question was answered', time: '1h ago' },
      { id: 3, type: 'event', text: 'Hindi Café starts in 30 minutes', time: '2h ago' }
    ];
    setNotifications(mockNotifications);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'forums':
        return <DiscussionForums />;
      case 'groups':
        return <Groups />;
      case 'exchange':
        return <LanguageExchange />;
      case 'events':
        return <LiveEvents />;
      case 'timeline':
        return <UserTimeline />;
      case 'review':
        return <PeerReview />;
      case 'messaging':
        return <Messaging />;
      case 'leaderboards':
        return <Leaderboards />;
      default:
        return <DiscussionForums />;
    }
  };

  return (
    <div className="community">
      <div className="community-header">
        <div className="header-content">
          <h1 className="community-title">👥 Community & Forums</h1>
          <p className="community-subtitle">Connect, learn, and grow together with fellow language learners</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-icon">🌐</span>
            <div className="stat-info">
              <span className="stat-number">{onlineUsers}</span>
              <span className="stat-label">Online Now</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">💬</span>
            <div className="stat-info">
              <span className="stat-number">2.4k</span>
              <span className="stat-label">Active Discussions</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🏆</span>
            <div className="stat-info">
              <span className="stat-number">15k</span>
              <span className="stat-label">Community Members</span>
            </div>
          </div>
        </div>
      </div>

      <div className="community-layout">
        {/* Sidebar Navigation */}
        <div className="community-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">🚀 Community Features</h3>
            <div className="feature-nav">
              {communityFeatures.map((feature, index) => (
                <button
                  key={feature.id}
                  className={`feature-btn ${activeSection === feature.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(feature.id)}
                  style={{ '--color': feature.color, '--delay': `${index * 0.1}s` }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-content">
                    <span className="feature-name">{feature.name}</span>
                    <span className="feature-description">{feature.description}</span>
                  </div>
                  <div className="feature-count">{feature.count}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">⚡ Recent Activity</h3>
            <div className="activity-feed">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className="activity-item"
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className="activity-avatar">{activity.avatar}</div>
                  <div className="activity-content">
                    <div className="activity-text">
                      <strong>{activity.user}</strong> {activity.action}{' '}
                      <span className="activity-target">{activity.target}</span>
                    </div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                  <div className={`activity-type ${activity.type}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">🔔 Notifications</h3>
            <div className="notifications-list">
              {notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className="notification-item"
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className={`notification-icon ${notification.type}`}>
                    {notification.type === 'message' && '💌'}
                    {notification.type === 'forum' && '💬'}
                    {notification.type === 'event' && '📅'}
                  </div>
                  <div className="notification-content">
                    <div className="notification-text">{notification.text}</div>
                    <div className="notification-time">{notification.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="view-all-notifications">View All Notifications</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="community-main">
          <div className="section-header">
            <div className="section-info">
              <h2 className="section-title">
                {communityFeatures.find(f => f.id === activeSection)?.icon}{' '}
                {communityFeatures.find(f => f.id === activeSection)?.name}
              </h2>
              <p className="section-description">
                {communityFeatures.find(f => f.id === activeSection)?.description}
              </p>
            </div>
            <div className="section-actions">
              <button className="search-btn">🔍 Search</button>
              <button className="filter-btn">🔧 Filter</button>
              <button className="create-btn">➕ Create New</button>
            </div>
          </div>

          <div className="section-content">
            {renderActiveSection()}
          </div>
        </div>
      </div>

      {/* Quick Actions Floating Button */}
      <div className="quick-actions">
        <button className="quick-action-btn main" title="Quick Actions">
          ⚡
        </button>
        <div className="quick-action-menu">
          <button className="quick-action-btn" title="Ask Question">❓</button>
          <button className="quick-action-btn" title="Start Chat">💬</button>
          <button className="quick-action-btn" title="Join Event">📅</button>
          <button className="quick-action-btn" title="Find Partner">🤝</button>
        </div>
      </div>
    </div>
  );
};

export default Community;
