import React from 'react';
import PropTypes from 'prop-types';
import MediaList from '../MediaList';

const PlaylistPanel = ({ items }) => (
  <div className="PlaylistPanel">
    <MediaList
      className="PlaylistPanel-media"
      media={items}
    />
  </div>
);

PlaylistPanel.propTypes = {
  items: PropTypes.array.isRequired,
};

export default PlaylistPanel;
