import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import TranscriptionCard from '../components/TranscriptionCard';

const transcriptions = [
  {
    title: 'Page 124 from Micronesian-Mission_Whitney, J.F. & Louisa 1871-1873-2-1',
    description: 'Journal page from Whitney during mission in Ebon on the Morning Star.',
    image: '/images/Page-124-from-Micronesian-Mission-Whitney-JF-AND-Louisa-1871-1873-2-1',
    year: '1871-1873',
    author: 'Whitney, J.S., Louisa',
  },
];

const TranscriptionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    title: true,
    authors: true,
    timePeriod: true,
    location: true,
  });

  const handleFilterChange = (field) => setFilters((prev) => ({ ...prev, [field]: !prev[field] }));

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={3} style={{ backgroundColor: '#A9C0E8', borderRadius: '20px' }}>
          <h4 className="p-2">Search</h4>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Filter filters={filters} handleFilterChange={handleFilterChange} />
        </Col>
        <Col md={9}>
          <Row xs={1} md={3} className="g-4">
            {transcriptions.map((item, index) => (
              <Col key={index}>
                <TranscriptionCard
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  year={item.year}
                  author={item.author}
                  status={item.status}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TranscriptionsPage;
