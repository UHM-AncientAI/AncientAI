import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const TranscriptionCard = ({ title, description, image, year, author }) => (
  <Card className="shadow-sm border-0">
    <Card.Header id="trans-header">
      {title}
    </Card.Header>
    <Card.Body>
      <h6 className="fw-bold">{description}</h6>
      <p>1 page</p>
      <p className="text-muted">
        Time Period: {year} <br /> Authors: {author}
      </p>
      <div className="image-container">
        <img src={image} alt="Handwritten document" />
      </div>
    </Card.Body>
  </Card>
);

TranscriptionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default TranscriptionCard;
