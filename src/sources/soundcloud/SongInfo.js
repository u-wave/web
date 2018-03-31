import React from 'react';
import PropTypes from 'prop-types';
import ArtistIcon from 'material-ui-icons/Headset';
import TitleIcon from 'material-ui-icons/MusicNote';

const iconStyles = {
  float: 'left',
  marginRight: 3,
};

const SongInfo = ({
  artist, title, artistUrl, trackUrl,
}) => (
  <div className="src-soundcloud-SongInfo">
    <a
      className="src-soundcloud-SongInfo-link src-soundcloud-SongInfo-link--artist"
      target="_blank"
      rel="noopener noreferrer"
      href={artistUrl}
      title={artist}
    >
      <ArtistIcon style={iconStyles} />
      {artist}
    </a>
    <a
      className="src-soundcloud-SongInfo-link src-soundcloud-SongInfo-link--track"
      target="_blank"
      rel="noopener noreferrer"
      href={trackUrl}
      title={title}
    >
      <TitleIcon style={iconStyles} />
      {title}
    </a>
  </div>
);

SongInfo.propTypes = {
  artist: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artistUrl: PropTypes.string.isRequired,
  trackUrl: PropTypes.string.isRequired,
};

export default SongInfo;
