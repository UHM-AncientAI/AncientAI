import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const TranscriptionCard = ({ title, description, date, author }) => (
  <Card className="shadow-sm border-0">
    <Card.Header id="trans-header">
      {title}
    </Card.Header>
    <Card.Body>
      <h6 className="fw-bold">{description}</h6>
      <p>1 page</p>
      <p className="text-muted">
        Date: {date} <br /> Authors: {author}
      </p>
    </Card.Body>
  </Card>
);

TranscriptionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default TranscriptionCard;
