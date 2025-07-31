import React, { useState, useEffect } from 'react';
import { getUserProgress } from '../../../utils/userProgress';
import './Courses.css';

const languages = [
  { code: 'hindi', label: 'हिंदी (Hindi)', flag: '🇮🇳', difficulty: 'Beginner', lessons: 20, description: 'Most widely spoken language in India' },
  { code: 'bengali', label: 'বাংলা (Bengali)', flag: '🇮🇳', difficulty: 'Beginner', lessons: 18, description: 'Language of literature and culture' },
  { code: 'gujarati', label: 'ગુજરાતી (Gujarati)', flag: '🇮🇳', difficulty: 'Beginner', lessons: 16, description: 'Business language of western India' },
  { code: 'marathi', label: 'मराठी (Marathi)', flag: '🇮🇳', difficulty: 'Beginner', lessons: 17, description: 'Rich literary tradition' },
  { code: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳', difficulty: 'Beginner', lessons: 15, description: 'Language of the Sikh community' },
  { code: 'kannada', label: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳', difficulty: 'Intermediate', lessons: 19, description: 'Classical language of Karnataka' },
  { code: 'tamil', label: 'தமிழ் (Tamil)', flag: '🇮🇳', difficulty: 'Intermediate', lessons: 22, description: 'One of the oldest languages' },
  { code: 'telugu', label: 'తెలుగు (Telugu)', flag: '🇮🇳', difficulty: 'Intermediate', lessons: 21, description: 'Sweetest language of India' },
  { code: 'malayalam', label: 'മലയാളം (Malayalam)', flag: '🇮🇳', difficulty: 'Advanced', lessons: 20, description: 'Language of Kerala' },
  { code: 'odia', label: 'ଓଡ଼ିଆ (Odia)', flag: '🇮🇳', difficulty: 'Intermediate', lessons: 16, description: 'Classical language of Odisha' },
  { code: 'assamese', label: 'অসমীয়া (Assamese)', flag: '🇮🇳', difficulty: 'Intermediate', lessons: 15, description: 'Language of Assam' },
  { code: 'urdu', label: 'اردو (Urdu)', flag: '🇮🇳', difficulty: 'Advanced', lessons: 24, description: 'Language of poetry and literature' },
  { code: 'sanskrit', label: 'संस्कृत (Sanskrit)', flag: '🇮🇳', difficulty: 'Advanced', lessons: 30, description: 'Ancient language of knowledge' },
  { code: 'nepali', label: 'नेपाली (Nepali)', flag: '🇳🇵', difficulty: 'Beginner', lessons: 14, description: 'Language of the Himalayas' }
];

const lessonTypes = [
  { id: 'vocabulary', icon: '📝', name: 'Vocabulary', description: 'Learn new words and meanings' },
  { id: 'grammar', icon: '📚', name: 'Grammar', description: 'Understand language structure' },
  { id: 'pronunciation', icon: '🗣️', name: 'Pronunciation', description: 'Perfect your speaking skills' },
  { id: 'conversation', icon: '💬', name: 'Conversation', description: 'Practice real-world dialogues' },
  { id: 'culture', icon: '🎭', name: 'Culture', description: 'Learn about traditions and customs' },
  { id: 'writing', icon: '✍️', name: 'Writing', description: 'Master the script and writing' }
];

export default function Courses({ onStartLesson }) {
  const [userProgress, setUserProgress] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const progress = getUserProgress();
    setUserProgress(progress);
  }, []);

  const getLanguageProgress = (languageCode) => {
    if (!userProgress || !userProgress.languages[languageCode]) {
      return { progress: 0, completed: false, bestScore: 0 };
    }
    const langData = userProgress.languages[languageCode];
    return {
      progress: Math.min(langData.attempts * 5, 100), // Rough progress calculation
      completed: langData.completed,
      bestScore: langData.bestScore
    };
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#2ecc71';
      case 'Intermediate': return '#f39c12';
      case 'Advanced': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const filteredLanguages = languages.filter(lang => {
    const matchesSearch = lang.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lang.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'All' || lang.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const generateLessons = (language) => {
    const lessons = [];
    const baseTopics = [
      'Basic Greetings', 'Numbers 1-10', 'Family Members', 'Colors', 'Days of Week',
      'Food & Drinks', 'Body Parts', 'Animals', 'Weather', 'Directions',
      'Time & Clock', 'Shopping', 'Transportation', 'Emotions', 'Professions',
      'House & Home', 'Clothing', 'Festivals', 'Nature', 'Technology'
    ];
    
    for (let i = 0; i < language.lessons; i++) {
      const topic = baseTopics[i % baseTopics.length];
      const lessonNumber = i + 1;
      lessons.push({
        id: `${language.code}-lesson-${lessonNumber}`,
        number: lessonNumber,
        title: `${topic} ${lessonNumber > baseTopics.length ? 'Advanced' : ''}`,
        type: lessonTypes[i % lessonTypes.length],
        duration: Math.floor(Math.random() * 20) + 10, // 10-30 minutes
        completed: Math.random() > 0.7, // Random completion for demo
        locked: lessonNumber > 1 && Math.random() > 0.8 // Some lessons locked
      });
    }
    return lessons;
  };

  if (selectedLanguage) {
    const lessons = generateLessons(selectedLanguage);
    const progress = getLanguageProgress(selectedLanguage.code);
    
    return (
      <div className="course-detail">
        <div className="course-header">
          <button className="back-btn" onClick={() => setSelectedLanguage(null)}>
            ← Back to Courses
          </button>
          <div className="course-info">
            <div className="course-title-section">
              <h1 className="course-title">
                {selectedLanguage.flag} {selectedLanguage.label}
              </h1>
              <div className="course-meta">
                <span className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(selectedLanguage.difficulty) }}>
                  {selectedLanguage.difficulty}
                </span>
                <span className="lesson-count">{selectedLanguage.lessons} Lessons</span>
                <span className="progress-text">{progress.progress}% Complete</span>
              </div>
            </div>
            <p className="course-description">{selectedLanguage.description}</p>
          </div>
        </div>

        <div className="course-progress-bar">
          <div className="progress-fill" style={{ width: `${progress.progress}%` }}></div>
        </div>

        <div className="lesson-types-grid">
          {lessonTypes.map(type => (
            <div key={type.id} className="lesson-type-card">
              <div className="type-icon">{type.icon}</div>
              <div className="type-info">
                <h3 className="type-name">{type.name}</h3>
                <p className="type-description">{type.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lessons-section">
          <h2 className="section-title">📚 Course Curriculum</h2>
          <div className="lessons-grid">
            {lessons.map(lesson => (
              <div key={lesson.id} className={`lesson-card ${lesson.completed ? 'completed' : ''} ${lesson.locked ? 'locked' : ''}`}>
                <div className="lesson-header">
                  <div className="lesson-number">
                    {lesson.completed ? '✅' : lesson.locked ? '🔒' : lesson.number}
                  </div>
                  <div className="lesson-type-icon">{lesson.type.icon}</div>
                </div>
                <div className="lesson-content">
                  <h3 className="lesson-title">{lesson.title}</h3>
                  <div className="lesson-meta">
                    <span className="lesson-type">{lesson.type.name}</span>
                    <span className="lesson-duration">⏱️ {lesson.duration} min</span>
                  </div>
                </div>
                <button 
                  className={`lesson-btn ${lesson.locked ? 'disabled' : ''}`}
                  onClick={() => !lesson.locked && onStartLesson(selectedLanguage.code, lesson)}
                  disabled={lesson.locked}
                >
                  {lesson.completed ? 'Review' : lesson.locked ? 'Locked' : 'Start'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="courses">
      <div className="courses-header">
        <h1 className="page-title">📚 Language Courses</h1>
        <p className="page-subtitle">Choose your learning path and start your language journey</p>
      </div>

      <div className="courses-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="difficulty-filters">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(difficulty => (
            <button
              key={difficulty}
              className={`filter-btn ${filterDifficulty === difficulty ? 'active' : ''}`}
              onClick={() => setFilterDifficulty(difficulty)}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>

      <div className="courses-stats">
        <div className="stat-item">
          <span className="stat-number">{languages.length}</span>
          <span className="stat-label">Languages Available</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{userProgress ? Object.keys(userProgress.languages).length : 0}</span>
          <span className="stat-label">Languages Started</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{userProgress ? Object.values(userProgress.languages).filter(l => l.completed).length : 0}</span>
          <span className="stat-label">Languages Completed</span>
        </div>
      </div>

      <div className="languages-grid">
        {filteredLanguages.map(language => {
          const progress = getLanguageProgress(language.code);
          return (
            <div key={language.code} className="language-card" onClick={() => setSelectedLanguage(language)}>
              <div className="card-header">
                <div className="language-flag">{language.flag}</div>
                <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(language.difficulty) }}>
                  {language.difficulty}
                </div>
              </div>
              <div className="card-content">
                <h3 className="language-name">{language.label}</h3>
                <p className="language-description">{language.description}</p>
                <div className="language-meta">
                  <span className="lesson-count">📚 {language.lessons} lessons</span>
                  {progress.completed && <span className="completed-badge">✅ Completed</span>}
                </div>
              </div>
              <div className="card-footer">
                <div className="progress-section">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress.progress}%` }}></div>
                  </div>
                  <span className="progress-text">{progress.progress}% complete</span>
                </div>
                <button className="start-btn">
                  {progress.progress > 0 ? 'Continue' : 'Start Learning'} →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
