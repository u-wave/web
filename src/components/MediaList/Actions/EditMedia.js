import * as React from 'react';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import Action from './Action';

const EditMedia = ({ onEdit, ...props }) => (
  <Action {...props} onAction={onEdit}>
    <EditIcon color="#fff" />
  </Action>
);

EditMedia.propTypes = {
  onEdit: React.PropTypes.func.isRequired
};

export default EditMedia;
