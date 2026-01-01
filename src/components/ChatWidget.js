import React, { useState, useEffect, useRef } from 'react';
import { FaTooth, FaCalendarAlt, FaUserMd, FaPhoneAlt, FaTimes, FaPaperPlane, FaUser, FaClock } from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import AppointmentForm from './AppointmentForm';
import Message from './Message';
import { sendMessageToAI, extractIntent, formatTime } from '../services/openaiService';
import { saveAppointment } from '../services/appointmentService';
import '../styles/ChatWidget.css';

const initialMessages = [
  {
    id: '1',
    text: "👋 Hello! I'm Dental Bot, your virtual assistant from Smile Dental Clinic. How can I help you today?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const quickReplies = [
  { text: "📅 Book Appointment", value: "I want to book an appointment" },
  { text: "⏰ Clinic Hours", value: "What are your clinic hours?" },
  { text: "💰 Pricing", value: "What are your prices for cleaning?" },
  { text: "👨‍⚕️ Our Services", value: "What dental services do you offer?" },
  { text: "🚨 Emergency", value: "I have a dental emergency" }
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showHandoff, setShowHandoff] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickReply = async (text) => {
    await handleSendMessage(text, true);
  };

  const handleSendMessage = async (text = '', isQuickReply = false) => {
    const messageText = text || inputValue;
    
    if (!messageText.trim() && !isQuickReply) return;

    const userMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!isQuickReply) setInputValue('');
    setIsLoading(true);

    // Add to conversation history
    const updatedHistory = [...conversationHistory, { role: 'user', content: messageText }];
    setConversationHistory(updatedHistory);

    // Check for specific intents
    const intent = extractIntent(messageText);
    
    if (intent === 'book_appointment') {
      setTimeout(() => {
        setShowAppointmentForm(true);
        setIsLoading(false);
      }, 1000);
      return;
    }

    if (intent === 'human_handoff') {
      setTimeout(() => {
        setShowHandoff(true);
        setIsLoading(false);
      }, 1000);
      return;
    }

    // Get AI response
    try {
      const aiResponse = await sendMessageToAI(messageText, updatedHistory);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setConversationHistory(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble connecting. Please try again or contact us directly at (123) 456-7890.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppointmentSubmit = async (appointmentData) => {
    try {
      await saveAppointment(appointmentData);
      
      const confirmationMessage = {
        id: Date.now().toString(),
        text: `✅ Thank you ${appointmentData.name}! Your appointment has been scheduled for ${formatTime(appointmentData.preferredTime)} on ${appointmentData.preferredDate}. We'll call you at ${appointmentData.phone} to confirm.`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, confirmationMessage]);
      setShowAppointmentForm(false);
    } catch (error) {
      console.error('Error saving appointment:', error);
      const errorMessage = {
        id: Date.now().toString(),
        text: "Sorry, there was an error booking your appointment. Please call us directly at (123) 456-7890.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleHandoff = () => {
    const handoffMessage = {
      id: Date.now().toString(),
      text: "A human agent will contact you shortly. Please keep this chat open. For immediate assistance, call (123) 456-7890.",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, handoffMessage]);
    setShowHandoff(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        className={`chat-widget-button ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <BsChatDots className="chat-icon" />
        <span className="pulse-ring"></span>
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="chat-widget-container">
          <div className="chat-header">
            <div className="header-content">
              <FaTooth className="header-icon" />
              <div>
                <h3>Dental Bot Assistant</h3>
                <p className="subtitle">Smile Dental Clinic • Online</p>
              </div>
            </div>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Handoff Modal */}
          {showHandoff && (
            <div className="handoff-modal">
              <div className="handoff-content">
                <FaUserMd className="handoff-icon" />
                <h4>Connect with Human Agent</h4>
                <p>You'll be connected with our dental staff for personalized assistance.</p>
                <div className="handoff-options">
                  <button onClick={handleHandoff} className="handoff-btn primary">
                    <FaPhoneAlt /> Call Now
                  </button>
                  <button onClick={() => setShowHandoff(false)} className="handoff-btn secondary">
                    Continue with Bot
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Appointment Form */}
          {showAppointmentForm ? (
            <AppointmentForm 
              onSubmit={handleAppointmentSubmit}
              onCancel={() => setShowAppointmentForm(false)}
            />
          ) : (
            <>
              {/* Messages Container */}
              <div className="messages-container">
                {messages.map(message => (
                  <Message key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="message bot">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="quick-replies">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className="quick-reply-btn"
                    onClick={() => handleQuickReply(reply.value)}
                  >
                    {reply.text}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="input-container">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  rows="1"
                  disabled={isLoading}
                />
                <button 
                  onClick={() => handleSendMessage(inputValue)}  // Fixed: Pass inputValue
                  disabled={isLoading || !inputValue.trim()}
                  className="send-button"
                >
                  <FaPaperPlane />
                </button>
              </div>

              {/* Handoff Button */}
              <button 
                className="handoff-trigger"
                onClick={() => setShowHandoff(true)}
              >
                <FaUserMd /> Talk to Human Agent
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;