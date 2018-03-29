import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';

const wrapTitle = title => (
  <div className="MobileMediaRow-title">
    {title}
  </div>
);

const wrapArtist = artist => (
  <div className="MobileMediaRow-artist">
    {artist}
  </div>
);

const MediaRow = ({ media }) => (
  <ListItem
    className="MobileMediaRow"
    primaryText={wrapTitle(media.title)}
    secondaryText={
      <div>{wrapArtist(media.artist)}</div>
    }
    leftAvatar={
      <Avatar
        src={media.thumbnail}
        style={{ borderRadius: 0 }}
      />
    }
  />
);

MediaRow.propTypes = {
  media: PropTypes.object,
};

export default MediaRow;
