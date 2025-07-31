// User Progress Management Utility
// Handles storing and retrieving user learning progress data

const STORAGE_KEY = 'langbuddy_user_progress';

// Default user progress structure
const defaultProgress = {
  profile: {
    name: 'Language Learner',
    joinDate: new Date().toISOString(),
    avatar: '🌟',
    totalStudyTime: 0, // in minutes
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: null
  },
  languages: {
    // Structure: languageCode: { completed: boolean, score: number, attempts: number, lastStudied: date }
  },
  statistics: {
    totalLanguagesStarted: 0,
    totalLanguagesCompleted: 0,
    totalQuizzesTaken: 0,
    totalFlashcardsStudied: 0,
    averageQuizScore: 0,
    totalCorrectAnswers: 0,
    totalQuestions: 0
  },
  achievements: [],
  settings: {
    soundEnabled: true,
    animationsEnabled: true,
    dailyGoal: 10 // minutes per day
  }
};

// Get user progress from localStorage
export const getUserProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const progress = JSON.parse(stored);
      // Merge with default structure to handle new fields
      return mergeWithDefault(progress, defaultProgress);
    }
    return { ...defaultProgress };
  } catch (error) {
    console.error('Error loading user progress:', error);
    return { ...defaultProgress };
  }
};

// Save user progress to localStorage
export const saveUserProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error('Error saving user progress:', error);
    return false;
  }
};

// Merge stored data with default structure
const mergeWithDefault = (stored, defaultData) => {
  const merged = { ...defaultData };
  
  Object.keys(defaultData).forEach(key => {
    if (stored[key]) {
      if (typeof defaultData[key] === 'object' && !Array.isArray(defaultData[key])) {
        merged[key] = { ...defaultData[key], ...stored[key] };
      } else {
        merged[key] = stored[key];
      }
    }
  });
  
  return merged;
};

// Update language progress
export const updateLanguageProgress = (languageCode, quizScore, totalQuestions) => {
  const progress = getUserProgress();
  const now = new Date().toISOString();
  
  // Update language-specific data
  if (!progress.languages[languageCode]) {
    progress.languages[languageCode] = {
      completed: false,
      bestScore: 0,
      attempts: 0,
      lastStudied: now,
      totalQuestions: 0,
      correctAnswers: 0
    };
    progress.statistics.totalLanguagesStarted++;
  }
  
  const langData = progress.languages[languageCode];
  langData.attempts++;
  langData.lastStudied = now;
  langData.totalQuestions += totalQuestions;
  langData.correctAnswers += quizScore;
  
  // Update best score
  const currentScore = Math.round((quizScore / totalQuestions) * 100);
  if (currentScore > langData.bestScore) {
    langData.bestScore = currentScore;
  }
  
  // Mark as completed if score is 80% or higher
  if (currentScore >= 80 && !langData.completed) {
    langData.completed = true;
    progress.statistics.totalLanguagesCompleted++;
  }
  
  // Update global statistics
  progress.statistics.totalQuizzesTaken++;
  progress.statistics.totalCorrectAnswers += quizScore;
  progress.statistics.totalQuestions += totalQuestions;
  progress.statistics.averageQuizScore = Math.round(
    (progress.statistics.totalCorrectAnswers / progress.statistics.totalQuestions) * 100
  );
  
  // Update study streak
  updateStudyStreak(progress);
  
  saveUserProgress(progress);
  return progress;
};

// Update flashcard study progress
export const updateFlashcardProgress = (languageCode, cardsStudied) => {
  const progress = getUserProgress();
  const now = new Date().toISOString();
  
  // Initialize language if not exists
  if (!progress.languages[languageCode]) {
    progress.languages[languageCode] = {
      completed: false,
      bestScore: 0,
      attempts: 0,
      lastStudied: now,
      totalQuestions: 0,
      correctAnswers: 0
    };
    progress.statistics.totalLanguagesStarted++;
  }
  
  progress.languages[languageCode].lastStudied = now;
  progress.statistics.totalFlashcardsStudied += cardsStudied;
  
  // Update study streak
  updateStudyStreak(progress);
  
  saveUserProgress(progress);
  return progress;
};

// Update study streak
const updateStudyStreak = (progress) => {
  const today = new Date().toDateString();
  const lastStudyDate = progress.profile.lastStudyDate 
    ? new Date(progress.profile.lastStudyDate).toDateString() 
    : null;
  
  if (lastStudyDate === today) {
    // Already studied today, no change to streak
    return;
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toDateString();
  
  if (lastStudyDate === yesterdayString) {
    // Studied yesterday, continue streak
    progress.profile.currentStreak++;
  } else if (lastStudyDate !== today) {
    // Missed a day, reset streak
    progress.profile.currentStreak = 1;
  }
  
  // Update longest streak
  if (progress.profile.currentStreak > progress.profile.longestStreak) {
    progress.profile.longestStreak = progress.profile.currentStreak;
  }
  
  progress.profile.lastStudyDate = new Date().toISOString();
};

// Get learning statistics
export const getLearningStats = () => {
  const progress = getUserProgress();
  const languages = Object.keys(progress.languages);
  
  return {
    totalLanguages: 14, // Total available languages
    languagesStarted: progress.statistics.totalLanguagesStarted,
    languagesCompleted: progress.statistics.totalLanguagesCompleted,
    completionRate: languages.length > 0 
      ? Math.round((progress.statistics.totalLanguagesCompleted / progress.statistics.totalLanguagesStarted) * 100)
      : 0,
    averageScore: progress.statistics.averageQuizScore,
    totalQuizzes: progress.statistics.totalQuizzesTaken,
    totalFlashcards: progress.statistics.totalFlashcardsStudied,
    currentStreak: progress.profile.currentStreak,
    longestStreak: progress.profile.longestStreak,
    recentLanguages: getRecentLanguages(progress.languages)
  };
};

// Get recently studied languages
const getRecentLanguages = (languages) => {
  return Object.entries(languages)
    .sort(([,a], [,b]) => new Date(b.lastStudied) - new Date(a.lastStudied))
    .slice(0, 5)
    .map(([code, data]) => ({ code, ...data }));
};

// Reset user progress (for testing or fresh start)
export const resetUserProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultProgress };
};

// Update user profile
export const updateUserProfile = (profileUpdates) => {
  const progress = getUserProgress();
  progress.profile = { ...progress.profile, ...profileUpdates };
  saveUserProgress(progress);
  return progress;
};
