import * as React from 'react';
import { List } from 'material-ui/List';
import MediaRow from '../MediaRow';

const PlaylistPanel = ({ items }) => (
  <List>
    {items.map(item => (
      <MediaRow media={item} />
    ))}
  </List>
);

PlaylistPanel.propTypes = {
  items: React.PropTypes.array.isRequired
};

export default PlaylistPanel;
