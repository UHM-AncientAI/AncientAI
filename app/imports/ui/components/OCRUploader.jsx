import React, { useState } from 'react';
import axios from 'axios';

/** Allows users to upload an image file, send it to the backend for Optical Character Recognition (OCR) processing, and display the transcribed text. It manages file selection, handles the upload request, and displays the result.
 * * */
const OCRUploader = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Log the selected file to the console
    console.log('Selected File:', selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      console.log('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    console.log('Uploading file:', file.name);
    console.log(['Form Data:', formData]);

    try {
      const response = await axios.post('http://localhost:4000/ocr', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Server Response:', response.data);
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setResult('Error processing image');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>Upload & Transcribe</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default OCRUploader;
