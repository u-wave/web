import cx from 'clsx';
import { SEARCH_RESULT } from '../../constants/DDItemTypes';
import MediaRowBase from '../../components/MediaList/MediaRowBase';
import MediaDuration from '../../components/MediaList/MediaDuration';
import MediaThumbnail from '../../components/MediaList/MediaThumbnail';
import AddToPlaylistAction from '../../components/MediaList/AddToPlaylistAction';
import PreviewMediaAction from '../../components/MediaList/PreviewMediaAction';

export interface YouTubeMedia {
  _id: string;
  sourceType: 'youtube';
  sourceID: string;
  sourceData: Record<never, never>,
  artist: string;
  title: string;
  duration: number;
  start: number;
  end: number;
  thumbnail: string;
}

type ImportRowProps = {
  className?: string,
  style?: React.CSSProperties,
  media: YouTubeMedia,
  onClick: () => void,
};
function ImportRow({
  className,
  media,
  style,
  onClick,
}: ImportRowProps) {
  return (
    <MediaRowBase
      media={media}
      className={cx(className, 'ImportRow')}
      style={style}
      onClick={onClick}
      dragType={SEARCH_RESULT}
    >
      <MediaThumbnail url={media.thumbnail} />
      <div className={cx('MediaListRow-data')}>
        <div className="MediaListRow-artist" title={media.artist}>
          {media.artist}
        </div>
        <div className="MediaListRow-title" title={media.title}>
          {media.title}
        </div>
      </div>
      <div className="MediaListRow-duration">
        <MediaDuration media={media} />
      </div>
      <div className="MediaActions MediaListRow-actions">
        <PreviewMediaAction media={media} />
        <AddToPlaylistAction media={media} withCustomMeta={false} />
      </div>
    </MediaRowBase>
  );
}

export default ImportRow;
