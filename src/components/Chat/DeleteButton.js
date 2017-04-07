import React from 'react';
import PropTypes from 'prop-types';

const DeleteButton = ({ onDelete }) => (
  <button
    className="ChatMessage-delete"
    onClick={onDelete}
  >
    Delete
  </button>
);

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired
};

export default DeleteButton;
