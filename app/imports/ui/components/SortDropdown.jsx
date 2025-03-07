// components/SortDropdown.js
import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, ButtonGroup, Col } from 'react-bootstrap';

const SortDropdown = ({ handleSortChange }) => (
  <Col className="text-end">
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle variant="secondary">Sort By</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSortChange('title-asc')}>Title (A-Z)</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('title-desc')}>Title (Z-A)</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('authors-asc')}>Authors (A-Z)</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('authors-desc')}>Authors (Z-A)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>
);

SortDropdown.propTypes = {
  handleSortChange: PropTypes.func.isRequired,
};

export default SortDropdown;
