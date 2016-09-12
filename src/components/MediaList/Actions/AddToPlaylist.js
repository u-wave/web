import * as React from 'react';
import AddIcon from 'material-ui/svg-icons/content/add';

import Action from './Action';

const handleAdd = onAdd => (event) => {
  const pos = event.target.getBoundingClientRect();
  onAdd({
    x: pos.left,
    y: pos.top
  });
};

const AddToPlaylist = ({ onAdd, ...props }) => (
  <Action
    {...props}
    onAction={handleAdd(onAdd)}
  >
    <AddIcon color="#fff" />
  </Action>
);

AddToPlaylist.propTypes = {
  onAdd: React.PropTypes.func.isRequired
};

export default AddToPlaylist;
