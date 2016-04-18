import * as React from 'react';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import Action from './Action';

const RemoveFromPlaylist = ({ onRemove, ...props }) => (
  <Action {...props} onAction={onRemove}>
    <DeleteIcon color="#fff" />
  </Action>
);

RemoveFromPlaylist.propTypes = {
  onRemove: React.PropTypes.func.isRequired
};

export default RemoveFromPlaylist;
