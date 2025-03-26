// components/CollectionCard.js
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';

const CollectionCard = ({ collection }) => (
  <Col md={4} className="mb-4">
    <Card id="collection-card">
      <Card.Header id="collection-header">{collection.title}</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>{collection.description}</strong>
          <br />
        </Card.Text>
        <p id="collection-details">
          <b>Time Period:</b> {collection.timePeriod} <br />
          <b>Authors:</b> {collection.authors} <br />
          <b>Location:</b> {collection.location}
        </p>
      </Card.Body>
    </Card>
  </Col>
);

CollectionCard.propTypes = {
  collection: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    timePeriod: PropTypes.string,
    authors: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};

export default CollectionCard;
