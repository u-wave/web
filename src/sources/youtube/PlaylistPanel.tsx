import useSWRImmutable from 'swr/immutable';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { mdiPlaylistPlus } from '@mdi/js';
import SvgIcon from '../../components/SvgIcon';
import MediaListBase from '../../components/MediaList/BaseMediaList';
import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';
import ImportRow, { YouTubeMedia } from './ImportRow';
import uwFetch from '../../utils/fetch';

type YouTubeImportPlaylistPanelProps = {
  url: string,
  onImportPlaylist: (sourceID: string, name: string) => void,
  onClosePanel: () => void,
};
function YouTubeImportPlaylistPanel({
  url,
  onImportPlaylist,
  onClosePanel,
}: YouTubeImportPlaylistPanelProps) {
  const { data } = useSWRImmutable<{
    playlist: { sourceID: string, name: string },
    items: YouTubeMedia[],
  }>(
    ['/import/youtube/playlist', { qs: { url } }],
    uwFetch,
    { suspense: true },
  );

  if (!data) {
    return null;
  }

  const handleImportFull = () => (
    onImportPlaylist(data.playlist.sourceID, data.playlist.name)
  );

  return (
    <div className="ImportPanel src-youtube-PlaylistPanel">
      <ImportPanelHeader onClosePanel={onClosePanel}>
        <div className="src-youtube-PlaylistPanel-header">
          <div className="src-youtube-PlaylistPanel-name">
            {data.playlist.name}
          </div>
          <Tooltip title={`Import All (${data.items.length})`} placement="top">
            <IconButton onClick={handleImportFull}>
              <SvgIcon path={mdiPlaylistPlus} className="src-youtube-PlaylistPanel-importIcon" />
            </IconButton>
          </Tooltip>
        </div>
      </ImportPanelHeader>
      <MediaListBase
        className="ImportPanel-body"
        media={data.items}
        listComponent="div"
        rowComponent={ImportRow}
      />
    </div>
  );
}

export default YouTubeImportPlaylistPanel;
