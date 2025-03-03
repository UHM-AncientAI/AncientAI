import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import TranscriptionCard from '../components/TranscriptionCard';
import SortDropdown from '../components/SortDropdown';

const transcriptions = [
  {
    title: 'Page 124 from Micronesian-Mission_Whitney, J.F. & Louisa 1871-1873-2-1',
    description: 'Journal page from Whitney during mission in Ebon on the Morning Star.',
    image: '/images/Page-124-from-Micronesian-Mission-Whitney-JF-AND-Louisa-1871-1873-2-1.png',
    year: '1871-1873',
    author: 'Whitney, J.S., Louisa',
  },
];

const TranscriptionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('title-asc');
  const [filters, setFilters] = useState({
    title: true,
    authors: true,
    timePeriod: true,
    location: true,
  });

  const handleSortChange = (order) => setSortOrder(order);
  const handleFilterChange = (field) => setFilters((prev) => ({ ...prev, [field]: !prev[field] }));

  // Filter and sort logic (unchanged)
  const filteredCollections = transcriptions.filter((collection) => {
    const keywords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
    if (keywords.length === 0) return true;
    const containsAllKeywords = (field) => keywords.every((keyword) => field.toLowerCase().includes(keyword));
    return (
      (filters.title && containsAllKeywords(collection.title)) ||
      (filters.authors && containsAllKeywords(collection.authors)) ||
      (filters.timePeriod && containsAllKeywords(collection.timePeriod)) ||
      (filters.location && containsAllKeywords(collection.location))
    );
  });

  const sortedCollections = [...filteredCollections].sort((a, b) => {
    const [field, direction] = sortOrder.split('-');
    return a[field].localeCompare(b[field]) * (direction === 'asc' ? 1 : -1);
  });

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={3} style={{ backgroundColor: '#A9C0E8', borderRadius: '20px' }}>
          <h4 className="p-2">Search</h4>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Filter filters={filters} handleFilterChange={handleFilterChange} />
        </Col>
        <Col md={9}>
          <Row className="mb-3">
            <Col><SortDropdown handleSortChange={handleSortChange} /></Col>
          </Row>
          <Row xs={1} md={3} className="g-4">
            {sortedCollections.length > 0 ? (
              sortedCollections.map((item, index) => (
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
              ))
            ) : (
              <p className="text-center mt-4">No collections found.</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TranscriptionsPage;
