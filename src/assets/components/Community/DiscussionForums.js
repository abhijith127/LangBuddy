import React, { useState } from 'react';
import './DiscussionForums.css';

const DiscussionForums = () => {
  const [selectedForum, setSelectedForum] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const forums = [
    {
      id: 'hindi',
      name: 'Hindi Learning Forum',
      language: 'Hindi',
      flag: '🇮🇳',
      description: 'Discuss Hindi grammar, vocabulary, and culture',
      members: 2847,
      threads: 1247,
      posts: 8934,
      color: '#e74c3c',
      moderators: ['Priya Sharma', 'Raj Kumar'],
      lastActivity: '2 minutes ago'
    },
    {
      id: 'bengali',
      name: 'Bengali Language Community',
      language: 'Bengali',
      flag: '🇮🇳',
      description: 'Learn Bengali through discussions and cultural exchange',
      members: 1923,
      threads: 856,
      posts: 5672,
      color: '#2ecc71',
      moderators: ['Anita Das', 'Subhash Roy'],
      lastActivity: '5 minutes ago'
    },
    {
      id: 'tamil',
      name: 'Tamil Literature & Language',
      language: 'Tamil',
      flag: '🇮🇳',
      description: 'Explore Tamil language, literature, and traditions',
      members: 1654,
      threads: 743,
      posts: 4521,
      color: '#3498db',
      moderators: ['Meera Krishnan', 'Arjun Pillai'],
      lastActivity: '8 minutes ago'
    },
    {
      id: 'gujarati',
      name: 'Gujarati Learning Hub',
      language: 'Gujarati',
      flag: '🇮🇳',
      description: 'Master Gujarati with fellow learners',
      members: 987,
      threads: 432,
      posts: 2876,
      color: '#f39c12',
      moderators: ['Kiran Patel', 'Nisha Shah'],
      lastActivity: '12 minutes ago'
    },
    {
      id: 'punjabi',
      name: 'Punjabi Culture & Language',
      language: 'Punjabi',
      flag: '🇮🇳',
      description: 'Learn Punjabi language and culture',
      members: 1234,
      threads: 567,
      posts: 3456,
      color: '#9b59b6',
      moderators: ['Simran Kaur', 'Harpreet Singh'],
      lastActivity: '15 minutes ago'
    }
  ];

  const sampleThreads = [
    {
      id: 1,
      title: 'How to use "है" vs "हैं" correctly?',
      author: 'Priya Sharma',
      avatar: '👩‍🎓',
      category: 'Grammar Help',
      replies: 23,
      views: 156,
      lastReply: '5 minutes ago',
      isPinned: true,
      hasAnswer: true,
      tags: ['grammar', 'verbs', 'beginner'],
      votes: 15
    },
    {
      id: 2,
      title: 'Best Hindi movies for language learning?',
      author: 'Raj Patel',
      avatar: '👨‍💼',
      category: 'Cultural Understanding',
      replies: 45,
      views: 289,
      lastReply: '12 minutes ago',
      isPinned: false,
      hasAnswer: false,
      tags: ['movies', 'culture', 'entertainment'],
      votes: 28
    },
    {
      id: 3,
      title: 'Pronunciation tips for "ऋ" sound',
      author: 'Anita Das',
      avatar: '👩‍🏫',
      category: 'Pronunciation Tips',
      replies: 18,
      views: 134,
      lastReply: '25 minutes ago',
      isPinned: false,
      hasAnswer: true,
      tags: ['pronunciation', 'phonetics', 'intermediate'],
      votes: 12
    },
    {
      id: 4,
      title: 'Weekly Vocabulary Challenge - Week 15',
      author: 'Moderator',
      avatar: '🛡️',
      category: 'Vocabulary Questions',
      replies: 67,
      views: 423,
      lastReply: '1 hour ago',
      isPinned: true,
      hasAnswer: false,
      tags: ['vocabulary', 'challenge', 'weekly'],
      votes: 34
    }
  ];

  const categories = [
    { id: 'grammar', name: 'Grammar Help', icon: '📝', color: '#3498db' },
    { id: 'vocabulary', name: 'Vocabulary Questions', icon: '📚', color: '#2ecc71' },
    { id: 'pronunciation', name: 'Pronunciation Tips', icon: '🗣️', color: '#e74c3c' },
    { id: 'culture', name: 'Cultural Understanding', icon: '🏛️', color: '#f39c12' },
    { id: 'resources', name: 'Resource Sharing', icon: '🔗', color: '#9b59b6' },
    { id: 'general', name: 'General Discussion', icon: '💬', color: '#1abc9c' }
  ];

  const handleForumSelect = (forum) => {
    setSelectedForum(forum);
    setSelectedThread(null);
  };

  const handleThreadSelect = (thread) => {
    setSelectedThread(thread);
  };

  const handleBackToForums = () => {
    setSelectedForum(null);
    setSelectedThread(null);
  };

  const handleBackToThreads = () => {
    setSelectedThread(null);
  };

  const filteredThreads = sampleThreads.filter(thread =>
    thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (selectedThread) {
    return (
      <div className="thread-view">
        <div className="thread-header">
          <button className="back-btn" onClick={handleBackToThreads}>
            ← Back to {selectedForum?.name}
          </button>
          <div className="thread-info">
            <h2 className="thread-title">{selectedThread.title}</h2>
            <div className="thread-meta">
              <span className="thread-author">by {selectedThread.author}</span>
              <span className="thread-category">{selectedThread.category}</span>
              <span className="thread-stats">{selectedThread.replies} replies • {selectedThread.views} views</span>
            </div>
          </div>
          <div className="thread-actions">
            <button className="vote-btn">👍 {selectedThread.votes}</button>
            <button className="bookmark-btn">🔖</button>
            <button className="share-btn">📤</button>
          </div>
        </div>
        
        <div className="thread-content">
          <div className="original-post">
            <div className="post-author">
              <div className="author-avatar">{selectedThread.avatar}</div>
              <div className="author-info">
                <div className="author-name">{selectedThread.author}</div>
                <div className="author-badge">Active Learner</div>
              </div>
            </div>
            <div className="post-content">
              <p>I'm having trouble understanding when to use "है" versus "हैं" in Hindi sentences. Can someone explain the difference and provide some examples?</p>
              <p>For example:</p>
              <ul>
                <li>यह किताब अच्छी है (This book is good)</li>
                <li>ये किताबें अच्छी हैं (These books are good)</li>
              </ul>
              <p>Is it related to singular vs plural? Any help would be appreciated!</p>
            </div>
            <div className="post-tags">
              {selectedThread.tags.map((tag, idx) => (
                <span key={idx} className="post-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="replies-section">
            <h3 className="replies-title">💬 Replies ({selectedThread.replies})</h3>
            <div className="reply-item best-answer">
              <div className="best-answer-badge">✅ Best Answer</div>
              <div className="post-author">
                <div className="author-avatar">👩‍🏫</div>
                <div className="author-info">
                  <div className="author-name">Dr. Meera Sharma</div>
                  <div className="author-badge">Expert • Moderator</div>
                </div>
              </div>
              <div className="post-content">
                <p>Great question! Yes, you're absolutely right - it's about singular vs plural:</p>
                <p><strong>है</strong> is used with singular subjects:</p>
                <ul>
                  <li>मैं खुश हूँ (I am happy)</li>
                  <li>वह अच्छा है (He/She is good)</li>
                  <li>यह किताब नई है (This book is new)</li>
                </ul>
                <p><strong>हैं</strong> is used with plural subjects:</p>
                <ul>
                  <li>हम खुश हैं (We are happy)</li>
                  <li>वे अच्छे हैं (They are good)</li>
                  <li>ये किताबें नई हैं (These books are new)</li>
                </ul>
              </div>
              <div className="post-actions">
                <button className="vote-btn">👍 45</button>
                <button className="reply-btn">💬 Reply</button>
                <span className="post-time">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedForum) {
    return (
      <div className="forum-threads">
        <div className="forum-header">
          <button className="back-btn" onClick={handleBackToForums}>
            ← Back to All Forums
          </button>
          <div className="forum-info">
            <h2 className="forum-title">
              {selectedForum.flag} {selectedForum.name}
            </h2>
            <p className="forum-description">{selectedForum.description}</p>
            <div className="forum-stats">
              <span>{selectedForum.members.toLocaleString()} members</span>
              <span>{selectedForum.threads} threads</span>
              <span>{selectedForum.posts.toLocaleString()} posts</span>
            </div>
          </div>
        </div>

        <div className="threads-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search threads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="sort-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="votes">Most Voted</option>
              <option value="replies">Most Replies</option>
            </select>
          </div>
          <button className="new-thread-btn">➕ New Thread</button>
        </div>

        <div className="categories-bar">
          {categories.map((category, index) => (
            <button
              key={category.id}
              className="category-btn"
              style={{ '--color': category.color, '--delay': `${index * 0.1}s` }}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="threads-list">
          {filteredThreads.map((thread, index) => (
            <div
              key={thread.id}
              className={`thread-item ${thread.isPinned ? 'pinned' : ''}`}
              style={{ '--delay': `${index * 0.1}s` }}
              onClick={() => handleThreadSelect(thread)}
            >
              {thread.isPinned && <div className="pin-badge">📌 Pinned</div>}
              {thread.hasAnswer && <div className="answer-badge">✅ Answered</div>}
              
              <div className="thread-main">
                <div className="thread-author-info">
                  <div className="thread-avatar">{thread.avatar}</div>
                  <div className="thread-author-name">{thread.author}</div>
                </div>
                
                <div className="thread-content">
                  <h3 className="thread-title">{thread.title}</h3>
                  <div className="thread-category">{thread.category}</div>
                  <div className="thread-tags">
                    {thread.tags.map((tag, idx) => (
                      <span key={idx} className="thread-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="thread-stats">
                  <div className="stat-item">
                    <span className="stat-number">{thread.votes}</span>
                    <span className="stat-label">votes</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{thread.replies}</span>
                    <span className="stat-label">replies</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{thread.views}</span>
                    <span className="stat-label">views</span>
                  </div>
                </div>
                
                <div className="thread-last-activity">
                  <span className="last-reply">Last reply: {thread.lastReply}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="discussion-forums">
      <div className="forums-grid">
        {forums.map((forum, index) => (
          <div
            key={forum.id}
            className="forum-card"
            style={{ '--color': forum.color, '--delay': `${index * 0.1}s` }}
            onClick={() => handleForumSelect(forum)}
          >
            <div className="forum-header">
              <div className="forum-flag">{forum.flag}</div>
              <div className="forum-language">{forum.language}</div>
              <div className="forum-activity">
                <span className="activity-dot"></span>
                <span className="activity-text">{forum.lastActivity}</span>
              </div>
            </div>
            
            <div className="forum-content">
              <h3 className="forum-name">{forum.name}</h3>
              <p className="forum-description">{forum.description}</p>
              
              <div className="forum-stats">
                <div className="stat">
                  <span className="stat-number">{forum.members.toLocaleString()}</span>
                  <span className="stat-label">Members</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{forum.threads}</span>
                  <span className="stat-label">Threads</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{forum.posts.toLocaleString()}</span>
                  <span className="stat-label">Posts</span>
                </div>
              </div>
              
              <div className="forum-moderators">
                <span className="moderators-label">Moderators:</span>
                <div className="moderators-list">
                  {forum.moderators.map((mod, idx) => (
                    <span key={idx} className="moderator">{mod}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="forum-footer">
              <button className="join-forum-btn">Join Discussion →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForums;
