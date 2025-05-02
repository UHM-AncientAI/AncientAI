// components/CollectionCard.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Button, Form } from 'react-bootstrap';

const CollectionCard = ({ collection, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCollection, setEditedCollection] = useState({ ...collection });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCollection((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(editedCollection);
    setIsEditing(false);
  };

  // Inside your component:
  useEffect(() => {
    setEditedCollection({ ...collection });
  }, [collection]);

  return (
    <Col md={4} className="mb-4">
      <Card id="collection-card">
        <Card.Header id="collection-header">
          {isEditing ? (
            <Form.Control
              type="text"
              name="title"
              value={editedCollection.title}
              onChange={handleChange}
            />
          ) : (
            editedCollection.title
          )}
        </Card.Header>
        <Card.Body>
          {isEditing ? (
            <>
              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={editedCollection.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Start Year</Form.Label>
                <Form.Control
                  type="number"
                  name="startYear"
                  value={editedCollection.startYear}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>End Year</Form.Label>
                <Form.Control
                  type="number"
                  name="endYear"
                  value={editedCollection.endYear || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Authors</Form.Label>
                <Form.Control
                  type="text"
                  name="authors"
                  value={editedCollection.authors}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={editedCollection.location}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="success" size="sm" onClick={handleSave}>Save</Button>{' '}
              <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>Close</Button>
            </>
          ) : (
            <>
              <Card.Text>
                <strong>{editedCollection.description}</strong>
              </Card.Text>
              <p id="collection-details">
                <b>Time Period:</b> {editedCollection.startYear} - {editedCollection.endYear || 'Present'} <br />
                <b>Authors:</b> {editedCollection.authors || 'Unknown'} <br />
                <b>Location:</b> {editedCollection.location}
              </p>
              <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

CollectionCard.propTypes = {
  collection: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    startYear: PropTypes.number,
    endYear: PropTypes.number,
    authors: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired, // pass function from parent to handle update
};

export default CollectionCard;
