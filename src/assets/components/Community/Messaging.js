import React, { useState } from 'react';

const Messaging = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      avatar: '👩‍🎓',
      lastMessage: 'Thanks for the Hindi lesson help!',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      language: 'Spanish ↔ Hindi'
    },
    {
      id: 2,
      name: 'Study Group: Bengali Basics',
      avatar: '👥',
      lastMessage: 'John: When is our next session?',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
      isGroup: true,
      members: 5
    },
    {
      id: 3,
      name: 'Dr. Anita Das',
      avatar: '👩‍🏫',
      lastMessage: 'Your pronunciation is improving!',
      timestamp: '3 hours ago',
      unread: 0,
      online: false,
      language: 'Bengali Tutor'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Maria Rodriguez',
      content: 'Hi! Can you help me with this Hindi sentence?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Of course! What do you need help with?',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Maria Rodriguez',
      content: 'How do I say "I am learning Hindi" correctly?',
      timestamp: '10:33 AM',
      isOwn: false
    },
    {
      id: 4,
      sender: 'You',
      content: 'You can say "मैं हिंदी सीख रहा/रही हूँ" (Main Hindi seekh raha/rahi hun)',
      timestamp: '10:35 AM',
      isOwn: true
    },
    {
      id: 5,
      sender: 'Maria Rodriguez',
      content: 'Thanks for the Hindi lesson help! 🙏',
      timestamp: '10:36 AM',
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="messaging">
      <div className="messaging-layout">
        {/* Conversations List */}
        <div className="conversations-sidebar">
          <div className="sidebar-header">
            <h3>💌 Messages</h3>
            <button className="new-chat-btn">➕</button>
          </div>
          
          <div className="search-box">
            <input type="text" placeholder="🔍 Search conversations..." className="search-input" />
          </div>

          <div className="conversations-list">
            {conversations.map((conversation, index) => (
              <div
                key={conversation.id}
                className={`conversation-item ${selectedChat?.id === conversation.id ? 'active' : ''}`}
                onClick={() => setSelectedChat(conversation)}
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className="conversation-avatar">
                  {conversation.avatar}
                  {conversation.online && <div className="online-indicator"></div>}
                </div>
                
                <div className="conversation-info">
                  <div className="conversation-header">
                    <h4 className="conversation-name">{conversation.name}</h4>
                    <span className="conversation-time">{conversation.timestamp}</span>
                  </div>
                  
                  <div className="conversation-preview">
                    <p className="last-message">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <div className="unread-badge">{conversation.unread}</div>
                    )}
                  </div>
                  
                  <div className="conversation-meta">
                    {conversation.isGroup ? (
                      <span className="group-info">👥 {conversation.members} members</span>
                    ) : (
                      <span className="language-info">{conversation.language}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {selectedChat ? (
            <>
              <div className="chat-header">
                <div className="chat-info">
                  <div className="chat-avatar">{selectedChat.avatar}</div>
                  <div className="chat-details">
                    <h3 className="chat-name">{selectedChat.name}</h3>
                    <span className="chat-status">
                      {selectedChat.online ? '🟢 Online' : '⚫ Offline'}
                    </span>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="voice-call-btn" title="Voice Call">📞</button>
                  <button className="video-call-btn" title="Video Call">📹</button>
                  <button className="info-btn" title="Info">ℹ️</button>
                </div>
              </div>

              <div className="messages-container">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`message ${message.isOwn ? 'own' : 'other'}`}
                    style={{ '--delay': `${index * 0.1}s` }}
                  >
                    <div className="message-content">
                      <p>{message.content}</p>
                      <span className="message-time">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="message-input-area">
                <div className="input-actions">
                  <button className="attach-btn" title="Attach File">📎</button>
                  <button className="emoji-btn" title="Emoji">😊</button>
                  <button className="voice-btn" title="Voice Message">🎤</button>
                </div>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="message-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="send-btn" onClick={handleSendMessage}>📤</button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="no-chat-icon">💌</div>
              <h3>Select a conversation to start messaging</h3>
              <p>Choose from your existing conversations or start a new chat</p>
              <button className="start-new-chat-btn">➕ Start New Chat</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messaging;
