import React, { useState } from 'react';
import './Sidebar.css';

const navigationItems = [
  {
    id: 'dashboard',
    icon: '🏠',
    label: 'Home',
    subtitle: 'Dashboard',
    description: 'Overview & Quick Stats'
  },
  {
    id: 'courses',
    icon: '📚',
    label: 'Courses',
    subtitle: 'Lessons',
    description: 'Language Learning Paths'
  },
  {
    id: 'quizzes',
    icon: '🎮',
    label: 'Quizzes',
    subtitle: 'Games',
    description: 'Interactive Learning'
  },
  {
    id: 'progress',
    icon: '📊',
    label: 'Progress',
    subtitle: 'Profile',
    description: 'Track Your Journey'
  },
  {
    id: 'community',
    icon: '👥',
    label: 'Community',
    subtitle: 'Forums',
    description: 'Connect & Share'
  },
  {
    id: 'resources',
    icon: '📖',
    label: 'Resources',
    subtitle: 'Library',
    description: 'Learning Materials'
  },
  {
    id: 'settings',
    icon: '⚙️',
    label: 'Settings',
    subtitle: '',
    description: 'Preferences & Config'
  }
];

export default function Sidebar({ activeSection, onSectionChange, isCollapsed, onToggleCollapse }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemClick = (sectionId) => {
    onSectionChange(sectionId);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="logo-section">
          <div className="app-logo-icon">🌟</div>
          {!isCollapsed && (
            <div className="app-info">
              <h2 className="app-name">LangBuddy</h2>
              <p className="app-tagline">Learn & Grow</p>
            </div>
          )}
        </div>
        <button 
          className="collapse-toggle"
          onClick={onToggleCollapse}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navigationItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                title={isCollapsed ? `${item.label} - ${item.description}` : ''}
              >
                <div className="nav-icon">{item.icon}</div>
                {!isCollapsed && (
                  <div className="nav-content">
                    <div className="nav-labels">
                      <span className="nav-label">{item.label}</span>
                      {item.subtitle && (
                        <span className="nav-subtitle">/ {item.subtitle}</span>
                      )}
                    </div>
                    <span className="nav-description">{item.description}</span>
                  </div>
                )}
                {activeSection === item.id && <div className="active-indicator"></div>}
              </button>
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && hoveredItem === item.id && (
                <div className="nav-tooltip">
                  <div className="tooltip-content">
                    <strong>{item.label}{item.subtitle && ` / ${item.subtitle}`}</strong>
                    <p>{item.description}</p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <span className="user-name">Language Learner</span>
              <span className="user-status">🔥 5 day streak</span>
            </div>
          </div>
        )}
        
        <div className="footer-actions">
          <button className="footer-btn" title="Help & Support">
            {isCollapsed ? '❓' : '❓ Help'}
          </button>
          {!isCollapsed && (
            <button className="footer-btn" title="Notifications">
              🔔 Alerts
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
