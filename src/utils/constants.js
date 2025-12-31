// Clinic Information
export const CLINIC_INFO = {
  name: 'Smile Dental Clinic',
  address: '123 Dental Street, City, State 12345',
  phone: '(123) 456-7890',
  email: 'info@smiledental.com',
  website: 'www.smiledental.com'
};

// Business Hours
export const BUSINESS_HOURS = [
  { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' }
];

// Services Offered
export const SERVICES = [
  {
    id: 'cleaning',
    name: 'Teeth Cleaning',
    description: 'Professional dental cleaning and polishing',
    duration: '60 minutes',
    price: '$80-$120'
  },
  {
    id: 'checkup',
    name: 'Dental Checkup',
    description: 'Comprehensive oral examination and X-rays',
    duration: '30 minutes',
    price: '$50-$100'
  },
  {
    id: 'whitening',
    name: 'Teeth Whitening',
    description: 'Professional teeth whitening treatment',
    duration: '90 minutes',
    price: '$300-$600'
  },
  {
    id: 'filling',
    name: 'Cavity Filling',
    description: 'Tooth-colored composite fillings',
    duration: '45 minutes',
    price: '$150-$300 per tooth'
  },
  {
    id: 'crown',
    name: 'Dental Crown',
    description: 'Porcelain or ceramic dental crowns',
    duration: '2 visits',
    price: '$800-$1500'
  },
  {
    id: 'emergency',
    name: 'Emergency Care',
    description: 'Immediate dental emergency treatment',
    duration: 'Varies',
    price: '$100 + treatment costs'
  },
  {
    id: 'root_canal',
    name: 'Root Canal',
    description: 'Endodontic treatment to save infected teeth',
    duration: '60-90 minutes',
    price: '$900-$1500'
  },
  {
    id: 'braces',
    name: 'Braces/Invisalign',
    description: 'Orthodontic consultation and treatment',
    duration: 'Consultation required',
    price: 'Varies'
  }
];

// Insurance Providers
export const INSURANCE_PROVIDERS = [
  'Delta Dental',
  'Aetna',
  'Cigna',
  'MetLife',
  'BlueCross BlueShield',
  'Humana',
  'UnitedHealthcare',
  'Guardian'
];

// Common Questions and Answers
export const FAQ = [
  {
    question: 'Do you accept my insurance?',
    answer: 'We accept most major insurance plans. Please bring your insurance card to your appointment for verification.'
  },
  {
    question: 'How often should I visit the dentist?',
    answer: 'We recommend visiting every 6 months for regular checkups and cleanings to maintain optimal oral health.'
  },
  {
    question: 'What should I do in a dental emergency?',
    answer: 'Call us immediately at (123) 456-7890. For after-hours emergencies, leave a message and we\'ll call you back promptly.'
  },
  {
    question: 'Do you offer payment plans?',
    answer: 'Yes, we offer flexible payment plans for major procedures. We also accept credit cards and CareCredit.'
  },
  {
    question: 'How can I prepare for my first visit?',
    answer: 'Please arrive 15 minutes early to complete paperwork. Bring your ID, insurance card, and list of current medications.'
  }
];

// Chatbot Configuration
export const CHATBOT_CONFIG = {
  maxMessageLength: 500,
  typingSpeed: 30, // milliseconds per character
  maxHistoryLength: 10,
  sessionTimeout: 30, // minutes
  welcomeMessages: [
    "👋 Hello! I'm Dental Bot, your virtual assistant from Smile Dental Clinic. How can I help you today?",
    "🦷 Welcome to Smile Dental Clinic! I'm here to assist with appointments, questions, and dental care information.",
    "💬 Hi there! I'm your dental assistant. I can help you book appointments, answer questions, or connect you with our team."
  ]
};

// Appointment Status
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  RESCHEDULED: 'rescheduled'
};

// Form Validation Rules
export const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s.'-]+$/,
    errorMessage: 'Please enter a valid name (letters and spaces only)'
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    errorMessage: 'Please enter a valid phone number'
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: 'Please enter a valid email address'
  },
  date: {
    min: new Date().toISOString().split('T')[0],
    errorMessage: 'Please select a future date'
  }
};

// Emergency Contact Information
export const EMERGENCY_CONTACTS = [
  {
    name: 'Emergency Dental Line',
    phone: '(123) 456-7890',
    description: '24/7 emergency dental assistance'
  },
  {
    name: 'Local Hospital',
    phone: '(555) 123-4567',
    description: 'For severe emergencies after hours'
  },
  {
    name: 'Poison Control',
    phone: '1-800-222-1222',
    description: 'For accidental ingestion of dental materials'
  }
];

// Time Slots for Appointments
export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
];

// API Configuration
export const API_CONFIG = {
  openRouter: {
    baseURL: 'https://openrouter.ai/api/v1',
    defaultModel: 'openai/gpt-3.5-turbo',
    timeout: 30000, // 30 seconds
    maxRetries: 3
  },
  googleSheets: {
    timeout: 10000, // 10 seconds
    retryDelay: 1000 // 1 second
  }
};

// UI Constants
export const UI = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#06b6d4',
    light: '#f8fafc',
    dark: '#1f2937'
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px'
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    }
  }
};

// Chatbot Personality
export const BOT_PERSONALITY = {
  tone: 'professional, empathetic, helpful',
  responseStyle: 'concise but thorough',
  language: 'clear, simple English',
  emojis: true,
  maxResponseLength: 300
};

// Storage Keys
export const STORAGE_KEYS = {
  CONVERSATION_HISTORY: 'dental_bot_conversation_history',
  USER_PREFERENCES: 'dental_bot_user_preferences',
  APPOINTMENT_DRAFT: 'dental_bot_appointment_draft',
  SESSION_ID: 'dental_bot_session_id'
};