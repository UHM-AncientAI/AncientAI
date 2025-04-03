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
  description: { type: String, optional: true },
  startYear: String,
  endYear: { type: String, optional: true },
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
    years: true,
    location: true,
  });
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleSortChange = (order) => setSortOrder(order);
  const handleFilterChange = (field) => setFilters((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleModalClose = () => setShowModal(false); // Close the modal
  const handleModalShow = () => setShowModal(true); // Show the modal

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, description, startYear, endYear, authors, location } = data;
    const owner = Meteor.user().username;
    Collections.collection.insert(
      { title, description, startYear, endYear, authors, location, owner },
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

  const filteredCollections = collections.filter((collection) => {
    const keywords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
    if (keywords.length === 0) return true;

    const containsAllKeywords = (field) => keywords.every((keyword) => field.toLowerCase().includes(keyword));

    return (
      (filters.title && containsAllKeywords(collection.title)) ||
      (filters.authors && containsAllKeywords(collection.authors)) ||
      (filters.years && containsAllKeywords(
        `${collection.startYear}-${collection.endYear || 'Present'}`,
      )) ||
      (filters.location && containsAllKeywords(collection.location))
    );
  });

  const sortedCollections = [...filteredCollections].sort((a, b) => {
    const [field, direction] = sortOrder.split('-');

    if (field === 'title') {
      return (a.title || '').localeCompare(b.title || '') * (direction === 'asc' ? 1 : -1);
    }

    if (field === 'author') {
      return (a.authors || '').localeCompare(b.authors || '') * (direction === 'asc' ? 1 : -1);
    }

    if (field === 'date') {
      const startA = a.startYear ?? 9999; // Default missing years to 9999 (pushed to end)
      const startB = b.startYear ?? 9999;
      return (startA - startB) * (direction === 'asc' ? 1 : -1);
    }

    return 0; // Default case (no sorting)
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
                <TextField name="title" placeholder="Example: Journal Collections" />
                <TextField name="description" placeholder="Example: Collection of journals." />
                <TextField name="startYear" placeholder="Example: 1885" />
                <TextField name="endYear" placeholder="Example: 1890" />
                <TextField name="authors" placeholder="Example: Doane" />
                <TextField name="location" placeholder="Example: Marshall Islands" />
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
