import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

const OCRTest = () => {

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [plainText, setPlainText] = useState('');
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Read file as base64
      const reader = new FileReader();

      reader.onload = (event) => {
        // Get base64 string (remove the data URL prefix)
        const base64String = event.target.result.split(',')[1];

        // Call server method with base64 string
        Meteor.call('ocelus.transcribe', base64String, file.name, (err, result) => {
          setIsLoading(false);

          if (err) {
            setError(err.reason || 'Error processing image');
            return;
          }

          setResult(result);

          // Extract plain text from result
          if (result && result.results && Array.isArray(result.results)) {
            const extractedText = result.results
              .map(item => item.text)
              .join('\n');

            setPlainText(extractedText);

            // Store text in Meteor collection
            Meteor.call('transcriptions.insert', extractedText, file.name, (err) => {
              if (err) {
                console.error('Error saving transcription:', err);
              }
            });
          }
        });
      };

      reader.onerror = () => {
        setIsLoading(false);
        setError('Error reading file');
      };

      // Start reading the file as a data URL (base64)
      reader.readAsDataURL(file);

    } catch (error) {
      setIsLoading(false);
      setError(error.message || 'Error processing file');
    }
  };

  return (
    <div>
      <h2>OCR Document Upload</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          disabled={isLoading || !file}
        >
          {isLoading ? 'Processing...' : 'Transcribe Document'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {plainText && (
        <div className="result">
          <h3>Transcription:</h3>
          <div className="text-content">{plainText.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          </div>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(plainText);
              alert('Text copied to clipboard!');
            }}
          >
            Copy Text
          </button>
        </div>
      )}
    </div>
  );
};

export default OCRTest;
