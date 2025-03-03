import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const TranscriptionCard = ({ title, description, image, year, author }) => (
  <Card className="shadow-sm border-0">
    <Card.Header className="bg-primary text-white fw-bold text-uppercase">
      {title}
    </Card.Header>
    <Card.Body>
      <h6 className="fw-bold">{description}</h6>
      <p>1 page</p>
      <img src={image} alt="Handwritten document" className="img-fluid mb-2 rounded" />
      <p className="text-muted">
        {year} <br /> {author}
      </p>
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
