import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/ModeEdit';
import Action from './Action';

const EditMedia = ({ onEdit, ...props }) => (
  <Action {...props} onAction={onEdit}>
    <EditIcon />
  </Action>
);

EditMedia.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default EditMedia;
