// pages/CollectionsPage.js
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Collections } from '../../api/collections/Collections';
import CollectionCard from '../components/CollectionCard';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import SortDropdown from '../components/SortDropdown';

const CollectionsPage = () => {
  const { ready, collections } = useTracker(() => {
    const subscription = Meteor.subscribe(Collections.adminPublicationName);
    return {
      collections: Collections.collection.find({}).fetch(),
      ready: subscription.ready(),
    };
  }, []);

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
  const filteredCollections = collections.filter((collection) => {
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
          {!ready ? (
            <div className="text-center my-4">
              <Spinner animation="border" />
              <p>Loading collections...</p>
            </div>
          ) : (
            <Row>
              {sortedCollections.length > 0 ? (
                sortedCollections.map((collection, index) => (
                  <CollectionCard key={index} collection={collection} />
                ))
              ) : (
                <p className="text-center mt-4">No collections found.</p>
              )}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CollectionsPage;
