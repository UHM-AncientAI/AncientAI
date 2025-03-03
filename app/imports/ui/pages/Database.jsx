// pages/DatabasePage.js
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import DatabaseNavbar from '../components/DatabaseNavBar';
import CollectionsPage from './CollectionsPage';
import TranscriptionsPage from './TranscriptionsPage';

const Database = () => {
  const [activePage, setActivePage] = useState('collections'); // Default to Collections

  return (
    <Container fluid id="database-page">
      <DatabaseNavbar activePage={activePage} setActivePage={setActivePage} />
      {activePage === 'collections' ? <CollectionsPage /> : <TranscriptionsPage />}
    </Container>
  );
};

export default Database;
