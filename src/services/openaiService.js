import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

const DENTAL_CONTEXT = `
You are Dental Bot, an AI assistant for Smile Dental Clinic. You help patients with:

CLINIC INFORMATION:
- Name: Smile Dental Clinic
- Hours: Monday-Friday: 9AM-6PM, Saturday: 10AM-4PM, Sunday: Closed
- Phone: (123) 456-7890
- Address: 123 Dental Street, City, State 12345
- Emergency: Call (123) 456-7890 or visit emergency room for severe pain

SERVICES & PRICING:
- Dental Cleaning: $80-$120
- Dental Checkup: $50-$100
- Teeth Whitening: $300-$600
- Cavity Filling: $150-$300 per tooth
- Dental Crown: $800-$1500
- Root Canal: $900-$1500
- Braces/Invisalign: Consultation required
- Emergency Visit: $100 + treatment costs

APPOINTMENT BOOKING:
- Ask for preferred date/time, name, phone, email
- Appointments typically 1 hour
- Need 24-hour notice for cancellations
- New patients need 15 minutes early for paperwork

INSURANCE:
- We accept most major insurance plans
- Insurance verification needed before appointment
- Payment plans available

EMERGENCY GUIDANCE:
- Severe pain: Contact immediately
- Broken tooth: Save pieces, rinse mouth
- Knocked-out tooth: Keep in milk, come immediately
- Bleeding: Apply pressure with gauze

ALWAYS:
- Be empathetic and professional
- Offer to book appointments
- Provide clear next steps
- Ask if they need human assistance for complex issues
- Don't give medical advice beyond basic guidance
- Redirect emergencies to call clinic
`;

export const sendMessageToAI = async (userMessage, conversationHistory) => {
  try {
    const messages = [
      {
        role: 'system',
        content: DENTAL_CONTEXT
      },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      {
        role: 'user',
        content: userMessage
      }
    ];

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://dental-bot.vercel.app',
          'X-Title': 'Dental Bot'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const extractIntent = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('appointment') || lowerMessage.includes('book') || lowerMessage.includes('schedule')) {
    return 'book_appointment';
  }
  
  if (lowerMessage.includes('human') || lowerMessage.includes('agent') || lowerMessage.includes('representative')) {
    return 'human_handoff';
  }
  
  if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('pain')) {
    return 'emergency';
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
    return 'pricing';
  }
  
  return 'general_inquiry';
};

export const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};