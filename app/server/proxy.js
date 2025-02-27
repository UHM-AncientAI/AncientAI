const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_URL = 'https://atr.ocelus.teklia.com/api/v1/transcribe/';
const API_KEY = 'trial-c91a5dc713cede569faddf9cd8d47057';

app.post('/ocr', async (req, res) => {
  try {
    const image = req.body.image;
    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const response = await axios.post(API_URL, image, {
      headers: { 'API-Key': API_KEY, 'Content-Type': 'multipart/form-data' },
    });

    return res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'OCR request failed' });
  }
});

app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));
