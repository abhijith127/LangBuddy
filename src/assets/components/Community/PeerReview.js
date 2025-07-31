import React, { useState } from 'react';

const PeerReview = () => {
  const [activeTab, setActiveTab] = useState('submit');

  const submissions = [
    {
      id: 1,
      title: 'My Hindi Essay - "मेरा परिवार"',
      author: 'Student123',
      type: 'writing',
      language: 'Hindi',
      level: 'Beginner',
      reviews: 3,
      avgRating: 4.2,
      status: 'reviewed',
      submittedAt: '2 days ago'
    },
    {
      id: 2,
      title: 'Bengali Pronunciation Practice',
      author: 'LearnerABC',
      type: 'audio',
      language: 'Bengali',
      level: 'Intermediate',
      reviews: 1,
      avgRating: 4.5,
      status: 'pending',
      submittedAt: '1 day ago'
    }
  ];

  return (
    <div className="peer-review">
      <div className="review-tabs">
        <button
          className={`tab-btn ${activeTab === 'submit' ? 'active' : ''}`}
          onClick={() => setActiveTab('submit')}
        >
          ✍️ Submit for Review
        </button>
        <button
          className={`tab-btn ${activeTab === 'review' ? 'active' : ''}`}
          onClick={() => setActiveTab('review')}
        >
          👀 Review Others
        </button>
        <button
          className={`tab-btn ${activeTab === 'my-submissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-submissions')}
        >
          📝 My Submissions
        </button>
      </div>

      {activeTab === 'submit' && (
        <div className="submit-section">
          <h3>✍️ Submit Your Work for Peer Review</h3>
          <div className="submission-form">
            <div className="form-group">
              <label>Type of Submission:</label>
              <select className="form-select">
                <option>Writing Sample</option>
                <option>Audio Recording</option>
                <option>Video Presentation</option>
              </select>
            </div>
            <div className="form-group">
              <label>Language:</label>
              <select className="form-select">
                <option>Hindi</option>
                <option>Bengali</option>
                <option>Tamil</option>
                <option>Gujarati</option>
              </select>
            </div>
            <div className="form-group">
              <label>Your Level:</label>
              <select className="form-select">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div className="form-group">
              <label>Title:</label>
              <input type="text" className="form-input" placeholder="Give your submission a title..." />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <textarea className="form-textarea" placeholder="Paste your text or describe your audio/video..."></textarea>
            </div>
            <div className="form-group">
              <label>Specific Areas for Feedback:</label>
              <div className="feedback-areas">
                <label><input type="checkbox" /> Grammar</label>
                <label><input type="checkbox" /> Vocabulary</label>
                <label><input type="checkbox" /> Pronunciation</label>
                <label><input type="checkbox" /> Fluency</label>
                <label><input type="checkbox" /> Cultural Context</label>
              </div>
            </div>
            <button className="submit-btn">📤 Submit for Review</button>
          </div>
        </div>
      )}

      {activeTab === 'review' && (
        <div className="review-section">
          <h3>👀 Help Others by Reviewing Their Work</h3>
          <div className="review-queue">
            {submissions.filter(s => s.status === 'pending').map((submission, index) => (
              <div key={submission.id} className="review-item" style={{ '--delay': `${index * 0.1}s` }}>
                <div className="submission-info">
                  <h4>{submission.title}</h4>
                  <div className="submission-meta">
                    <span className="submission-type">{submission.type}</span>
                    <span className="submission-language">{submission.language}</span>
                    <span className="submission-level">{submission.level}</span>
                  </div>
                  <p className="submission-author">by {submission.author}</p>
                </div>
                <div className="review-actions">
                  <button className="review-btn">👀 Review</button>
                  <button className="skip-btn">⏭️ Skip</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'my-submissions' && (
        <div className="my-submissions-section">
          <h3>📝 My Submissions</h3>
          <div className="submissions-list">
            {submissions.map((submission, index) => (
              <div key={submission.id} className="submission-card" style={{ '--delay': `${index * 0.1}s` }}>
                <div className="submission-header">
                  <h4>{submission.title}</h4>
                  <div className={`status-badge ${submission.status}`}>
                    {submission.status === 'reviewed' ? '✅ Reviewed' : '⏳ Pending'}
                  </div>
                </div>
                <div className="submission-details">
                  <span>Type: {submission.type}</span>
                  <span>Language: {submission.language}</span>
                  <span>Level: {submission.level}</span>
                  <span>Submitted: {submission.submittedAt}</span>
                </div>
                <div className="submission-stats">
                  <span>Reviews: {submission.reviews}</span>
                  {submission.avgRating && <span>Rating: ⭐ {submission.avgRating}</span>}
                </div>
                <button className="view-feedback-btn">👀 View Feedback</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeerReview;
