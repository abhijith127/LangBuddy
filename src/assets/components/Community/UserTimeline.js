import React from 'react';

const UserTimeline = () => {
  const timelinePosts = [
    {
      id: 1,
      user: 'Priya Sharma',
      avatar: '👩‍🎓',
      type: 'achievement',
      content: 'Just completed my 50th Hindi lesson! 🎉',
      timestamp: '2 hours ago',
      likes: 23,
      comments: 5,
      achievement: 'Hindi Dedication Badge'
    },
    {
      id: 2,
      user: 'Raj Patel',
      avatar: '👨‍💼',
      type: 'question',
      content: 'Can someone help me understand the difference between "में" and "पर"?',
      timestamp: '4 hours ago',
      likes: 12,
      comments: 8,
      tags: ['hindi', 'grammar', 'help']
    },
    {
      id: 3,
      user: 'Anita Das',
      avatar: '👩‍🏫',
      type: 'share',
      content: 'Found this amazing Bengali poetry collection! Highly recommend for intermediate learners.',
      timestamp: '6 hours ago',
      likes: 18,
      comments: 3,
      sharedResource: 'Bengali Poetry Anthology'
    }
  ];

  return (
    <div className="user-timeline">
      <div className="timeline-header">
        <h2>📰 Community Timeline</h2>
        <button className="create-post-btn">✍️ Create Post</button>
      </div>

      <div className="timeline-feed">
        {timelinePosts.map((post, index) => (
          <div key={post.id} className="timeline-post" style={{ '--delay': `${index * 0.1}s` }}>
            <div className="post-header">
              <div className="post-avatar">{post.avatar}</div>
              <div className="post-info">
                <h4 className="post-user">{post.user}</h4>
                <span className="post-timestamp">{post.timestamp}</span>
              </div>
              <div className={`post-type ${post.type}`}>
                {post.type === 'achievement' && '🏆'}
                {post.type === 'question' && '❓'}
                {post.type === 'share' && '📤'}
              </div>
            </div>

            <div className="post-content">
              <p>{post.content}</p>
              {post.achievement && (
                <div className="achievement-badge">🏆 {post.achievement}</div>
              )}
              {post.sharedResource && (
                <div className="shared-resource">📚 {post.sharedResource}</div>
              )}
              {post.tags && (
                <div className="post-tags">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="post-tag">#{tag}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="post-actions">
              <button className="like-btn">👍 {post.likes}</button>
              <button className="comment-btn">💬 {post.comments}</button>
              <button className="share-btn">📤 Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTimeline;
