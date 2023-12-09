import cx from 'clsx';
import { SEARCH_RESULT } from '../../../constants/DDItemTypes';
import MediaRowBase from '../../MediaList/MediaRowBase';
import MediaDuration from '../../MediaList/MediaDuration';
import MediaThumbnail from '../../MediaList/MediaThumbnail';
import SearchResultActions from './SearchResultActions';
import type { SearchResult } from '../../../containers/SearchResultsPanel';

type SearchResultRowProps = {
  className?: string,
  media: SearchResult,
  style?: React.CSSProperties,
  onClick: (event?: React.MouseEvent) => void,
};
function SearchResultRow({
  className,
  media,
  style,
  onClick,
}: SearchResultRowProps) {
  let note = null;
  if (media.inPlaylists) {
    note = (
      <>
        In playlists:{' '}
        {media.inPlaylists.map((playlist) => playlist.name).join(', ')}
      </>
    );
  }

  return (
    <MediaRowBase
      media={media}
      className={cx(className, 'SearchResultRow')}
      style={style}
      onClick={onClick}
      dragType={SEARCH_RESULT}
    >
      <MediaThumbnail url={media.thumbnail} />
      <div className={cx('MediaListRow-data', 'SearchResultRow-data', note && 'has-note')}>
        <div className="MediaListRow-artist" title={media.artist}>
          {media.artist}
        </div>
        <div className="MediaListRow-title" title={media.title}>
          {media.title}
        </div>
        {note ? (
          <div className="MediaListRow-note">
            {note}
          </div>
        ) : null}
      </div>
      <div className="MediaListRow-duration">
        <MediaDuration media={media} />
      </div>
      <SearchResultActions className="MediaListRow-actions" media={media} />
    </MediaRowBase>
  );
}

export default SearchResultRow;
