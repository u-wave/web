import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import Action from './Action';

const RemoveFromPlaylist = ({ onRemove, ...props }) => (
  <Action {...props} onAction={onRemove}>
    <DeleteIcon />
  </Action>
);

RemoveFromPlaylist.propTypes = {
  onRemove: PropTypes.func.isRequired,
};

export default RemoveFromPlaylist;
