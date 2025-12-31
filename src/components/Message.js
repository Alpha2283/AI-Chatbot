import React from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';
import { format } from 'date-fns';

const Message = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`message ${isBot ? 'bot' : 'user'}`}>
      <div className="message-avatar">
        {isBot ? <FaRobot /> : <FaUser />}
      </div>
      <div className="message-content">
        <div className="message-text">
          {message.text}
        </div>
        <div className="message-timestamp">
          {format(new Date(message.timestamp), 'h:mm a')}
        </div>
      </div>
    </div>
  );
};

export default Message;