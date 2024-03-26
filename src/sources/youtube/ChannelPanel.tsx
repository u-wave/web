import cx from 'clsx';
import useSWRImmutable from 'swr/immutable';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';
import PlaylistRow, { type YouTubePlaylist } from './PlaylistRow';
import uwFetch from '../../utils/fetch';

function estimateSize() {
  return 56;
}

type ChannelPanelProps = {
  url: string,
  onImportPlaylist: (sourceID: string, name: string) => void,
  onClosePanel: () => void,
};
function ChannelPanel({
  url,
  onImportPlaylist,
  onClosePanel,
}: ChannelPanelProps) {
  const { data } = useSWRImmutable<{
    channel: { id: string, title: string },
    playlists: YouTubePlaylist[],
  }>(
    ['/import/youtube/channel', { qs: { url } }],
    uwFetch,
    { suspense: true },
  );
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data?.playlists.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan: 6,
  });

  if (!data) {
    return null;
  }

  return (
    <div className="ImportPanel ChannelPanel">
      <ImportPanelHeader onClosePanel={onClosePanel}>
        {`${data.channel.title}'s Playlists`}
      </ImportPanelHeader>
      <div className="MediaList ImportPanel-body" ref={parentRef}>
        <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
          {virtualizer.getVirtualItems().map(({ index, start }) => {
            const playlist = data.playlists[index]!;
            const style = { transform: `translateY(${start}px)` };
            return (
              <PlaylistRow
                key={playlist.sourceID}
                className={cx('MediaList-row', index % 2 === 0 ? 'MediaListRow--alternate' : null)}
                style={style}
                playlist={playlist}
                onImport={() => onImportPlaylist(playlist.sourceID, playlist.name)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ChannelPanel;
