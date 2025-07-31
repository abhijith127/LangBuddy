import React, { useState } from 'react';

const LanguageExchange = () => {
  const [activeTab, setActiveTab] = useState('find-partners');

  const exchangePartners = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      avatar: '👩‍🎓',
      nativeLanguage: 'Spanish',
      learningLanguage: 'Hindi',
      level: 'Intermediate',
      location: 'Madrid, Spain',
      interests: ['Movies', 'Travel', 'Cooking'],
      rating: 4.8,
      sessions: 156,
      online: true
    },
    {
      id: 2,
      name: 'John Smith',
      avatar: '👨‍💼',
      nativeLanguage: 'English',
      learningLanguage: 'Bengali',
      level: 'Beginner',
      location: 'London, UK',
      interests: ['Literature', 'Music', 'History'],
      rating: 4.6,
      sessions: 89,
      online: false
    },
    {
      id: 3,
      name: 'Yuki Tanaka',
      avatar: '👩‍🎨',
      nativeLanguage: 'Japanese',
      learningLanguage: 'Tamil',
      level: 'Advanced',
      location: 'Tokyo, Japan',
      interests: ['Art', 'Culture', 'Food'],
      rating: 4.9,
      sessions: 234,
      online: true
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Hindi-English Language Café',
      date: 'Today, 7:00 PM',
      participants: 12,
      maxParticipants: 20,
      language: 'Hindi ↔ English',
      type: 'Video Chat',
      host: 'Priya Sharma'
    },
    {
      id: 2,
      title: 'Bengali Conversation Circle',
      date: 'Tomorrow, 6:30 PM',
      participants: 8,
      maxParticipants: 15,
      language: 'Bengali ↔ English',
      type: 'Audio Chat',
      host: 'Anita Das'
    }
  ];

  return (
    <div className="language-exchange">
      <div className="exchange-tabs">
        <button
          className={`tab-btn ${activeTab === 'find-partners' ? 'active' : ''}`}
          onClick={() => setActiveTab('find-partners')}
        >
          🤝 Find Partners
        </button>
        <button
          className={`tab-btn ${activeTab === 'my-exchanges' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-exchanges')}
        >
          💬 My Exchanges
        </button>
        <button
          className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          📅 Events
        </button>
      </div>

      {activeTab === 'find-partners' && (
        <div className="partners-section">
          <div className="search-filters">
            <input type="text" placeholder="Search by language or location..." className="search-input" />
            <select className="filter-select">
              <option>All Languages</option>
              <option>Hindi</option>
              <option>Bengali</option>
              <option>Tamil</option>
            </select>
            <select className="filter-select">
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div className="partners-grid">
            {exchangePartners.map((partner, index) => (
              <div key={partner.id} className="partner-card" style={{ '--delay': `${index * 0.1}s` }}>
                <div className="partner-header">
                  <div className="partner-avatar">{partner.avatar}</div>
                  <div className={`online-status ${partner.online ? 'online' : 'offline'}`}></div>
                  <div className="partner-rating">⭐ {partner.rating}</div>
                </div>
                
                <div className="partner-info">
                  <h3 className="partner-name">{partner.name}</h3>
                  <p className="partner-location">📍 {partner.location}</p>
                  
                  <div className="language-exchange-info">
                    <div className="language-item">
                      <span className="language-label">Native:</span>
                      <span className="language-value">{partner.nativeLanguage}</span>
                    </div>
                    <div className="language-item">
                      <span className="language-label">Learning:</span>
                      <span className="language-value">{partner.learningLanguage}</span>
                    </div>
                    <div className="language-item">
                      <span className="language-label">Level:</span>
                      <span className="language-value">{partner.level}</span>
                    </div>
                  </div>
                  
                  <div className="partner-interests">
                    <span className="interests-label">Interests:</span>
                    <div className="interests-list">
                      {partner.interests.map((interest, idx) => (
                        <span key={idx} className="interest-tag">{interest}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="partner-stats">
                    <span className="stat-item">{partner.sessions} sessions completed</span>
                  </div>
                </div>
                
                <div className="partner-actions">
                  <button className="connect-btn">🤝 Connect</button>
                  <button className="message-btn">💌 Message</button>
                  <button className="favorite-btn">⭐</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="events-section">
          <div className="events-header">
            <h3>🎉 Upcoming Language Exchange Events</h3>
            <button className="create-event-btn">➕ Create Event</button>
          </div>
          
          <div className="events-list">
            {upcomingEvents.map((event, index) => (
              <div key={event.id} className="event-card" style={{ '--delay': `${index * 0.1}s` }}>
                <div className="event-info">
                  <h4 className="event-title">{event.title}</h4>
                  <div className="event-details">
                    <span className="event-date">📅 {event.date}</span>
                    <span className="event-language">🗣️ {event.language}</span>
                    <span className="event-type">🎥 {event.type}</span>
                    <span className="event-host">👤 Host: {event.host}</span>
                  </div>
                  <div className="event-participants">
                    👥 {event.participants}/{event.maxParticipants} participants
                  </div>
                </div>
                <div className="event-actions">
                  <button className="join-event-btn">✅ Join Event</button>
                  <button className="remind-btn">🔔 Remind Me</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'my-exchanges' && (
        <div className="my-exchanges-section">
          <div className="exchanges-header">
            <h3>💬 My Active Exchanges</h3>
            <div className="exchange-stats">
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Active Partners</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">23</span>
                <span className="stat-label">Sessions This Month</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.7</span>
                <span className="stat-label">Average Rating</span>
              </div>
            </div>
          </div>
          
          <div className="active-exchanges">
            <div className="exchange-item">
              <div className="exchange-partner">
                <div className="partner-avatar">👩‍🎓</div>
                <div className="partner-details">
                  <h4>Maria Rodriguez</h4>
                  <p>Spanish ↔ Hindi Exchange</p>
                  <span className="last-session">Last session: 2 days ago</span>
                </div>
              </div>
              <div className="exchange-actions">
                <button className="schedule-btn">📅 Schedule</button>
                <button className="chat-btn">💬 Chat</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageExchange;
