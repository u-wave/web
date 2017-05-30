import React from 'react';
import PropTypes from 'prop-types';

const MediaThumbnail = ({ url }) => (
  <div className="MediaListRow-thumb">
    <img
      className="MediaListRow-image"
      src={url}
      alt=""
    />
  </div>
);

MediaThumbnail.propTypes = {
  url: PropTypes.string.isRequired
};

export default MediaThumbnail;
