import React, { useState } from 'react';
import './AudioVideoResources.css';

const AudioVideoResources = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('podcasts');
  const [selectedResource, setSelectedResource] = useState(null);

  const audioVideoContent = {
    podcasts: [
      {
        id: 1,
        title: 'Hindi Learning Podcast',
        description: 'Daily conversations and grammar lessons',
        language: 'hindi',
        level: 'beginner',
        episodes: 150,
        duration: '15-30 min',
        rating: 4.8,
        thumbnail: '🎧',
        hasTranscripts: true,
        tags: ['conversation', 'grammar', 'daily-use']
      },
      {
        id: 2,
        title: 'Bengali Stories Podcast',
        description: 'Traditional Bengali folktales and stories',
        language: 'bengali',
        level: 'intermediate',
        episodes: 75,
        duration: '20-40 min',
        rating: 4.7,
        thumbnail: '📻',
        hasTranscripts: true,
        tags: ['stories', 'culture', 'traditional']
      },
      {
        id: 3,
        title: 'Tamil News Podcast',
        description: 'Daily news and current events in Tamil',
        language: 'tamil',
        level: 'advanced',
        episodes: 200,
        duration: '10-20 min',
        rating: 4.6,
        thumbnail: '📰',
        hasTranscripts: false,
        tags: ['news', 'current-events', 'politics']
      }
    ],
    videos: [
      {
        id: 4,
        title: 'Hindi Grammar Masterclass',
        description: 'Complete video series on Hindi grammar',
        language: 'hindi',
        level: 'intermediate',
        videos: 25,
        duration: '45-60 min',
        rating: 4.9,
        thumbnail: '🎬',
        hasSubtitles: true,
        tags: ['grammar', 'comprehensive', 'structured']
      },
      {
        id: 5,
        title: 'Bengali Culture Documentary',
        description: 'Explore Bengali traditions and festivals',
        language: 'bengali',
        level: 'intermediate',
        videos: 8,
        duration: '30-45 min',
        rating: 4.8,
        thumbnail: '🎭',
        hasSubtitles: true,
        tags: ['culture', 'traditions', 'festivals']
      },
      {
        id: 6,
        title: 'Gujarati Cooking Show',
        description: 'Learn Gujarati while cooking traditional dishes',
        language: 'gujarati',
        level: 'beginner',
        videos: 15,
        duration: '20-30 min',
        rating: 4.7,
        thumbnail: '👨‍🍳',
        hasSubtitles: true,
        tags: ['cooking', 'culture', 'practical']
      }
    ],
    films: [
      {
        id: 7,
        title: 'Classic Hindi Films Collection',
        description: 'Curated collection of classic Bollywood films',
        language: 'hindi',
        level: 'advanced',
        films: 20,
        duration: '2-3 hours',
        rating: 4.9,
        thumbnail: '🎭',
        hasSubtitles: true,
        tags: ['bollywood', 'classic', 'entertainment']
      },
      {
        id: 8,
        title: 'Bengali Short Films',
        description: 'Award-winning Bengali short films',
        language: 'bengali',
        level: 'intermediate',
        films: 12,
        duration: '15-45 min',
        rating: 4.6,
        thumbnail: '🎬',
        hasSubtitles: true,
        tags: ['short-films', 'art', 'contemporary']
      }
    ]
  };

  const tabs = [
    { id: 'podcasts', name: 'Podcasts', icon: '🎧', color: '#e74c3c' },
    { id: 'videos', name: 'Video Lessons', icon: '🎬', color: '#9b59b6' },
    { id: 'films', name: 'Films & Series', icon: '🎭', color: '#34495e' }
  ];

  const handleResourceSelect = (resource) => {
    setSelectedResource(resource);
  };

  const handlePlayResource = (resource) => {
    // In a real app, this would open the media player
    alert(`Playing: ${resource.title}`);
  };

  return (
    <div className="audio-video-resources">
      <div className="resource-header">
        <button className="back-btn" onClick={onBack}>← Back to Resources</button>
        <h1 className="resource-title">🎬 Audio & Video Content</h1>
        <div className="resource-stats">
          <span className="total-content">
            {Object.values(audioVideoContent).flat().length} items
          </span>
        </div>
      </div>

      <div className="content-tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            style={{ '--color': tab.color, '--delay': `${index * 0.1}s` }}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-name">{tab.name}</span>
            <span className="tab-count">{audioVideoContent[tab.id]?.length || 0}</span>
          </button>
        ))}
      </div>

      <div className="content-grid">
        {audioVideoContent[activeTab]?.map((resource, index) => (
          <div
            key={resource.id}
            className="media-card"
            style={{ '--delay': `${index * 0.1}s` }}
            onClick={() => handleResourceSelect(resource)}
          >
            <div className="media-thumbnail">
              <div className="thumbnail-icon">{resource.thumbnail}</div>
              <div className="play-overlay">
                <button 
                  className="play-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayResource(resource);
                  }}
                >
                  ▶️
                </button>
              </div>
              {resource.hasTranscripts && (
                <div className="transcript-badge">📝 Transcripts</div>
              )}
              {resource.hasSubtitles && (
                <div className="subtitle-badge">💬 Subtitles</div>
              )}
            </div>

            <div className="media-content">
              <h3 className="media-title">{resource.title}</h3>
              <p className="media-description">{resource.description}</p>
              
              <div className="media-meta">
                <span className="media-language">{resource.language}</span>
                <span className="media-level">{resource.level}</span>
                <span className="media-rating">⭐ {resource.rating}</span>
              </div>

              <div className="media-details">
                <span className="media-count">
                  {resource.episodes && `${resource.episodes} episodes`}
                  {resource.videos && `${resource.videos} videos`}
                  {resource.films && `${resource.films} films`}
                </span>
                <span className="media-duration">⏱️ {resource.duration}</span>
              </div>

              <div className="media-tags">
                {resource.tags.map((tag, idx) => (
                  <span key={idx} className="media-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="media-actions">
              <button 
                className="play-btn-small"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayResource(resource);
                }}
              >
                ▶️ Play
              </button>
              <button className="bookmark-btn">🔖</button>
              <button className="share-btn">📤</button>
            </div>
          </div>
        ))}
      </div>

      {/* Resource Detail Modal */}
      {selectedResource && (
        <div className="resource-modal" onClick={() => setSelectedResource(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{selectedResource.title}</h2>
              <button 
                className="modal-close"
                onClick={() => setSelectedResource(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-thumbnail">{selectedResource.thumbnail}</div>
              <div className="modal-info">
                <p className="modal-description">{selectedResource.description}</p>
                <div className="modal-meta">
                  <div className="meta-item">
                    <strong>Language:</strong> {selectedResource.language}
                  </div>
                  <div className="meta-item">
                    <strong>Level:</strong> {selectedResource.level}
                  </div>
                  <div className="meta-item">
                    <strong>Rating:</strong> ⭐ {selectedResource.rating}
                  </div>
                  <div className="meta-item">
                    <strong>Duration:</strong> {selectedResource.duration}
                  </div>
                </div>
                <div className="modal-tags">
                  {selectedResource.tags.map((tag, idx) => (
                    <span key={idx} className="modal-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="modal-play-btn"
                onClick={() => handlePlayResource(selectedResource)}
              >
                ▶️ Play Now
              </button>
              <button className="modal-bookmark-btn">🔖 Bookmark</button>
              <button className="modal-share-btn">📤 Share</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioVideoResources;
