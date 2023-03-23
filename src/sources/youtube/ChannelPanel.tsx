import cx from 'clsx';
import useSWRImmutable from 'swr/immutable';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';
import PlaylistRow, { YouTubePlaylist } from './PlaylistRow';

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
  const { data } = useSWRImmutable(url, async (playlistUrl: string) => {
    const apiUrl = new URL('/api/import/youtube/channel', window.location.href);
    apiUrl.searchParams.set('url', playlistUrl);
    const response = await fetch(apiUrl);
    const json: {
      channel: { id: string, title: string },
      playlists: YouTubePlaylist[],
    } = await response.json();
    return json;
  }, { suspense: true });
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.playlists.length,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan: 6,
  });

  return (
    <div className="ImportPanel ChannelPanel">
      <ImportPanelHeader onClosePanel={onClosePanel}>
        {`${data.channel.title}'s Playlists`}
      </ImportPanelHeader>
      <div className="MediaList ImportPanel-body" ref={parentRef}>
        <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
          {virtualizer.getVirtualItems().map(({ index, start }) => {
            const playlist = data.playlists[index];
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
