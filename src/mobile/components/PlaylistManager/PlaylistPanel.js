import React from 'react';
import PropTypes from 'prop-types';
import MediaList from '../MediaList';
import PlaylistEmpty from '../../../components/PlaylistManager/Panel/PlaylistEmpty';

const PlaylistPanel = ({ items }) => (
  <div className="PlaylistPanel">
    {items.length > 0 ? (
      <MediaList
        className="PlaylistPanel-media"
        media={items}
      />
    ) : (
      <PlaylistEmpty />
    )}
  </div>
);

PlaylistPanel.propTypes = {
  items: PropTypes.array.isRequired,
};

export default PlaylistPanel;
