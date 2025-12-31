import { format } from 'date-fns';

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'MMMM dd, yyyy');
};

// Format time for display
export const formatTimeDisplay = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone number (basic validation)
export const validatePhone = (phone) => {
  const re = /^[\+]?[1-9][\d]{0,15}$/;
  return re.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input) => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Debounce function for search/API calls
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Generate unique ID
export const generateId = () => {
  return 'id_' + Math.random().toString(36).substr(2, 9);
};

// Check if it's business hours
export const isBusinessHours = () => {
  const now = new Date();
  const hours = now.getHours();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Monday-Friday: 9AM-6PM, Saturday: 10AM-4PM
  if (day >= 1 && day <= 5) { // Monday to Friday
    return hours >= 9 && hours < 18;
  } else if (day === 6) { // Saturday
    return hours >= 10 && hours < 16;
  }
  return false; // Sunday
};

// Get next business day
export const getNextBusinessDay = () => {
  const now = new Date();
  let nextDay = new Date(now);
  
  do {
    nextDay.setDate(nextDay.getDate() + 1);
  } while (nextDay.getDay() === 0 || nextDay.getDay() === 6); // Skip weekends
  
  return format(nextDay, 'yyyy-MM-dd');
};

// Calculate appointment duration based on service
export const getAppointmentDuration = (service) => {
  const durations = {
    'cleaning': 60,
    'checkup': 30,
    'whitening': 90,
    'filling': 45,
    'crown': 120,
    'emergency': 60
  };
  return durations[service] || 60; // Default to 60 minutes
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Get greeting based on time of day
export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

// Check if message contains emergency keywords
export const isEmergencyMessage = (message) => {
  const emergencyKeywords = [
    'emergency', 'urgent', 'severe pain', 'bleeding', 
    'broken tooth', 'knocked out', 'swelling', 'infection',
    'accident', 'trauma', 'unbearable', 'excruciating'
  ];
  
  const lowerMessage = message.toLowerCase();
  return emergencyKeywords.some(keyword => lowerMessage.includes(keyword));
};

// Get service price range
export const getServicePrice = (service) => {
  const prices = {
    'cleaning': '$80-$120',
    'checkup': '$50-$100',
    'whitening': '$300-$600',
    'filling': '$150-$300',
    'crown': '$800-$1500',
    'root canal': '$900-$1500',
    'emergency': '$100+'
  };
  return prices[service] || 'Contact for pricing';
};

// Delay utility for testing
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage utilities
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('LocalStorage set error:', error);
    }
  },
  
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('LocalStorage get error:', error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('LocalStorage remove error:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('LocalStorage clear error:', error);
    }
  }
};