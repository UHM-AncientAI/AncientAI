// server/methods.js
import { Meteor } from 'meteor/meteor';
import axios from 'axios';
import FormData from 'form-data';

Meteor.methods({
  async 'ocelus.transcribe'(base64String, fileName) {
    try {
      // Convert base64 to buffer
      const buffer = Buffer.from(base64String, 'base64');

      const formData = new FormData();
      formData.append('image', buffer, { filename: fileName });

      const response = await axios.post(
        'https://atr.ocelus.teklia.com/api/v1/transcribe/',
        formData,
        {
          headers: {
            'API-Key': 'trial-c91a5dc713cede569faddf9cd8d47057',
            ...formData.getHeaders(),
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error transcribing image:', error);
      throw new Meteor.Error('transcription-failed', error.message);
    }
  },
});
