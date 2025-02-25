import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="vh-100 w-100">
    <Row id="landing-header" className="align-middle text-center">
      <h1 className="fw-bold">Ancient AI</h1>
    </Row>
    <div className="d-flex gap-3 mt-3">
      <Button id="landing-btn" className="btn btn-lg" style={{ backgroundColor: '#F99D3D' }}>Upload</Button>
      <Button id="landing-btn" className="btn btn-lg" style={{ backgroundColor: '#1FA378' }}>Database</Button>
      <Button id="landing-btn" className="btn btn-lg" style={{ backgroundColor: '#FFC914' }}>Models</Button>
    </div>
    <Row className="align-self-end position-absolute bottom-0 end-0 mb-3 me-3">
      <p className="text-light">POWERED BY <b className="text-white">TRANSKRIBUS</b></p>
    </Row>
  </Container>
);

export default Landing;
