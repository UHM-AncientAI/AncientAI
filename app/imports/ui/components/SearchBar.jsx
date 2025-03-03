// components/SearchBar.js
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Row } from 'react-bootstrap';

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <Row className="mb-3" fluid>
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
);

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
