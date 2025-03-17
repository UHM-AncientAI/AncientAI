// components/SortDropdown.js
import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, ButtonGroup, Col } from 'react-bootstrap';

const SortDropdown = ({ handleSortChange }) => (
  <Col className="text-end">
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle variant="secondary">Sort By</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSortChange('title-asc')}>
          Title (A-Z)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('title-desc')}>
          Title (Z-A)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('author-asc')}>
          Author (A-Z)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('author-desc')}>
          Author (Z-A)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('date-asc')}>
          Date (Oldest First)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('date-desc')}>
          Date (Newest First)
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>
);

SortDropdown.propTypes = {
  handleSortChange: PropTypes.func.isRequired,
};

export default SortDropdown;
