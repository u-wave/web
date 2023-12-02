import cx from 'clsx';
import IconButton from '@mui/material/IconButton';
import { mdiPlaylistPlus } from '@mdi/js';
import SvgIcon from '../../components/SvgIcon';

export interface YouTubePlaylist {
  sourceID: string;
  name: string;
  description: string;
  size: number;
  thumbnail: string;
}

type PlaylistRowProps = {
  className?: string,
  style?: React.CSSProperties,
  playlist: YouTubePlaylist,
  onImport: () => void,
}
function PlaylistRow({
  className,
  style,
  playlist,
  onImport,
  // etc
}: PlaylistRowProps) {
  const thumbnail = (
    <div className="MediaListRow-thumb">
      <img
        className="MediaListRow-image"
        key={playlist.sourceID}
        src={playlist.thumbnail}
        loading="lazy"
        alt=""
      />
    </div>
  );

  return (
    <div className={cx('MediaListRow', 'src-youtube-PlaylistRow', className)} style={style}>
      {thumbnail}
      <div className="src-youtube-PlaylistRow-info" title={playlist.description}>
        <div className="src-youtube-PlaylistRow-name">
          {playlist.name}
        </div>
        <div className="src-youtube-PlaylistRow-size">
          Items: {playlist.size}
        </div>
      </div>
      <IconButton className="src-youtube-PlaylistRow-import" onClick={onImport}>
        <SvgIcon path={mdiPlaylistPlus} />
      </IconButton>
    </div>
  );
}

export default PlaylistRow;
