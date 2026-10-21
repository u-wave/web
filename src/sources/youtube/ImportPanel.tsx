import { useCallback } from 'react';
import { useDispatch } from '../../hooks/useRedux';
import ChannelPanel from './ChannelPanel';
import LoadingPanel from './LoadingPanel';
import PlaylistPanel from './PlaylistPanel';
import { importPlaylist, type State } from './reducer';

type YouTubeImportPanelProps = State & {
  onClosePanel: () => void,
};
function YouTubeImportPanel(props: YouTubeImportPanelProps) {
  const dispatch = useDispatch();
  const onImportPlaylist = useCallback((sourceID: string, name: string) => {
    return dispatch(importPlaylist({ sourceID, name }));
  }, [dispatch]);

  const { type } = props;
  if (type === 'playlist') {
    return <PlaylistPanel {...props} onImportPlaylist={onImportPlaylist} />;
  }
  if (type === 'channel') {
    return <ChannelPanel {...props} onImportPlaylist={onImportPlaylist} />;
  }
  return <LoadingPanel {...props} />;
}

export default YouTubeImportPanel;
