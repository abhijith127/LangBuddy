import React, { useState } from 'react';
import Sidebar from './assets/components/Sidebar/Sidebar';
import Dashboard from './assets/components/Dashboard/Dashboard';
import Courses from './assets/components/Courses/Courses';
import QuizzesGames from './assets/components/QuizzesGames/QuizzesGames';
import Resources from './assets/components/Resources/Resources';
import Community from './assets/components/Community/Community';
import Settings from './assets/components/Settings/Settings';
import LanguageSelector from './assets/components/LanguageSelector/LanguageSelector';
import FlashcardDeck from './assets/components/FlashcardDeck/FlashcardDeck';
import Quiz from './assets/components/Quiz/Quiz';
import Result from './assets/components/Result/Result';
import Profile from './assets/components/Profile/Profile';
import wordsData from './data/words';
import { updateLanguageProgress, updateFlashcardProgress } from './utils/userProgress';
import './App.css';

function App() {
  // Main navigation states: 'dashboard', 'courses', 'quizzes', 'progress', 'community', 'resources', 'settings'
  // Learning states: 'language', 'flashcards', 'quiz', 'result'
  const [activeSection, setActiveSection] = useState('dashboard');
  const [view, setView] = useState('dashboard');
  const [language, setLanguage] = useState('');
  const [quizScore, setQuizScore] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Navigation handlers
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setView(section);
    // Reset language-specific states when changing sections
    if (section !== 'courses' && section !== 'quizzes') {
      setLanguage('');
    }
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Handler when user selects a language
  const handleLanguageSelect = (selectedLang) => {
    setLanguage(selectedLang);
    setView('flashcards'); // Move to flashcards view
  };

  // Handler for starting a lesson from courses
  const handleStartLesson = (languageCode, lesson) => {
    setLanguage(languageCode);
    setView('flashcards'); // Start with flashcards for now
  };

  // Handler to start quiz after flashcards are done
  const handleQuizStart = () => setView('quiz');

  // Handler called when quiz finishes; receives user's score
  const handleQuizEnd = (score, totalQuestions) => {
    setQuizScore(score);
    // Update user progress
    updateLanguageProgress(language, score, totalQuestions);
    setView('result'); // Show results view
  };



  // Handler for flashcard completion
  const handleFlashcardComplete = (cardsStudied) => {
    updateFlashcardProgress(language, cardsStudied);
  };

  // Restart app to initial state
  const handleRestart = () => {
    setLanguage('');
    setQuizScore(0);
    setView('language');
  };

  return (
    <div className="App">
      {/* Sidebar Navigation */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      {/* Main Content Area */}
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Dashboard */}
        {view === 'dashboard' && (
          <Dashboard onNavigate={handleSectionChange} />
        )}

        {/* Courses */}
        {view === 'courses' && (
          <Courses onStartLesson={handleStartLesson} />
        )}

        {/* Legacy Language Selector (for backward compatibility) */}
        {view === 'language' && (
          <LanguageSelector onSelect={handleLanguageSelect} />
        )}

        {/* Flashcards */}
        {view === 'flashcards' && (
          <FlashcardDeck
            words={language ? wordsData[language] || [] : []}
            onQuiz={handleQuizStart}
            onComplete={handleFlashcardComplete}
          />
        )}

        {/* Quiz */}
        {view === 'quiz' && (
          <Quiz
            words={language ? wordsData[language] || [] : []}
            onFinish={handleQuizEnd}
          />
        )}

        {/* Results */}
        {view === 'result' && (
          <Result score={quizScore} onRestart={handleRestart} />
        )}

        {/* Progress/Profile */}
        {view === 'progress' && (
          <Profile onBack={() => handleSectionChange('dashboard')} />
        )}

        {/* Quizzes & Games */}
        {view === 'quizzes' && (
          <QuizzesGames />
        )}

        {/* Placeholder sections for future implementation */}

        {view === 'community' && (
          <Community />
        )}

        {view === 'resources' && (
          <Resources />
        )}

        {view === 'settings' && (
          <Settings />
        )}
      </div>
    </div>
  );
}

export default App;
