import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Container, Row, Col, Spinner, Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Collections } from '../../api/collections/Collections';
import CollectionCard from '../components/CollectionCard';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import SortDropdown from '../components/SortDropdown';

const formSchema = new SimpleSchema({
  title: String,
  description: String,
  timePeriod: String,
  authors: String,
  location: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

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
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleSortChange = (order) => setSortOrder(order);
  const handleFilterChange = (field) => setFilters((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleModalClose = () => setShowModal(false); // Close the modal
  const handleModalShow = () => setShowModal(true); // Show the modal

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, description, timePeriod, authors, location, transcriptions } = data;
    const owner = Meteor.user().username;
    Collections.collection.insert(
      { title, description, timePeriod, authors, location, owner, transcriptions },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Collection added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  let fRef = null;

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
            <Col>
              <SortDropdown handleSortChange={handleSortChange} />
            </Col>
            <Col className="d-flex justify-content-end">
              <Button variant="primary" onClick={handleModalShow}>Add Collection</Button> {/* Open modal */}
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
                  <CollectionCard key={index} collection={collection} />
                ))
              ) : (
                <p className="text-center mt-4">No collections found.</p>
              )}
            </Row>
          )}
        </Col>
      </Row>

      {/* Modal for adding a collection */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="title" />
                <TextField name="description" />
                <TextField name="timePeriod" />
                <TextField name="authors" />
                <TextField name="location" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CollectionsPage;
