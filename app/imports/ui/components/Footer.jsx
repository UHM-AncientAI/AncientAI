import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 fluid" style={{ background: '#14224A' }}>
    <Container id="footer">
      <Col className="text-center">
        ICS 496 Capstone Project
        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
        <a href="http://ics-software-engineering.github.io/meteor-application-template-react">
          Template Home
          Page
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
