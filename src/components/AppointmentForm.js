import React, { useState } from 'react';
import { FaUser, FaPhoneAlt, FaCalendarAlt, FaClock, FaTooth } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const AppointmentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '09:00',
    service: 'cleaning',
    notes: ''
  });

  const services = [
    { value: 'cleaning', label: 'Teeth Cleaning' },
    { value: 'checkup', label: 'Dental Checkup' },
    { value: 'whitening', label: 'Teeth Whitening' },
    { value: 'filling', label: 'Cavity Filling' },
    { value: 'crown', label: 'Dental Crown' },
    { value: 'emergency', label: 'Emergency Care' }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends if more than 2 days ahead
      if (i > 2) {
        const day = date.getDay();
        if (day === 0 || day === 6) continue; // Skip Sunday (0) and Saturday (6)
      }
      
      const formattedDate = date.toISOString().split('T')[0];
      const displayDate = date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      
      dates.push({
        value: formattedDate,
        label: displayDate
      });
    }
    return dates;
  };

  return (
    <div className="appointment-form">
      <div className="form-header">
        <FaCalendarAlt className="form-icon" />
        <h4>Book Appointment</h4>
        <p>Fill in your details below</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><FaUser /> Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Smith"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><FaPhoneAlt /> Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="(123) 456-7890"
            />
          </div>

          <div className="form-group">
            <label><MdEmail /> Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><FaCalendarAlt /> Preferred Date</label>
            <select
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
            >
              {generateDateOptions().map(date => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label><FaClock /> Preferred Time</label>
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              required
            >
              {timeSlots.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label><FaTooth /> Service Needed</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            {services.map(service => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any specific concerns or requirements..."
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Book Appointment
          </button>
        </div>
      </form>

      <div className="form-footer">
        <p>📞 Need immediate help? Call (123) 456-7890</p>
      </div>
    </div>
  );
};

export default AppointmentForm;