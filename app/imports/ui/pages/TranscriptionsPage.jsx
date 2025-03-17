import React, { useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Transcriptions } from '../../api/transcription/Transcription';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import TranscriptionCard from '../components/TranscriptionCard';
import SortDropdown from '../components/SortDropdown';

const TranscriptionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Default sort order; allow options like 'title-asc', 'date-asc', 'date-desc', etc.
  const [sortOrder, setSortOrder] = useState('title-asc');
  // Adjust filters to match the new schema fields
  const [filters, setFilters] = useState({
    title: true,
    author: true,
    date: true,
    text: true,
  });

  const { ready, transcriptionsData } = useTracker(() => {
    const subscription = Meteor.subscribe(Transcriptions.userPublicationName);
    const rdy = subscription.ready();
    const data = Transcriptions.collection.find({}).fetch();
    return { ready: rdy, transcriptionsData: data };
  }, []);

  const handleSortChange = (order) => setSortOrder(order);
  const handleFilterChange = (field) => setFilters((prev) => ({ ...prev, [field]: !prev[field] }));

  // Filter the transcriptions based on searchTerm and active filters.
  const filteredTranscriptions = transcriptionsData.filter((item) => {
    const keywords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
    if (keywords.length === 0) return true;
    const containsAllKeywords = (field) => field && keywords.every((keyword) => field.toLowerCase().includes(keyword));
    return (
      (filters.title && containsAllKeywords(item.title)) ||
        (filters.author && containsAllKeywords(item.author)) ||
        (filters.date &&
            containsAllKeywords(
              item.date ? new Date(item.date).toLocaleDateString() : '',
            )) ||
        (filters.text && containsAllKeywords(item.text))
    );
  });

  // Sort logic based on the sortOrder value.
  const sortedTranscriptions = [...filteredTranscriptions].sort((a, b) => {
    const [field, direction] = sortOrder.split('-');
    if (field === 'date') {
      return (new Date(a.date) - new Date(b.date)) * (direction === 'asc' ? 1 : -1);
    }
    return a[field].localeCompare(b[field]) * (direction === 'asc' ? 1 : -1);
  });

  // Check if the current sort field is 'date'
  const isDateSort = sortOrder.split('-')[0] === 'date';

  if (!ready) {
    return (
      <Container fluid className="py-4">
        <Row className="justify-content-center">
          <Spinner animation="border" />
          <p>Loading transcriptions...</p>
        </Row>
      </Container>
    );
  }

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
            <Col>
              <SortDropdown handleSortChange={handleSortChange} />
            </Col>
          </Row>
          {isDateSort ? (
          // When sorting by date, display items in a single horizontal scrollable row.
            <Row className="d-flex flex-row flex-nowrap overflow-auto">
              {sortedTranscriptions.length > 0 ? (
                sortedTranscriptions.map((item, index) => (
                  <Col key={index} className="flex-shrink-0" style={{ width: '300px' }}>
                    <TranscriptionCard
                      title={item.title}
                      description={`${item.text.substring(0, 100)}...`}
                      date={new Date(item.date).toLocaleDateString()}
                      author={item.author}
                    />
                  </Col>
                ))
              ) : (
                <p className="text-center mt-4">No transcriptions found.</p>
              )}
            </Row>
          ) : (
          // Standard grid layout for other sort options.
            <Row xs={1} md={3} className="g-4">
              {sortedTranscriptions.length > 0 ? (
                sortedTranscriptions.map((item, index) => (
                  <Col key={index}>
                    <TranscriptionCard
                      title={item.title}
                      description={`${item.text.substring(0, 100)}...`}
                      date={new Date(item.date).toLocaleDateString()}
                      author={item.author}
                    />
                  </Col>
                ))
              ) : (
                <p className="text-center mt-4">No transcriptions found.</p>
              )}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TranscriptionsPage;
