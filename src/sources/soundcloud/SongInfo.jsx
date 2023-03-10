import React from 'react';
import PropTypes from 'prop-types';
import { mdiHeadphones, mdiMusicNote } from '@mdi/js';
import SvgIcon from '../../components/SvgIcon';

function SongInfo({
  artist, title, artistUrl, trackUrl,
}) {
  return (
    <div className="src-soundcloud-SongInfo">
      <a
        className="src-soundcloud-SongInfo-link src-soundcloud-SongInfo-link--artist"
        target="_blank"
        rel="noopener noreferrer"
        href={artistUrl}
        title={artist}
      >
        <SvgIcon path={mdiHeadphones} className="src-soundcloud-SongInfo-icon" />
        {artist}
      </a>
      <a
        className="src-soundcloud-SongInfo-link src-soundcloud-SongInfo-link--track"
        target="_blank"
        rel="noopener noreferrer"
        href={trackUrl}
        title={title}
      >
        <SvgIcon path={mdiMusicNote} className="src-soundcloud-SongInfo-icon" />
        {title}
      </a>
    </div>
  );
}

SongInfo.propTypes = {
  /** The uploader name on SoundCloud. */
  artist: PropTypes.string.isRequired,
  /** The title of the media on SoundCloud. */
  title: PropTypes.string.isRequired,
  /** Full URL to the artist's SoundCloud page. */
  artistUrl: PropTypes.string.isRequired,
  /** Full URL to the track page. */
  trackUrl: PropTypes.string.isRequired,
};

export default SongInfo;
