import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from 'material-ui-icons/Add';
import Action from './Action';

const handleAdd = onAdd => (event) => {
  const pos = event.target.getBoundingClientRect();
  onAdd({
    x: pos.left,
    y: pos.top,
  });
};

const AddToPlaylist = ({ onAdd, ...props }) => (
  <Action
    {...props}
    onAction={handleAdd(onAdd)}
  >
    <AddIcon />
  </Action>
);

AddToPlaylist.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddToPlaylist;
