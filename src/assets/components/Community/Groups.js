import React, { useState } from 'react';
import './Groups.css';

const Groups = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const groupCategories = [
    { id: 'all', name: 'All Groups', icon: '👥', count: 89 },
    { id: 'location', name: 'By Location', icon: '📍', count: 23 },
    { id: 'level', name: 'By Level', icon: '🎯', count: 18 },
    { id: 'age', name: 'By Age', icon: '👶', count: 15 },
    { id: 'interests', name: 'By Interests', icon: '🎨', count: 33 }
  ];

  const sampleGroups = [
    {
      id: 1,
      name: 'Hindi Learners Mumbai',
      description: 'Connect with Hindi learners in Mumbai for practice sessions and cultural events',
      category: 'location',
      members: 234,
      language: 'Hindi',
      privacy: 'public',
      activity: 'Very Active',
      image: '🏙️',
      tags: ['mumbai', 'hindi', 'meetups'],
      lastActivity: '2 hours ago',
      moderators: ['Priya Sharma', 'Raj Kumar']
    },
    {
      id: 2,
      name: 'Bengali Literature Club',
      description: 'Discuss Bengali literature, poetry, and cultural heritage',
      category: 'interests',
      members: 156,
      language: 'Bengali',
      privacy: 'public',
      activity: 'Active',
      image: '📚',
      tags: ['literature', 'poetry', 'culture'],
      lastActivity: '5 hours ago',
      moderators: ['Anita Das']
    },
    {
      id: 3,
      name: 'Beginner Tamil Circle',
      description: 'Support group for Tamil language beginners',
      category: 'level',
      members: 89,
      language: 'Tamil',
      privacy: 'public',
      activity: 'Moderate',
      image: '🌱',
      tags: ['beginner', 'support', 'basics'],
      lastActivity: '1 day ago',
      moderators: ['Meera Krishnan']
    },
    {
      id: 4,
      name: 'Young Gujarati Speakers',
      description: 'Gujarati learning community for ages 16-25',
      category: 'age',
      members: 67,
      language: 'Gujarati',
      privacy: 'public',
      activity: 'Active',
      image: '🎓',
      tags: ['youth', 'gujarati', 'social'],
      lastActivity: '3 hours ago',
      moderators: ['Kiran Patel']
    },
    {
      id: 5,
      name: 'Punjabi Music Lovers',
      description: 'Learn Punjabi through music, songs, and cultural discussions',
      category: 'interests',
      members: 198,
      language: 'Punjabi',
      privacy: 'public',
      activity: 'Very Active',
      image: '🎵',
      tags: ['music', 'culture', 'entertainment'],
      lastActivity: '1 hour ago',
      moderators: ['Simran Kaur', 'Harpreet Singh']
    },
    {
      id: 6,
      name: 'Advanced Sanskrit Study',
      description: 'Deep dive into Sanskrit grammar, texts, and philosophy',
      category: 'level',
      members: 45,
      language: 'Sanskrit',
      privacy: 'private',
      activity: 'Moderate',
      image: '🏛️',
      tags: ['advanced', 'grammar', 'philosophy'],
      lastActivity: '6 hours ago',
      moderators: ['Dr. Sharma']
    }
  ];

  const filteredGroups = selectedCategory === 'all' 
    ? sampleGroups 
    : sampleGroups.filter(group => group.category === selectedCategory);

  return (
    <div className="groups-section">
      <div className="groups-header">
        <div className="header-info">
          <h2 className="groups-title">👥 Groups & Communities</h2>
          <p className="groups-subtitle">Join communities that match your interests and learning goals</p>
        </div>
        <div className="header-actions">
          <button className="create-group-btn">➕ Create Group</button>
          <button className="my-groups-btn">📋 My Groups</button>
        </div>
      </div>

      <div className="groups-controls">
        <div className="category-filters">
          {groupCategories.map((category, index) => (
            <button
              key={category.id}
              className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-name">{category.name}</span>
              <span className="filter-count">{category.count}</span>
            </button>
          ))}
        </div>

        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            ⊞ Grid
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            ☰ List
          </button>
        </div>
      </div>

      <div className={`groups-grid ${viewMode}`}>
        {filteredGroups.map((group, index) => (
          <div
            key={group.id}
            className="group-card"
            style={{ '--delay': `${index * 0.1}s` }}
          >
            <div className="group-header">
              <div className="group-image">{group.image}</div>
              <div className="group-privacy">
                {group.privacy === 'private' ? '🔒' : '🌐'}
              </div>
              <div className={`activity-indicator ${group.activity.toLowerCase().replace(' ', '-')}`}>
                <span className="activity-dot"></span>
                <span className="activity-text">{group.activity}</span>
              </div>
            </div>

            <div className="group-content">
              <h3 className="group-name">{group.name}</h3>
              <p className="group-description">{group.description}</p>

              <div className="group-meta">
                <div className="meta-item">
                  <span className="meta-icon">👥</span>
                  <span className="meta-text">{group.members} members</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">🗣️</span>
                  <span className="meta-text">{group.language}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">⏰</span>
                  <span className="meta-text">{group.lastActivity}</span>
                </div>
              </div>

              <div className="group-tags">
                {group.tags.map((tag, idx) => (
                  <span key={idx} className="group-tag">{tag}</span>
                ))}
              </div>

              <div className="group-moderators">
                <span className="moderators-label">Moderators:</span>
                <div className="moderators-list">
                  {group.moderators.map((mod, idx) => (
                    <span key={idx} className="moderator">{mod}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="group-footer">
              <button className="join-group-btn">
                {group.privacy === 'private' ? '📝 Request to Join' : '✅ Join Group'}
              </button>
              <div className="group-actions">
                <button className="bookmark-btn" title="Bookmark">🔖</button>
                <button className="share-btn" title="Share">📤</button>
                <button className="more-btn" title="More options">⋯</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="no-groups">
          <div className="no-groups-icon">👥</div>
          <h3 className="no-groups-title">No groups found</h3>
          <p className="no-groups-text">Try selecting a different category or create your own group!</p>
          <button className="create-first-group-btn">➕ Create Your First Group</button>
        </div>
      )}

      {/* Featured Groups Sidebar */}
      <div className="featured-groups-sidebar">
        <h3 className="sidebar-title">🌟 Featured Groups</h3>
        <div className="featured-groups-list">
          {sampleGroups.slice(0, 3).map((group, index) => (
            <div
              key={group.id}
              className="featured-group-item"
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <div className="featured-group-image">{group.image}</div>
              <div className="featured-group-info">
                <h4 className="featured-group-name">{group.name}</h4>
                <p className="featured-group-members">{group.members} members</p>
              </div>
              <button className="quick-join-btn">Join</button>
            </div>
          ))}
        </div>

        <div className="group-suggestions">
          <h3 className="sidebar-title">💡 Suggested for You</h3>
          <div className="suggestions-list">
            <div className="suggestion-item">
              <span className="suggestion-icon">🎯</span>
              <div className="suggestion-text">
                <strong>Intermediate Hindi Speakers</strong>
                <p>Based on your learning level</p>
              </div>
            </div>
            <div className="suggestion-item">
              <span className="suggestion-icon">📍</span>
              <div className="suggestion-text">
                <strong>Delhi Language Exchange</strong>
                <p>Based on your location</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
