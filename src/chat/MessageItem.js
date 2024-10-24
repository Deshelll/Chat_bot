import React from 'react';

const MessageItem = ({ message }) => {
  return (
    <div className={`message-item ${message.sender}`}>
      <div className="message-text">{message.text}</div>
    </div>
  );
};

export default MessageItem;
