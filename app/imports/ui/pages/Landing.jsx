import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="vh-100 vw-100">
    <Row id="landing-header" className="align-middle text-center">
      <h1 className="fw-bold">Ancient AI</h1>
    </Row>
    <div className="d-flex gap-3 mt-3">
      <Button id="landing-btn" className="btn" style={{ backgroundColor: '#F99D3D' }}>Upload</Button>
      <Button id="landing-btn" className="btn" style={{ backgroundColor: '#1FA378' }}>Database</Button>
      <Button id="landing-btn" className="btn" style={{ backgroundColor: '#FFC914' }}>Models</Button>
    </div>
    <Row className="position-absolute bottom-0 end-0 p-3">
      <span className="text-light">POWERED BY <b className="text-white">TRANSKRIBUS</b></span>
    </Row>
  </Container>
);

export default Landing;
