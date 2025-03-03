import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const TranscriptionItem = ({ transcription }) => (
  <tr>
    <td>{transcription.title}</td>
    <td>{transcription.author}</td>
    <td>{transcription.year}</td>
    <td>
      <Link to={`/edit/${transcription._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
TranscriptionItem.propTypes = {
  transcription: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    year: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default TranscriptionItem;
