import { mdiHeadphones, mdiMusicNote } from '@mdi/js';
import SvgIcon from '../../components/SvgIcon';

type SongInfoProps = {
  /** The uploader name on SoundCloud. */
  artist: string,
  /** The title of the media on SoundCloud. */
  title: string,
  /** Full URL to the artist's SoundCloud page. */
  artistUrl: string,
  /** Full URL to the track page. */
  trackUrl: string,
};
function SongInfo({
  artist, title, artistUrl, trackUrl,
}: SongInfoProps) {
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

export default SongInfo;
