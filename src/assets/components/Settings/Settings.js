import React, { useState, useEffect } from 'react';
import { getUserProgress, updateUserProfile } from '../../../utils/userProgress';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userProgress, setUserProgress] = useState(null);
  const [settings, setSettings] = useState({
    // Profile Management
    profile: {
      name: '',
      email: '',
      profilePicture: '🌟',
      nativeLanguage: 'english',
      targetLanguages: [],
      proficiencyLevel: 'beginner'
    },
    // Learning Preferences
    learning: {
      dailyGoal: 10,
      weeklyGoal: 70,
      notificationTime: '09:00',
      lessonDifficulty: 'beginner',
      soundEffects: true,
      audioPronunciation: true,
      interfaceLanguage: 'english'
    },
    // Account and Security
    security: {
      twoFactorAuth: false,
      socialLogin: {
        google: false,
        facebook: false,
        apple: false
      },
      dataSharing: false,
      profileVisibility: 'private'
    },
    // App Appearance
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      fontStyle: 'default',
      dashboardLayout: 'grid'
    },
    // Notifications
    notifications: {
      pushNotifications: true,
      dailyReminders: true,
      achievements: true,
      challenges: true,
      emailNotifications: false
    },
    // Data and Storage
    data: {
      offlineContent: true,
      autoDownload: false,
      cacheSize: '500MB'
    },
    // Language Practice
    practice: {
      speechRecognition: true,
      aiChatbot: true,
      reviewRepetition: 'adaptive',
      difficultyAdjustment: true
    },
    // Privacy and Permissions
    privacy: {
      microphoneAccess: true,
      cameraAccess: false,
      locationAccess: false
    }
  });

  const settingsTabs = [
    { id: 'profile', icon: '👤', label: 'Profile', description: 'Personal information & preferences' },
    { id: 'learning', icon: '📚', label: 'Learning', description: 'Study goals & preferences' },
    { id: 'security', icon: '🔒', label: 'Security', description: 'Account & privacy settings' },
    { id: 'appearance', icon: '🎨', label: 'Appearance', description: 'Theme & display options' },
    { id: 'notifications', icon: '🔔', label: 'Notifications', description: 'Alerts & reminders' },
    { id: 'data', icon: '💾', label: 'Data', description: 'Storage & offline content' },
    { id: 'practice', icon: '🗣️', label: 'Practice', description: 'Speech & AI settings' },
    { id: 'privacy', icon: '🛡️', label: 'Privacy', description: 'Permissions & data control' },
    { id: 'support', icon: '❓', label: 'Support', description: 'Help & feedback' }
  ];

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
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

  const avatarOptions = ['🌟', '📚', '🎯', '🏆', '🚀', '💡', '🎨', '🌈', '⭐', '🔥', '👤', '🦋', '🌸', '🎭', '🎪'];

  useEffect(() => {
    loadUserData();
    loadSettings();
  }, []);

  const loadUserData = () => {
    const progress = getUserProgress();
    setUserProgress(progress);
    
    // Update settings with user data
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        name: progress.profile.name,
        profilePicture: progress.profile.avatar
      }
    }));
  };

  const loadSettings = () => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('langbuddy_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  };

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('langbuddy_settings', JSON.stringify(newSettings));
    
    // Update user profile if profile settings changed
    if (newSettings.profile !== settings.profile) {
      updateUserProfile({
        name: newSettings.profile.name,
        avatar: newSettings.profile.profilePicture
      });
    }
  };

  const handleSettingChange = (category, key, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    };
    saveSettings(newSettings);
  };

  const handleNestedSettingChange = (category, parentKey, key, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [parentKey]: {
          ...settings[category][parentKey],
          [key]: value
        }
      }
    };
    saveSettings(newSettings);
  };

  const handleArraySettingChange = (category, key, value, checked) => {
    const currentArray = settings[category][key] || [];
    let newArray;
    
    if (checked) {
      newArray = [...currentArray, value];
    } else {
      newArray = currentArray.filter(item => item !== value);
    }
    
    handleSettingChange(category, key, newArray);
  };

  const exportData = () => {
    const dataToExport = {
      userProgress,
      settings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `langbuddy-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearCache = () => {
    if (window.confirm('Are you sure you want to clear all cached data? This will remove offline content and may affect app performance.')) {
      localStorage.removeItem('langbuddy_cache');
      alert('Cache cleared successfully!');
    }
  };

  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      localStorage.removeItem('langbuddy_settings');
      window.location.reload();
    }
  };

  if (!userProgress) {
    return <div className="settings-loading">Loading settings...</div>;
  }

  return (
    <div className="settings">
      <div className="settings-header">
        <h1 className="settings-title">⚙️ Settings</h1>
        <p className="settings-subtitle">Customize your LangBuddy experience</p>
      </div>

      <div className="settings-container">
        {/* Settings Navigation */}
        <div className="settings-nav">
          {settingsTabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="nav-item-icon">{tab.icon}</div>
              <div className="nav-item-content">
                <div className="nav-item-label">{tab.label}</div>
                <div className="nav-item-description">{tab.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {/* Profile Management */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2 className="section-title">👤 Profile Management</h2>
              
              <div className="setting-group">
                <h3 className="group-title">Personal Information</h3>
                
                <div className="setting-item">
                  <label className="setting-label">Profile Picture</label>
                  <div className="avatar-selector">
                    {avatarOptions.map(avatar => (
                      <button
                        key={avatar}
                        className={`avatar-option ${settings.profile.profilePicture === avatar ? 'selected' : ''}`}
                        onClick={() => handleSettingChange('profile', 'profilePicture', avatar)}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="setting-item">
                  <label className="setting-label">Display Name</label>
                  <input
                    type="text"
                    className="setting-input"
                    value={settings.profile.name}
                    onChange={(e) => handleSettingChange('profile', 'name', e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="setting-item">
                  <label className="setting-label">Email Address</label>
                  <input
                    type="email"
                    className="setting-input"
                    value={settings.profile.email}
                    onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">Language Preferences</h3>
                
                <div className="setting-item">
                  <label className="setting-label">Native Language</label>
                  <select
                    className="setting-select"
                    value={settings.profile.nativeLanguage}
                    onChange={(e) => handleSettingChange('profile', 'nativeLanguage', e.target.value)}
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="setting-item">
                  <label className="setting-label">Target Learning Languages</label>
                  <div className="checkbox-grid">
                    {languages.filter(lang => lang.code !== 'english').map(lang => (
                      <label key={lang.code} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={settings.profile.targetLanguages.includes(lang.code)}
                          onChange={(e) => handleArraySettingChange('profile', 'targetLanguages', lang.code, e.target.checked)}
                        />
                        <span className="checkbox-label">{lang.flag} {lang.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="setting-item">
                  <label className="setting-label">Overall Proficiency Level</label>
                  <div className="radio-group">
                    {['beginner', 'intermediate', 'advanced'].map(level => (
                      <label key={level} className="radio-item">
                        <input
                          type="radio"
                          name="proficiencyLevel"
                          value={level}
                          checked={settings.profile.proficiencyLevel === level}
                          onChange={(e) => handleSettingChange('profile', 'proficiencyLevel', e.target.value)}
                        />
                        <span className="radio-label">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Learning Preferences */}
          {activeTab === 'learning' && (
            <div className="settings-section">
              <h2 className="section-title">📚 Learning Preferences</h2>

              <div className="setting-group">
                <h3 className="group-title">Learning Goals</h3>

                <div className="setting-item">
                  <label className="setting-label">Daily Goal (minutes)</label>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="5"
                      max="120"
                      value={settings.learning.dailyGoal}
                      onChange={(e) => handleSettingChange('learning', 'dailyGoal', parseInt(e.target.value))}
                      className="setting-slider"
                    />
                    <span className="slider-value">{settings.learning.dailyGoal} minutes</span>
                  </div>
                </div>

                <div className="setting-item">
                  <label className="setting-label">Weekly Goal (minutes)</label>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="30"
                      max="840"
                      value={settings.learning.weeklyGoal}
                      onChange={(e) => handleSettingChange('learning', 'weeklyGoal', parseInt(e.target.value))}
                      className="setting-slider"
                    />
                    <span className="slider-value">{settings.learning.weeklyGoal} minutes</span>
                  </div>
                </div>

                <div className="setting-item">
                  <label className="setting-label">Daily Reminder Time</label>
                  <input
                    type="time"
                    className="setting-input"
                    value={settings.learning.notificationTime}
                    onChange={(e) => handleSettingChange('learning', 'notificationTime', e.target.value)}
                  />
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">Learning Experience</h3>

                <div className="setting-item">
                  <label className="setting-label">Preferred Lesson Difficulty</label>
                  <select
                    className="setting-select"
                    value={settings.learning.lessonDifficulty}
                    onChange={(e) => handleSettingChange('learning', 'lessonDifficulty', e.target.value)}
                  >
                    <option value="beginner">🟢 Beginner</option>
                    <option value="intermediate">🟡 Intermediate</option>
                    <option value="advanced">🔴 Advanced</option>
                    <option value="adaptive">🎯 Adaptive (Recommended)</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label className="setting-label">Interface Language</label>
                  <select
                    className="setting-select"
                    value={settings.learning.interfaceLanguage}
                    onChange={(e) => handleSettingChange('learning', 'interfaceLanguage', e.target.value)}
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="setting-item">
                  <div className="toggle-group">
                    <div className="toggle-item">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={settings.learning.soundEffects}
                          onChange={(e) => handleSettingChange('learning', 'soundEffects', e.target.checked)}
                          className="toggle-input"
                        />
                        <span className="toggle-slider"></span>
                        <span className="toggle-text">🔊 Sound Effects</span>
                      </label>
                    </div>

                    <div className="toggle-item">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={settings.learning.audioPronunciation}
                          onChange={(e) => handleSettingChange('learning', 'audioPronunciation', e.target.checked)}
                          className="toggle-input"
                        />
                        <span className="toggle-slider"></span>
                        <span className="toggle-text">🗣️ Audio Pronunciation</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <h2 className="section-title">🔒 Account & Security</h2>

              <div className="setting-group">
                <h3 className="group-title">Account Security</h3>

                <div className="setting-item">
                  <button className="action-button primary">
                    🔑 Change Password
                  </button>
                  <p className="setting-description">Update your account password for better security</p>
                </div>

                <div className="setting-item">
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                      <span className="toggle-text">🛡️ Two-Factor Authentication</span>
                    </label>
                  </div>
                  <p className="setting-description">Add an extra layer of security to your account</p>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">Social Login</h3>

                <div className="social-login-grid">
                  <div className="social-item">
                    <div className="social-info">
                      <span className="social-icon">🔴</span>
                      <span className="social-name">Google</span>
                    </div>
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.security.socialLogin.google}
                        onChange={(e) => handleNestedSettingChange('security', 'socialLogin', 'google', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="social-item">
                    <div className="social-info">
                      <span className="social-icon">🔵</span>
                      <span className="social-name">Facebook</span>
                    </div>
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.security.socialLogin.facebook}
                        onChange={(e) => handleNestedSettingChange('security', 'socialLogin', 'facebook', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="social-item">
                    <div className="social-info">
                      <span className="social-icon">⚫</span>
                      <span className="social-name">Apple</span>
                    </div>
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.security.socialLogin.apple}
                        onChange={(e) => handleNestedSettingChange('security', 'socialLogin', 'apple', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">Privacy Settings</h3>

                <div className="setting-item">
                  <label className="setting-label">Profile Visibility</label>
                  <select
                    className="setting-select"
                    value={settings.security.profileVisibility}
                    onChange={(e) => handleSettingChange('security', 'profileVisibility', e.target.value)}
                  >
                    <option value="private">🔒 Private</option>
                    <option value="friends">👥 Friends Only</option>
                    <option value="public">🌍 Public</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.security.dataSharing}
                        onChange={(e) => handleSettingChange('security', 'dataSharing', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                      <span className="toggle-text">📊 Allow Data Sharing for Improvements</span>
                    </label>
                  </div>
                  <p className="setting-description">Help us improve LangBuddy by sharing anonymous usage data</p>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2 className="section-title">🎨 App Appearance</h2>

              <div className="setting-group">
                <h3 className="group-title">Theme & Display</h3>

                <div className="setting-item">
                  <label className="setting-label">Theme</label>
                  <div className="theme-selector">
                    <div className="theme-options">
                      <label className={`theme-option ${settings.appearance.theme === 'light' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          checked={settings.appearance.theme === 'light'}
                          onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                        />
                        <div className="theme-preview light-theme">
                          <div className="theme-header"></div>
                          <div className="theme-content"></div>
                        </div>
                        <span className="theme-name">☀️ Light Mode</span>
                      </label>

                      <label className={`theme-option ${settings.appearance.theme === 'dark' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          checked={settings.appearance.theme === 'dark'}
                          onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                        />
                        <div className="theme-preview dark-theme">
                          <div className="theme-header"></div>
                          <div className="theme-content"></div>
                        </div>
                        <span className="theme-name">🌙 Dark Mode</span>
                      </label>

                      <label className={`theme-option ${settings.appearance.theme === 'auto' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="theme"
                          value="auto"
                          checked={settings.appearance.theme === 'auto'}
                          onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                        />
                        <div className="theme-preview auto-theme">
                          <div className="theme-header"></div>
                          <div className="theme-content"></div>
                        </div>
                        <span className="theme-name">🔄 Auto</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="setting-item">
                  <label className="setting-label">Font Size</label>
                  <div className="font-size-selector">
                    {['small', 'medium', 'large', 'extra-large'].map(size => (
                      <label key={size} className={`font-option ${settings.appearance.fontSize === size ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="fontSize"
                          value={size}
                          checked={settings.appearance.fontSize === size}
                          onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                        />
                        <span className={`font-preview ${size}`}>Aa</span>
                        <span className="font-label">{size.charAt(0).toUpperCase() + size.slice(1).replace('-', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="setting-item">
                  <label className="setting-label">Font Style</label>
                  <select
                    className="setting-select"
                    value={settings.appearance.fontStyle}
                    onChange={(e) => handleSettingChange('appearance', 'fontStyle', e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="serif">Serif</option>
                    <option value="sans-serif">Sans Serif</option>
                    <option value="monospace">Monospace</option>
                    <option value="dyslexic">Dyslexic Friendly</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label className="setting-label">Dashboard Layout</label>
                  <div className="layout-selector">
                    <label className={`layout-option ${settings.appearance.dashboardLayout === 'grid' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="dashboardLayout"
                        value="grid"
                        checked={settings.appearance.dashboardLayout === 'grid'}
                        onChange={(e) => handleSettingChange('appearance', 'dashboardLayout', e.target.value)}
                      />
                      <div className="layout-preview grid-layout">
                        <div className="layout-item"></div>
                        <div className="layout-item"></div>
                        <div className="layout-item"></div>
                        <div className="layout-item"></div>
                      </div>
                      <span className="layout-name">Grid</span>
                    </label>

                    <label className={`layout-option ${settings.appearance.dashboardLayout === 'list' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="dashboardLayout"
                        value="list"
                        checked={settings.appearance.dashboardLayout === 'list'}
                        onChange={(e) => handleSettingChange('appearance', 'dashboardLayout', e.target.value)}
                      />
                      <div className="layout-preview list-layout">
                        <div className="layout-item"></div>
                        <div className="layout-item"></div>
                        <div className="layout-item"></div>
                      </div>
                      <span className="layout-name">List</span>
                    </label>

                    <label className={`layout-option ${settings.appearance.dashboardLayout === 'compact' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="dashboardLayout"
                        value="compact"
                        checked={settings.appearance.dashboardLayout === 'compact'}
                        onChange={(e) => handleSettingChange('appearance', 'dashboardLayout', e.target.value)}
                      />
                      <div className="layout-preview compact-layout">
                        <div className="layout-item"></div>
                        <div className="layout-item"></div>
                      </div>
                      <span className="layout-name">Compact</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2 className="section-title">🔔 Notifications</h2>

              <div className="setting-group">
                <h3 className="group-title">Push Notifications</h3>

                <div className="notification-list">
                  <div className="notification-item">
                    <div className="notification-info">
                      <span className="notification-icon">📱</span>
                      <div className="notification-details">
                        <span className="notification-name">Push Notifications</span>
                        <span className="notification-description">Enable all push notifications</span>
                      </div>
                    </div>
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.pushNotifications}
                        onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <span className="notification-icon">⏰</span>
                      <div className="notification-details">
                        <span className="notification-name">Daily Reminders</span>
                        <span className="notification-description">Remind me to practice daily</span>
                      </div>
                    </div>
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.dailyReminders}
                        onChange={(e) => handleSettingChange('notifications', 'dailyReminders', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <span className="notification-icon">🏆</span>
                      <div className="notification-details">
                        <span className="notification-name">Achievements</span>
                        <span className="notification-description">Notify when I earn achievements</span>
                      </div>
                    </div>
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.achievements}
                        onChange={(e) => handleSettingChange('notifications', 'achievements', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <span className="notification-icon">🎯</span>
                      <div className="notification-details">
                        <span className="notification-name">Challenges</span>
                        <span className="notification-description">Notify about new challenges</span>
                      </div>
                    </div>
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.challenges}
                        onChange={(e) => handleSettingChange('notifications', 'challenges', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">Email Notifications</h3>

                <div className="setting-item">
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                      <span className="toggle-text">📧 Email Notifications</span>
                    </label>
                  </div>
                  <p className="setting-description">Receive weekly progress reports and important updates via email</p>
                </div>
              </div>
            </div>
          )}

          {/* Data and Storage */}
          {activeTab === 'data' && (
            <div className="settings-section">
              <h2 className="section-title">💾 Data & Storage</h2>

              <div className="setting-group">
                <h3 className="group-title">Offline Content</h3>

                <div className="setting-item">
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.data.offlineContent}
                        onChange={(e) => handleSettingChange('data', 'offlineContent', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                      <span className="toggle-text">📱 Enable Offline Content</span>
                    </label>
                  </div>
                  <p className="setting-description">Download lessons for offline study</p>
                </div>

                <div className="setting-item">
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.data.autoDownload}
                        onChange={(e) => handleSettingChange('data', 'autoDownload', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                      <span className="toggle-text">⬇️ Auto-Download New Content</span>
                    </label>
                  </div>
                  <p className="setting-description">Automatically download new lessons when connected to WiFi</p>
                </div>

                <div className="setting-item">
                  <label className="setting-label">Cache Size Limit</label>
                  <select
                    className="setting-select"
                    value={settings.data.cacheSize}
                    onChange={(e) => handleSettingChange('data', 'cacheSize', e.target.value)}
                  >
                    <option value="100MB">100 MB</option>
                    <option value="250MB">250 MB</option>
                    <option value="500MB">500 MB (Recommended)</option>
                    <option value="1GB">1 GB</option>
                    <option value="2GB">2 GB</option>
                  </select>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">Data Management</h3>

                <div className="data-actions">
                  <button className="action-button secondary" onClick={exportData}>
                    📤 Export Learning Data
                  </button>
                  <p className="action-description">Download your progress and settings as a backup file</p>

                  <button className="action-button warning" onClick={clearCache}>
                    🗑️ Clear Cache
                  </button>
                  <p className="action-description">Free up storage space by clearing cached data</p>

                  <button className="action-button danger" onClick={resetSettings}>
                    🔄 Reset All Settings
                  </button>
                  <p className="action-description">Reset all settings to default values</p>
                </div>
              </div>
            </div>
          )}

          {/* Language Practice Settings */}
          {activeTab === 'practice' && (
            <div className="settings-section">
              <h2 className="section-title">🗣️ Language Practice</h2>

              <div className="setting-group">
                <h3 className="group-title">Speech & Recognition</h3>

                <div className="setting-item">
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.practice.speechRecognition}
                        onChange={(e) => handleSettingChange('practice', 'speechRecognition', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                      <span className="toggle-text">🎤 Speech Recognition Feedback</span>
                    </label>
                  </div>
                  <p className="setting-description">Get real-time feedback on your pronunciation</p>
                </div>

                <div className="setting-item">
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.practice.aiChatbot}
                        onChange={(e) => handleSettingChange('practice', 'aiChatbot', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                      <span className="toggle-text">🤖 AI Chatbot Conversations</span>
                    </label>
                  </div>
                  <p className="setting-description">Practice conversations with AI-powered chatbot</p>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">Learning Algorithm</h3>

                <div className="setting-item">
                  <label className="setting-label">Review Repetition System</label>
                  <select
                    className="setting-select"
                    value={settings.practice.reviewRepetition}
                    onChange={(e) => handleSettingChange('practice', 'reviewRepetition', e.target.value)}
                  >
                    <option value="adaptive">🎯 Adaptive (Recommended)</option>
                    <option value="spaced">📅 Spaced Repetition</option>
                    <option value="fixed">⏰ Fixed Intervals</option>
                    <option value="manual">✋ Manual Review</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.practice.difficultyAdjustment}
                        onChange={(e) => handleSettingChange('practice', 'difficultyAdjustment', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                      <span className="toggle-text">📈 Automatic Difficulty Adjustment</span>
                    </label>
                  </div>
                  <p className="setting-description">Automatically adjust lesson difficulty based on your performance</p>
                </div>
              </div>
            </div>
          )}

          {/* Privacy and Permissions */}
          {activeTab === 'privacy' && (
            <div className="settings-section">
              <h2 className="section-title">🛡️ Privacy & Permissions</h2>

              <div className="setting-group">
                <h3 className="group-title">App Permissions</h3>

                <div className="permission-list">
                  <div className="permission-item">
                    <div className="permission-info">
                      <span className="permission-icon">🎤</span>
                      <div className="permission-details">
                        <span className="permission-name">Microphone Access</span>
                        <span className="permission-description">Required for pronunciation practice and speech recognition</span>
                      </div>
                    </div>
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.privacy.microphoneAccess}
                        onChange={(e) => handleSettingChange('privacy', 'microphoneAccess', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="permission-item">
                    <div className="permission-info">
                      <span className="permission-icon">📹</span>
                      <div className="permission-details">
                        <span className="permission-name">Camera Access</span>
                        <span className="permission-description">Optional for video lessons and visual learning features</span>
                      </div>
                    </div>
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.privacy.cameraAccess}
                        onChange={(e) => handleSettingChange('privacy', 'cameraAccess', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="permission-item">
                    <div className="permission-info">
                      <span className="permission-icon">📍</span>
                      <div className="permission-details">
                        <span className="permission-name">Location Access</span>
                        <span className="permission-description">Used for region-specific content and cultural context</span>
                      </div>
                    </div>
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.privacy.locationAccess}
                        onChange={(e) => handleSettingChange('privacy', 'locationAccess', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">Data Privacy</h3>

                <div className="privacy-actions">
                  <button className="action-button secondary">
                    📄 View Privacy Policy
                  </button>
                  <p className="action-description">Read our complete privacy policy and data handling practices</p>

                  <button className="action-button secondary">
                    📋 Download My Data
                  </button>
                  <p className="action-description">Request a copy of all your personal data</p>

                  <button className="action-button danger">
                    🗑️ Delete My Account
                  </button>
                  <p className="action-description">Permanently delete your account and all associated data</p>
                </div>
              </div>
            </div>
          )}

          {/* Support and Feedback */}
          {activeTab === 'support' && (
            <div className="settings-section">
              <h2 className="section-title">❓ Support & Feedback</h2>

              <div className="setting-group">
                <h3 className="group-title">Help & Resources</h3>

                <div className="support-grid">
                  <div className="support-item">
                    <div className="support-icon">📚</div>
                    <div className="support-content">
                      <h4 className="support-title">Help Center</h4>
                      <p className="support-description">Browse frequently asked questions and tutorials</p>
                      <button className="support-button">Visit Help Center</button>
                    </div>
                  </div>

                  <div className="support-item">
                    <div className="support-icon">🐛</div>
                    <div className="support-content">
                      <h4 className="support-title">Report a Bug</h4>
                      <p className="support-description">Found an issue? Let us know so we can fix it</p>
                      <button className="support-button">Report Bug</button>
                    </div>
                  </div>

                  <div className="support-item">
                    <div className="support-icon">💡</div>
                    <div className="support-content">
                      <h4 className="support-title">Feature Request</h4>
                      <p className="support-description">Suggest new features or improvements</p>
                      <button className="support-button">Submit Idea</button>
                    </div>
                  </div>

                  <div className="support-item">
                    <div className="support-icon">📞</div>
                    <div className="support-content">
                      <h4 className="support-title">Contact Support</h4>
                      <p className="support-description">Get direct help from our support team</p>
                      <button className="support-button">Contact Us</button>
                    </div>
                  </div>

                  <div className="support-item">
                    <div className="support-icon">⭐</div>
                    <div className="support-content">
                      <h4 className="support-title">Rate LangBuddy</h4>
                      <p className="support-description">Love the app? Leave us a review!</p>
                      <button className="support-button">Rate App</button>
                    </div>
                  </div>

                  <div className="support-item">
                    <div className="support-icon">📱</div>
                    <div className="support-content">
                      <h4 className="support-title">App Version</h4>
                      <p className="support-description">LangBuddy v2.1.0</p>
                      <button className="support-button">Check for Updates</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3 className="group-title">Community</h3>

                <div className="community-links">
                  <a href="#" className="community-link">
                    <span className="community-icon">💬</span>
                    <span className="community-text">Join Discord Community</span>
                  </a>
                  <a href="#" className="community-link">
                    <span className="community-icon">📘</span>
                    <span className="community-text">Follow on Facebook</span>
                  </a>
                  <a href="#" className="community-link">
                    <span className="community-icon">🐦</span>
                    <span className="community-text">Follow on Twitter</span>
                  </a>
                  <a href="#" className="community-link">
                    <span className="community-icon">📸</span>
                    <span className="community-text">Follow on Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
