import React from 'react';
import PropTypes from 'prop-types';
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
  items: PropTypes.array.isRequired
};

export default PlaylistPanel;
