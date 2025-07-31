import React, { useState } from 'react';

const LiveEvents = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const events = [
    {
      id: 1,
      title: 'Hindi Language Café',
      description: 'Casual conversation practice with native speakers',
      date: 'Today',
      time: '7:00 PM IST',
      duration: '1 hour',
      type: 'Language Café',
      language: 'Hindi',
      host: 'Priya Sharma',
      participants: 12,
      maxParticipants: 20,
      level: 'All Levels',
      status: 'upcoming',
      tags: ['conversation', 'casual', 'practice']
    },
    {
      id: 2,
      title: 'Bengali Grammar Workshop',
      description: 'Deep dive into Bengali verb conjugations',
      date: 'Tomorrow',
      time: '6:30 PM IST',
      duration: '90 minutes',
      type: 'Workshop',
      language: 'Bengali',
      host: 'Dr. Anita Das',
      participants: 8,
      maxParticipants: 15,
      level: 'Intermediate',
      status: 'upcoming',
      tags: ['grammar', 'workshop', 'verbs']
    },
    {
      id: 3,
      title: 'Tamil Poetry Reading',
      description: 'Explore classical Tamil poetry with expert guidance',
      date: 'Dec 25',
      time: '5:00 PM IST',
      duration: '2 hours',
      type: 'Cultural Event',
      language: 'Tamil',
      host: 'Meera Krishnan',
      participants: 15,
      maxParticipants: 25,
      level: 'Advanced',
      status: 'upcoming',
      tags: ['poetry', 'culture', 'literature']
    }
  ];

  const eventTypes = [
    { id: 'all', name: 'All Events', icon: '🎉', count: 23 },
    { id: 'cafe', name: 'Language Cafés', icon: '☕', count: 8 },
    { id: 'workshop', name: 'Workshops', icon: '🛠️', count: 6 },
    { id: 'cultural', name: 'Cultural Events', icon: '🎭', count: 5 },
    { id: 'qa', name: 'Q&A Sessions', icon: '❓', count: 4 }
  ];

  return (
    <div className="live-events">
      <div className="events-header">
        <div className="header-info">
          <h2 className="events-title">📅 Live Events & Meetups</h2>
          <p className="events-subtitle">Join virtual language events and connect with the community</p>
        </div>
        <div className="header-actions">
          <button className="create-event-btn">➕ Host Event</button>
          <button className="my-events-btn">📋 My Events</button>
        </div>
      </div>

      <div className="events-filters">
        {eventTypes.map((type, index) => (
          <button
            key={type.id}
            className={`filter-btn ${activeFilter === type.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(type.id)}
            style={{ '--delay': `${index * 0.1}s` }}
          >
            <span className="filter-icon">{type.icon}</span>
            <span className="filter-name">{type.name}</span>
            <span className="filter-count">{type.count}</span>
          </button>
        ))}
      </div>

      <div className="events-grid">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="event-card"
            style={{ '--delay': `${index * 0.1}s` }}
          >
            <div className="event-header">
              <div className="event-type-badge">{event.type}</div>
              <div className="event-language">{event.language}</div>
              <div className={`event-status ${event.status}`}>
                {event.status === 'live' && '🔴 LIVE'}
                {event.status === 'upcoming' && '⏰ Upcoming'}
                {event.status === 'ended' && '✅ Ended'}
              </div>
            </div>

            <div className="event-content">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>

              <div className="event-details">
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <span className="detail-text">{event.date} at {event.time}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">⏱️</span>
                  <span className="detail-text">{event.duration}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">👤</span>
                  <span className="detail-text">Host: {event.host}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🎯</span>
                  <span className="detail-text">Level: {event.level}</span>
                </div>
              </div>

              <div className="event-participants">
                <span className="participants-count">
                  👥 {event.participants}/{event.maxParticipants} participants
                </span>
                <div className="participants-bar">
                  <div 
                    className="participants-fill"
                    style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="event-tags">
                {event.tags.map((tag, idx) => (
                  <span key={idx} className="event-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="event-footer">
              <button className="join-event-btn">
                {event.status === 'live' ? '🔴 Join Live' : '📝 Register'}
              </button>
              <div className="event-actions">
                <button className="remind-btn" title="Set Reminder">🔔</button>
                <button className="share-btn" title="Share Event">📤</button>
                <button className="favorite-btn" title="Add to Favorites">⭐</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="upcoming-schedule">
        <h3 className="schedule-title">📋 This Week's Schedule</h3>
        <div className="schedule-timeline">
          <div className="timeline-item">
            <div className="timeline-time">Today 7:00 PM</div>
            <div className="timeline-event">Hindi Language Café</div>
            <div className="timeline-participants">12 registered</div>
          </div>
          <div className="timeline-item">
            <div className="timeline-time">Tomorrow 6:30 PM</div>
            <div className="timeline-event">Bengali Grammar Workshop</div>
            <div className="timeline-participants">8 registered</div>
          </div>
          <div className="timeline-item">
            <div className="timeline-time">Dec 25 5:00 PM</div>
            <div className="timeline-event">Tamil Poetry Reading</div>
            <div className="timeline-participants">15 registered</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveEvents;
