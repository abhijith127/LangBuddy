import React, { useState, useEffect } from 'react';
import { getUserProgress } from '../../../utils/userProgress';
import './Resources.css';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [userProgress, setUserProgress] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: 'all', name: 'All Resources', icon: '📚', color: '#3498db' },
    { id: 'audio-video', name: 'Audio & Video', icon: '🎬', color: '#e74c3c' },
    { id: 'reading', name: 'Reading Materials', icon: '📖', color: '#2ecc71' },
    { id: 'music', name: 'Music & Lyrics', icon: '🎵', color: '#f39c12' },
    { id: 'reference', name: 'Reference Tools', icon: '📝', color: '#9b59b6' },
    { id: 'cultural', name: 'Cultural Notes', icon: '🏛️', color: '#1abc9c' },
    { id: 'external', name: 'External Links', icon: '🔗', color: '#34495e' },
    { id: 'practice', name: 'Practice Tools', icon: '🎯', color: '#e67e22' },
    { id: 'help', name: 'FAQs & Help', icon: '❓', color: '#95a5a6' },
    { id: 'community', name: 'Community Content', icon: '👥', color: '#8e44ad' }
  ];

  const languages = [
    { code: 'all', name: 'All Languages', flag: '🌍' },
    { code: 'hindi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'bengali', name: 'Bengali', flag: '🇮🇳' },
    { code: 'gujarati', name: 'Gujarati', flag: '🇮🇳' },
    { code: 'marathi', name: 'Marathi', flag: '🇮🇳' },
    { code: 'punjabi', name: 'Punjabi', flag: '🇮🇳' },
    { code: 'kannada', name: 'Kannada', flag: '🇮🇳' },
    { code: 'tamil', name: 'Tamil', flag: '🇮🇳' },
    { code: 'telugu', name: 'Telugu', flag: '🇮🇳' },
    { code: 'malayalam', name: 'Malayalam', flag: '🇮🇳' },
    { code: 'odia', name: 'Odia', flag: '🇮🇳' },
    { code: 'assamese', name: 'Assamese', flag: '🇮🇳' },
    { code: 'urdu', name: 'Urdu', flag: '🇮🇳' },
    { code: 'sanskrit', name: 'Sanskrit', flag: '🇮🇳' },
    { code: 'nepali', name: 'Nepali', flag: '🇳🇵' }
  ];

  const levels = [
    { id: 'all', name: 'All Levels', icon: '🎯' },
    { id: 'beginner', name: 'Beginner', icon: '🌱' },
    { id: 'intermediate', name: 'Intermediate', icon: '🌿' },
    { id: 'advanced', name: 'Advanced', icon: '🌳' }
  ];

  // Sample resources data
  const resources = [
    // Audio & Video Content
    {
      id: 1,
      category: 'audio-video',
      type: 'podcast',
      title: 'Hindi Learning Podcast',
      description: 'Daily conversations and grammar lessons in Hindi',
      language: 'hindi',
      level: 'beginner',
      duration: '15-30 min',
      rating: 4.8,
      thumbnail: '🎧',
      url: '#',
      tags: ['conversation', 'grammar', 'daily-use'],
      featured: true
    },
    {
      id: 2,
      category: 'audio-video',
      type: 'video',
      title: 'Bengali Culture Documentary',
      description: 'Explore Bengali traditions and festivals',
      language: 'bengali',
      level: 'intermediate',
      duration: '45 min',
      rating: 4.9,
      thumbnail: '🎬',
      url: '#',
      tags: ['culture', 'traditions', 'festivals'],
      featured: true
    },
    // Reading Materials
    {
      id: 3,
      category: 'reading',
      type: 'ebook',
      title: 'Short Stories in Hindi',
      description: 'Collection of beginner-friendly Hindi stories',
      language: 'hindi',
      level: 'beginner',
      pages: 120,
      rating: 4.7,
      thumbnail: '📚',
      url: '#',
      tags: ['stories', 'fiction', 'graded-reader'],
      featured: false
    },
    {
      id: 4,
      category: 'reading',
      type: 'news',
      title: 'Daily News in Tamil',
      description: 'Current events and news articles in Tamil',
      language: 'tamil',
      level: 'advanced',
      rating: 4.6,
      thumbnail: '📰',
      url: '#',
      tags: ['news', 'current-events', 'politics'],
      featured: false
    },
    // Music & Lyrics
    {
      id: 5,
      category: 'music',
      type: 'playlist',
      title: 'Bollywood Hits with Lyrics',
      description: 'Popular Hindi songs with synchronized lyrics',
      language: 'hindi',
      level: 'intermediate',
      songs: 25,
      rating: 4.9,
      thumbnail: '🎵',
      url: '#',
      tags: ['bollywood', 'popular', 'lyrics'],
      featured: true
    },
    // Reference Tools
    {
      id: 6,
      category: 'reference',
      type: 'dictionary',
      title: 'Hindi-English Dictionary',
      description: 'Comprehensive dictionary with pronunciation',
      language: 'hindi',
      level: 'all',
      entries: 50000,
      rating: 4.8,
      thumbnail: '📖',
      url: '#',
      tags: ['dictionary', 'pronunciation', 'comprehensive'],
      featured: true
    },
    // Cultural Notes
    {
      id: 7,
      category: 'cultural',
      type: 'article',
      title: 'Indian Festivals Guide',
      description: 'Complete guide to major Indian festivals',
      language: 'all',
      level: 'beginner',
      rating: 4.7,
      thumbnail: '🎭',
      url: '#',
      tags: ['festivals', 'traditions', 'culture'],
      featured: false
    },
    // External Links
    {
      id: 8,
      category: 'external',
      type: 'website',
      title: 'Language Exchange Platform',
      description: 'Connect with native speakers worldwide',
      language: 'all',
      level: 'all',
      rating: 4.6,
      thumbnail: '🌐',
      url: '#',
      tags: ['exchange', 'conversation', 'native-speakers'],
      featured: false
    },
    // Practice Tools
    {
      id: 9,
      category: 'practice',
      type: 'worksheet',
      title: 'Hindi Grammar Worksheets',
      description: 'Printable worksheets for grammar practice',
      language: 'hindi',
      level: 'intermediate',
      rating: 4.5,
      thumbnail: '📄',
      url: '#',
      tags: ['grammar', 'printable', 'exercises'],
      featured: false
    },
    // Help & FAQs
    {
      id: 10,
      category: 'help',
      type: 'guide',
      title: 'Effective Study Techniques',
      description: 'Tips for efficient language learning',
      language: 'all',
      level: 'all',
      rating: 4.8,
      thumbnail: '💡',
      url: '#',
      tags: ['study-tips', 'efficiency', 'techniques'],
      featured: true
    }
  ];

  useEffect(() => {
    const progress = getUserProgress();
    setUserProgress(progress);
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('langbuddy_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  };

  const toggleFavorite = (resourceId) => {
    const newFavorites = favorites.includes(resourceId)
      ? favorites.filter(id => id !== resourceId)
      : [...favorites, resourceId];
    
    setFavorites(newFavorites);
    localStorage.setItem('langbuddy_favorites', JSON.stringify(newFavorites));
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage || resource.language === 'all';
    const matchesLevel = selectedLevel === 'all' || resource.level === selectedLevel || resource.level === 'all';
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesLanguage && matchesLevel && matchesSearch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="resources">
      <div className="resources-header">
        <div className="header-content">
          <h1 className="resources-title">📖 Resources & Library</h1>
          <p className="resources-subtitle">Discover curated content to enhance your language learning journey</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-icon">📚</span>
            <div className="stat-info">
              <span className="stat-number">{resources.length}</span>
              <span className="stat-label">Total Resources</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <div className="stat-info">
              <span className="stat-number">{favorites.length}</span>
              <span className="stat-label">Favorites</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🎯</span>
            <div className="stat-info">
              <span className="stat-number">{categories.length - 1}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="resources-controls">
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="view-toggle">
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

        <div className="filters-section">
          <div className="filter-group">
            <label className="filter-label">Language:</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="filter-select"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Level:</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="filter-select"
            >
              {levels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.icon} {level.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="category-nav">
        {categories.map((category, index) => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
            style={{ '--delay': `${index * 0.1}s`, '--color': category.color }}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
            <span className="category-count">
              {category.id === 'all' ? resources.length : resources.filter(r => r.category === category.id).length}
            </span>
          </button>
        ))}
      </div>

      <div className="resources-content">
        {/* Featured Resources */}
        {activeCategory === 'all' && (
          <section className="featured-section">
            <div className="section-header">
              <h2 className="section-title">⭐ Featured Resources</h2>
              <p className="section-subtitle">Hand-picked content for effective learning</p>
            </div>
            <div className="featured-grid">
              {featuredResources.slice(0, 4).map((resource, index) => (
                <div
                  key={resource.id}
                  className="featured-card"
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className="featured-badge">⭐ Featured</div>
                  <div className="resource-thumbnail">{resource.thumbnail}</div>
                  <div className="resource-content">
                    <h3 className="resource-title">{resource.title}</h3>
                    <p className="resource-description">{resource.description}</p>
                    <div className="resource-meta">
                      <span className="resource-language">
                        {languages.find(l => l.code === resource.language)?.flag} {resource.language}
                      </span>
                      <span className="resource-level">{resource.level}</span>
                      <span className="resource-rating">⭐ {resource.rating}</span>
                    </div>
                  </div>
                  <div className="resource-actions">
                    <button
                      className={`favorite-btn ${favorites.includes(resource.id) ? 'favorited' : ''}`}
                      onClick={() => toggleFavorite(resource.id)}
                    >
                      {favorites.includes(resource.id) ? '❤️' : '🤍'}
                    </button>
                    <button className="access-btn">
                      Access →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Main Resources Grid/List */}
        <section className="main-resources">
          <div className="section-header">
            <h2 className="section-title">
              {categories.find(c => c.id === activeCategory)?.icon} {categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <p className="section-subtitle">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className={`resources-grid ${viewMode}`}>
            {filteredResources.map((resource, index) => (
              <div
                key={resource.id}
                className="resource-card"
                style={{ '--delay': `${index * 0.05}s` }}
              >
                <div className="resource-header">
                  <div className="resource-thumbnail">{resource.thumbnail}</div>
                  <div className="resource-type">{resource.type}</div>
                  <button
                    className={`favorite-btn ${favorites.includes(resource.id) ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(resource.id)}
                  >
                    {favorites.includes(resource.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                <div className="resource-body">
                  <h3 className="resource-title">{resource.title}</h3>
                  <p className="resource-description">{resource.description}</p>
                  <div className="resource-tags">
                    {resource.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="resource-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="resource-footer">
                  <div className="resource-meta">
                    <span className="resource-language">
                      {languages.find(l => l.code === resource.language)?.flag} {resource.language}
                    </span>
                    <span className="resource-level">{resource.level}</span>
                    <span className="resource-rating">⭐ {resource.rating}</span>
                  </div>
                  <button className="access-btn">
                    Access →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3 className="no-results-title">No resources found</h3>
              <p className="no-results-text">Try adjusting your search criteria or browse different categories</p>
              <button className="clear-filters-btn" onClick={() => {
                setSearchTerm('');
                setSelectedLanguage('all');
                setSelectedLevel('all');
                setActiveCategory('all');
              }}>
                Clear All Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Resources;
