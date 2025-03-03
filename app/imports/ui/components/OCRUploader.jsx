import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

const OCRUploader = ({ onTranscriptionComplete }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [plainText, setPlainText] = useState('');
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Validate file type
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (!fileType.match('image/(jpeg|jpg|png)') && fileType !== 'application/pdf') {
        setError('Please upload only image files (PNG, JPG) or PDF files');
        setFile(null);
        return;
      }
    }

    setFile(selectedFile);
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
        Meteor.call('ocelus.transcribe', base64String, file.name, file.type, (err, result) => {
          setIsLoading(false);

          if (err) {
            setError(err.reason || 'Error processing image');
            return;
          }

          console.log(result);

          // Extract plain text from result
          if (result && result.results && Array.isArray(result.results)) {
            const extractedText = result.results
              .map(item => item.text)
              .join('\n');

            setPlainText(extractedText);
            console.log(extractedText);

            // Call the callback with the extracted text
            if (onTranscriptionComplete) {
              onTranscriptionComplete(extractedText);
            }
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
    <div className="ocr-uploader mb-4">
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || !file}
        >
          {isLoading ? 'Processing...' : 'Transcribe Document'}
        </button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {plainText && (
        <div className="card mt-3">
          <div className="card-header">
            <h5 className="mb-0">Transcription Preview</h5>
          </div>
          <div className="card-body">
            <div className="text-content">
              {plainText.split('\n').map((line, i) => (
                <p key={i} className="mb-1">{line}</p>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-sm btn-secondary mt-2"
              onClick={() => {
                navigator.clipboard.writeText(plainText);
                alert('Text copied to clipboard!');
              }}
            >
              Copy Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRUploader;
