import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Card, Form, Spinner, Dropdown, ButtonGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Database } from '../../api/database/Database';

const DatabasePage = () => {
  const { ready, collections } = useTracker(() => {
    const subscription = Meteor.subscribe(Database.adminPublicationName);
    const rdy = subscription.ready();
    const collectionItems = Database.collection.find({}).fetch();
    return {
      collections: collectionItems,
      ready: rdy,
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('title-asc'); // Default sort order
  const [filters, setFilters] = useState({
    title: true,
    authors: true,
    timePeriod: true,
    location: true,
  });

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleFilterChange = (field) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: !prevFilters[field],
    }));
  };

  // Filter collections based on search term
  const filteredCollections = collections.filter(collection => {
    const keywords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
    if (keywords.length === 0) return true;

    const containsAllKeywords = (field) => keywords.every(keyword => field.toLowerCase().includes(keyword));
    const isAnyFilterEnabled = Object.values(filters).some(value => value);

    return (
      (!isAnyFilterEnabled || (filters.title && containsAllKeywords(collection.title))) ||
      (!isAnyFilterEnabled || (filters.authors && containsAllKeywords(collection.authors))) ||
      (!isAnyFilterEnabled || (filters.timePeriod && containsAllKeywords(collection.timePeriod))) ||
      (!isAnyFilterEnabled || (filters.location && containsAllKeywords(collection.location)))
    );
  });

  // Sort the filtered collections based on the selected sorting order
  const sortedCollections = [...filteredCollections].sort((a, b) => {
    const [field, direction] = sortOrder.split('-');
    const modifier = direction === 'asc' ? 1 : -1;
    return a[field].localeCompare(b[field]) * modifier;
  });

  return (
    <Container id="database-page" fluid className="py-4">
      <Row>
        <Col md={3} id="sidebar-filters" className="py-2">
          <h5 className="p-2 py-3">Search Collections</h5>
          <Row className="mb-3">
            <Col className="text-end">
              <Form.Control
                type="text"
                placeholder="Enter keywords (ex: 'Doane')"
                id="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
          </Row>

          <h6>Filters</h6>
          <Row className="px-2">
            <Form>
              <Form.Check type="checkbox" label="Title" checked={filters.title} onChange={() => handleFilterChange('title')} />
              <Form.Check type="checkbox" label="Authors" checked={filters.authors} onChange={() => handleFilterChange('authors')} />
              <Form.Check type="checkbox" label="Time Period" checked={filters.timePeriod} onChange={() => handleFilterChange('timePeriod')} />
              <Form.Check type="checkbox" label="Location" checked={filters.location} onChange={() => handleFilterChange('location')} />
            </Form>
          </Row>
        </Col>

        <Col md={9} className="py-2">
          <Row className="mb-3">
            <Col>
              <h4 id="section-title">Your Collections</h4>
              <Col className="text-end">
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle variant="secondary">Sort By</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSortChange('title-asc')}>Title (A-Z)</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('title-desc')}>Title (Z-A)</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('authors-asc')}>Authors (A-Z)</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('authors-desc')}>Authors (Z-A)</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Col>
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
                  <Col key={index} md={4} className="mb-4">
                    <Card id="collection-card">
                      <Card.Header id="collection-header">{collection.title}</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          <strong>{collection.description}</strong>
                          <br />
                          {collection.pages} pages
                        </Card.Text>
                        <p id="collection-details">
                          <b>Time Period:</b> {collection.timePeriod} <br />
                          <b>Authors:</b> {collection.authors} <br />
                          <b>Location:</b> {collection.location}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
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

export default DatabasePage;
