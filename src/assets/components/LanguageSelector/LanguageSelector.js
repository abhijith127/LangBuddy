import React from 'react';
import './LanguageSelector.css';

const languages = [
  { code: 'hindi', label: 'हिंदी (Hindi)', flag: '🇮🇳', description: 'Learn basic Hindi words' },
  { code: 'bengali', label: 'বাংলা (Bengali)', flag: '🇮🇳', description: 'Learn basic Bengali words' },
  { code: 'gujarati', label: 'ગુજરાતી (Gujarati)', flag: '🇮🇳', description: 'Learn basic Gujarati words' },
  { code: 'marathi', label: 'मराठी (Marathi)', flag: '🇮🇳', description: 'Learn basic Marathi words' },
  { code: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳', description: 'Learn basic Punjabi words' },
  { code: 'kannada', label: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳', description: 'Learn basic Kannada words' },
  { code: 'tamil', label: 'தமிழ் (Tamil)', flag: '🇮🇳', description: 'Learn basic Tamil words' },
  { code: 'telugu', label: 'తెలుగు (Telugu)', flag: '🇮🇳', description: 'Learn basic Telugu words' },
  { code: 'malayalam', label: 'മലയാളം (Malayalam)', flag: '🇮🇳', description: 'Learn basic Malayalam words' },
  { code: 'odia', label: 'ଓଡ଼ିଆ (Odia)', flag: '🇮🇳', description: 'Learn basic Odia words' },
  { code: 'assamese', label: 'অসমীয়া (Assamese)', flag: '🇮🇳', description: 'Learn basic Assamese words' },
  { code: 'urdu', label: 'اردو (Urdu)', flag: '🇮🇳', description: 'Learn basic Urdu words' },
  { code: 'sanskrit', label: 'संस्कृत (Sanskrit)', flag: '🇮🇳', description: 'Learn basic Sanskrit words' },
  { code: 'nepali', label: 'नेपाली (Nepali)', flag: '🇳🇵', description: 'Learn basic Nepali words' }
];

export default function LanguageSelector({ onSelect }) {
  return (
    <div className="language-selector">
      <div className="welcome-section">
        <h1 className="app-title">🌟 Welcome to LangBuddy! 🌟</h1>
        <p className="app-subtitle">Discover the beauty of Indian regional languages</p>
        <p className="instruction">Choose a language to start your learning journey:</p>
      </div>

      <div className="language-grid">
        {languages.map(lang => (
          <div
            key={lang.code}
            className="language-card"
            onClick={() => onSelect(lang.code)}
          >
            <div className="language-flag">{lang.flag}</div>
            <h3 className="language-name">{lang.label}</h3>
            <p className="language-description">{lang.description}</p>
            <div className="learn-button">Start Learning →</div>
          </div>
        ))}
      </div>

      <div className="features">
        <div className="feature">
          <span className="feature-icon">📚</span>
          <span>Interactive Flashcards</span>
        </div>
        <div className="feature">
          <span className="feature-icon">🎯</span>
          <span>Fun Quizzes</span>
        </div>
        <div className="feature">
          <span className="feature-icon">🏆</span>
          <span>Track Progress</span>
        </div>
      </div>
    </div>
  );
}
