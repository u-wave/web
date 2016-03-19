import * as React from 'react';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Action from './Action';

const EditMedia = ({ onEdit, muiTheme, ...props }) => (
  <Action {...props} onAction={onEdit}>
    <EditIcon color={muiTheme.palette.textColor} />
  </Action>
);

EditMedia.propTypes = {
  onEdit: React.PropTypes.func.isRequired,
  muiTheme: React.PropTypes.object.isRequired
};

export default muiThemeable()(EditMedia);
