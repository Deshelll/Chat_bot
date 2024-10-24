import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import '../styles/ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'User', text: 'Привет!' },
    { id: 2, sender: 'Assistant', text: 'Здравствуйте! Чем могу помочь?' },
  ]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  const clearMessages = () => {
    setMessages([]); // Добавлено
  };

  return (
    <div className="chat-window">
      <div className='chat-header'>
        <div className='chat-image'>
          <img src={require('../icons/chat-image.png')} />
        </div>
        <p className='chat-name'>
        Сибис — ваш виртуальный помощник
        </p>
      </div>
      <MessageList messages={messages} />
      <MessageInput addMessage={addMessage} clearMessages={clearMessages} />
    </div>
  );
};

export default ChatWindow;
