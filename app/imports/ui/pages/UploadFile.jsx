import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import OCRUploader from '../components/OCRUploader';

/** Render an OCR Uploader page. */
const UploadFile = () => (
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col xs={4} className="text-center">
        <h1>OCR Transcription</h1>
        <OCRUploader />
      </Col>
    </Row>
  </Container>
);

export default UploadFile;
