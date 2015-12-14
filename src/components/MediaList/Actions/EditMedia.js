import React from 'react';
import EditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';

import Action from './Action';

const EditMedia = ({ onEdit, ...props }) => {
  return (
    <Action {...props} onAction={onEdit}>
      <EditIcon color="#fff" />
    </Action>
  );
};

export default EditMedia;
