import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import OCRTest from '../components/OCRTest';

/** Render an OCR Uploader page. */
const UploadTest = () => (
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col xs={4} className="text-center">
        <h1>OCR Test</h1>
        <OCRTest />
      </Col>
    </Row>
  </Container>
);

export default UploadTest;
