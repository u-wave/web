import * as React from 'react';
import ArtistIcon from 'material-ui/svg-icons/hardware/headset';
import TitleIcon from 'material-ui/svg-icons/image/music-note';

const iconStyles = {
  float: 'left',
  marginRight: 3
};

const SongInfo = ({ artist, title, artistUrl, trackUrl }) => (
  <div className="SoundCloudSongInfo">
    <a
      className="SoundCloudSongInfo-link SoundCloudSongInfo-link--artist"
      target="_blank"
      href={artistUrl}
    >
      <ArtistIcon style={iconStyles} />
      {artist}
    </a>
    <a
      className="SoundCloudSongInfo-link SoundCloudSongInfo-link--track"
      target="_blank"
      href={trackUrl}
    >
      <TitleIcon style={iconStyles} />
      {title}
    </a>
  </div>
);

SongInfo.propTypes = {
  artist: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  artistUrl: React.PropTypes.string.isRequired,
  trackUrl: React.PropTypes.string.isRequired
};

export default SongInfo;
