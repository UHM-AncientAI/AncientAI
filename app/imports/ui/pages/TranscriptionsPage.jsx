import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TranscriptionCard from '../components/TranscriptionCard';

const transcriptions = [
  {
    title: 'Page 2 from Micronesian Mission_Doane, ET_1879...',
    description: 'Removal of Training School to Ebon.',
    image: '/images/Page-2-from-Micronesian-Mission-Doane-ET-1879-Removal-of-Training-School-to-Ebon-DONE.png',
    year: '1879',
    author: 'Doane',
  },
];

const TranscriptionsPage = () => (
  <Container className="mt-4">
    <Row xs={1} md={3} className="g-4">
      {transcriptions.map((item, index) => (
        <Col key={index}>
          <TranscriptionCard
            title={item.title}
            description={item.description}
            image={item.image}
            year={item.year}
            author={item.author}
          />
        </Col>
      ))}
    </Row>
  </Container>
);

export default TranscriptionsPage;
