import React from 'react';
import ArtistIcon from 'material-ui/lib/svg-icons/hardware/headset';
import TitleIcon from 'material-ui/lib/svg-icons/image/music-note';

const iconStyles = {
  float: 'left',
  marginRight: 3
};

const SongInfo = ({ artist, title, artistUrl, trackUrl }) => {
  return (
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
};

export default SongInfo;
