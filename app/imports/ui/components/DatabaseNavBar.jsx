// components/DatabaseNavbar.js
import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';

const DatabaseNavbar = ({ activePage, setActivePage }) => (
  <Nav variant="tabs" className="mb-3" id="database-navbar">
    <Nav.Item>
      <Nav.Link
        active={activePage === 'collections'}
        onClick={() => setActivePage('collections')}
        id="database-navbar-links"
      >
        Collections
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link
        active={activePage === 'transcriptions'}
        onClick={() => setActivePage('transcriptions')}
        id="database-navbar-links"
      >
        Transcriptions
      </Nav.Link>
    </Nav.Item>
  </Nav>
);

DatabaseNavbar.propTypes = {
  activePage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired,
};

export default DatabaseNavbar;
