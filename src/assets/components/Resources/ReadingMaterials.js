import React, { useState } from 'react';
import './ReadingMaterials.css';

const ReadingMaterials = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('ebooks');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedReading, setSelectedReading] = useState(null);

  const readingCategories = [
    { id: 'ebooks', name: 'E-books & Stories', icon: '📚', color: '#2ecc71' },
    { id: 'news', name: 'News & Articles', icon: '📰', color: '#3498db' },
    { id: 'comics', name: 'Comics & Illustrated', icon: '📖', color: '#f39c12' },
    { id: 'poetry', name: 'Poetry & Literature', icon: '📜', color: '#9b59b6' }
  ];

  const readingMaterials = {
    ebooks: [
      {
        id: 1,
        title: 'Hindi Short Stories for Beginners',
        author: 'Rajesh Kumar',
        description: 'Collection of simple Hindi stories with vocabulary help',
        language: 'hindi',
        level: 'beginner',
        pages: 120,
        rating: 4.8,
        thumbnail: '📚',
        hasAudio: true,
        hasGlossary: true,
        tags: ['stories', 'vocabulary', 'graded-reader'],
        preview: 'एक बार की बात है, एक छोटे से गाँव में राम नाम का एक लड़का रहता था...'
      },
      {
        id: 2,
        title: 'Bengali Folk Tales',
        author: 'Anita Sen',
        description: 'Traditional Bengali stories with cultural context',
        language: 'bengali',
        level: 'intermediate',
        pages: 200,
        rating: 4.7,
        thumbnail: '📖',
        hasAudio: false,
        hasGlossary: true,
        tags: ['folklore', 'culture', 'traditional'],
        preview: 'অনেক দিন আগের কথা। একটি ছোট গ্রামে একজন জেলে থাকত...'
      },
      {
        id: 3,
        title: 'Tamil Classic Literature',
        author: 'Dr. Meera Krishnan',
        description: 'Excerpts from famous Tamil literary works',
        language: 'tamil',
        level: 'advanced',
        pages: 300,
        rating: 4.9,
        thumbnail: '📜',
        hasAudio: true,
        hasGlossary: true,
        tags: ['literature', 'classic', 'poetry'],
        preview: 'தமிழ் இலக்கியத்தின் பொன்னான வரிகள்...'
      }
    ],
    news: [
      {
        id: 4,
        title: 'Daily Hindi News Digest',
        author: 'News Team',
        description: 'Current events and news in simple Hindi',
        language: 'hindi',
        level: 'intermediate',
        articles: 50,
        rating: 4.6,
        thumbnail: '📰',
        hasAudio: true,
        hasGlossary: false,
        tags: ['news', 'current-events', 'politics'],
        preview: 'आज की मुख्य खबरें: भारत में नई शिक्षा नीति...'
      },
      {
        id: 5,
        title: 'Bengali Business News',
        author: 'Business Desk',
        description: 'Business and economic news in Bengali',
        language: 'bengali',
        level: 'advanced',
        articles: 30,
        rating: 4.5,
        thumbnail: '💼',
        hasAudio: false,
        hasGlossary: true,
        tags: ['business', 'economics', 'finance'],
        preview: 'ব্যবসায়িক জগতের আজকের খবর...'
      }
    ],
    comics: [
      {
        id: 6,
        title: 'Hindi Comic Adventures',
        author: 'Comic Studio',
        description: 'Fun comic stories for language learning',
        language: 'hindi',
        level: 'beginner',
        issues: 25,
        rating: 4.7,
        thumbnail: '🦸',
        hasAudio: true,
        hasGlossary: true,
        tags: ['comics', 'adventure', 'visual'],
        preview: 'सुपर हीरो की कहानी...'
      },
      {
        id: 7,
        title: 'Gujarati Folk Comics',
        author: 'Folk Art Collective',
        description: 'Traditional Gujarati stories in comic format',
        language: 'gujarati',
        level: 'intermediate',
        issues: 15,
        rating: 4.6,
        thumbnail: '🎭',
        hasAudio: false,
        hasGlossary: true,
        tags: ['folklore', 'traditional', 'visual'],
        preview: 'ગુજરાતી લોક કથાઓ...'
      }
    ],
    poetry: [
      {
        id: 8,
        title: 'Modern Hindi Poetry',
        author: 'Various Poets',
        description: 'Contemporary Hindi poetry collection',
        language: 'hindi',
        level: 'advanced',
        poems: 100,
        rating: 4.8,
        thumbnail: '🌹',
        hasAudio: true,
        hasGlossary: true,
        tags: ['poetry', 'modern', 'literature'],
        preview: 'आधुनिक हिंदी कविता की दुनिया...'
      },
      {
        id: 9,
        title: 'Tamil Classical Poetry',
        author: 'Ancient Poets',
        description: 'Classical Tamil poetry with translations',
        language: 'tamil',
        level: 'advanced',
        poems: 75,
        rating: 4.9,
        thumbnail: '🏛️',
        hasAudio: true,
        hasGlossary: true,
        tags: ['classical', 'poetry', 'ancient'],
        preview: 'தமிழ் இலக்கியத்தின் செம்மணி...'
      }
    ]
  };

  const levels = [
    { id: 'all', name: 'All Levels', icon: '🎯' },
    { id: 'beginner', name: 'Beginner', icon: '🌱' },
    { id: 'intermediate', name: 'Intermediate', icon: '🌿' },
    { id: 'advanced', name: 'Advanced', icon: '🌳' }
  ];

  const filteredMaterials = readingMaterials[activeCategory]?.filter(material => 
    selectedLevel === 'all' || material.level === selectedLevel
  ) || [];

  const handleReadingSelect = (reading) => {
    setSelectedReading(reading);
  };

  const handleStartReading = (reading) => {
    // In a real app, this would open the reading interface
    alert(`Starting to read: ${reading.title}`);
  };

  return (
    <div className="reading-materials">
      <div className="reading-header">
        <button className="back-btn" onClick={onBack}>← Back to Resources</button>
        <h1 className="reading-title">📖 Reading Materials</h1>
        <div className="reading-stats">
          <span className="total-materials">
            {Object.values(readingMaterials).flat().length} materials
          </span>
        </div>
      </div>

      <div className="reading-controls">
        <div className="category-tabs">
          {readingCategories.map((category, index) => (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
              style={{ '--color': category.color, '--delay': `${index * 0.1}s` }}
            >
              <span className="tab-icon">{category.icon}</span>
              <span className="tab-name">{category.name}</span>
              <span className="tab-count">{readingMaterials[category.id]?.length || 0}</span>
            </button>
          ))}
        </div>

        <div className="level-filter">
          <label className="filter-label">Level:</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="level-select"
          >
            {levels.map(level => (
              <option key={level.id} value={level.id}>
                {level.icon} {level.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="materials-grid">
        {filteredMaterials.map((material, index) => (
          <div
            key={material.id}
            className="material-card"
            style={{ '--delay': `${index * 0.1}s` }}
            onClick={() => handleReadingSelect(material)}
          >
            <div className="material-header">
              <div className="material-thumbnail">{material.thumbnail}</div>
              <div className="material-badges">
                {material.hasAudio && <div className="audio-badge">🎧 Audio</div>}
                {material.hasGlossary && <div className="glossary-badge">📝 Glossary</div>}
              </div>
            </div>

            <div className="material-content">
              <h3 className="material-title">{material.title}</h3>
              <p className="material-author">by {material.author}</p>
              <p className="material-description">{material.description}</p>

              <div className="material-preview">
                <div className="preview-label">Preview:</div>
                <div className="preview-text">{material.preview}</div>
              </div>

              <div className="material-meta">
                <span className="material-language">{material.language}</span>
                <span className="material-level">{material.level}</span>
                <span className="material-rating">⭐ {material.rating}</span>
              </div>

              <div className="material-details">
                <span className="material-count">
                  {material.pages && `${material.pages} pages`}
                  {material.articles && `${material.articles} articles`}
                  {material.issues && `${material.issues} issues`}
                  {material.poems && `${material.poems} poems`}
                </span>
              </div>

              <div className="material-tags">
                {material.tags.map((tag, idx) => (
                  <span key={idx} className="material-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="material-actions">
              <button 
                className="read-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartReading(material);
                }}
              >
                📖 Read
              </button>
              <button className="bookmark-btn">🔖</button>
              <button className="download-btn">⬇️</button>
            </div>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="no-materials">
          <div className="no-materials-icon">📚</div>
          <h3 className="no-materials-title">No materials found</h3>
          <p className="no-materials-text">Try selecting a different category or level</p>
        </div>
      )}

      {/* Reading Detail Modal */}
      {selectedReading && (
        <div className="reading-modal" onClick={() => setSelectedReading(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{selectedReading.title}</h2>
              <button 
                className="modal-close"
                onClick={() => setSelectedReading(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-thumbnail">{selectedReading.thumbnail}</div>
              <div className="modal-info">
                <p className="modal-author">by {selectedReading.author}</p>
                <p className="modal-description">{selectedReading.description}</p>
                <div className="modal-preview">
                  <h4>Preview:</h4>
                  <div className="preview-text">{selectedReading.preview}</div>
                </div>
                <div className="modal-meta">
                  <div className="meta-item">
                    <strong>Language:</strong> {selectedReading.language}
                  </div>
                  <div className="meta-item">
                    <strong>Level:</strong> {selectedReading.level}
                  </div>
                  <div className="meta-item">
                    <strong>Rating:</strong> ⭐ {selectedReading.rating}
                  </div>
                </div>
                <div className="modal-features">
                  {selectedReading.hasAudio && <span className="feature">🎧 Audio Available</span>}
                  {selectedReading.hasGlossary && <span className="feature">📝 Glossary Included</span>}
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="modal-read-btn"
                onClick={() => handleStartReading(selectedReading)}
              >
                📖 Start Reading
              </button>
              <button className="modal-bookmark-btn">🔖 Bookmark</button>
              <button className="modal-download-btn">⬇️ Download</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingMaterials;
