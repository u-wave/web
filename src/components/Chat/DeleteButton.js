import * as React from 'react';

const DeleteButton = ({ onDelete }) => (
  <button
    className="ChatMessage-delete"
    onClick={onDelete}
  >
    Delete
  </button>
);

DeleteButton.propTypes = {
  onDelete: React.PropTypes.func.isRequired
};

export default DeleteButton;
