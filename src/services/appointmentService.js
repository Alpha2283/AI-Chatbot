import axios from 'axios';

const GOOGLE_SHEETS_WEBHOOK = process.env.REACT_APP_GOOGLE_SHEETS_WEBHOOK;

export const saveAppointment = async (appointmentData) => {
  try {
    // For now, we'll log to console and simulate API call
    // Replace with your Google Sheets webhook URL
    
    console.log('Saving appointment:', appointmentData);
    
    // If you have Google Sheets webhook set up:
    // const response = await axios.post(GOOGLE_SHEETS_WEBHOOK, {
    //   ...appointmentData,
    //   timestamp: new Date().toISOString()
    // });
    
    // For testing, simulate successful save
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: appointmentData });
      }, 1000);
    });
    
  } catch (error) {
    console.error('Error saving appointment:', error);
    throw error;
  }
};

// Google Apps Script template for webhook:
/*
function doPost(e) {
  var sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.name,
    data.phone,
    data.email,
    data.preferredDate,
    data.preferredTime,
    data.service,
    data.notes,
    'Pending'
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
*/