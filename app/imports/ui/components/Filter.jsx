// components/Filter.js
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row } from 'react-bootstrap';

const Filter = ({ filters, handleFilterChange }) => (
  <Row className="px-2">
    <Form>
      {Object.keys(filters).map((filter) => (
        <Form.Check
          key={filter}
          type="checkbox"
          label={filter.charAt(0).toUpperCase() + filter.slice(1)}
          checked={filters[filter]}
          onChange={() => handleFilterChange(filter)}
        />
      ))}
    </Form>
  </Row>
);

Filter.propTypes = {
  filters: PropTypes.shape({
    title: PropTypes.bool,
    authors: PropTypes.bool,
    timePeriod: PropTypes.bool,
    location: PropTypes.bool,
  }).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default Filter;
