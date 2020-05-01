import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { IDLE, LOADING, LOADED } from '../../constants/LoadingStates';
import { addMediaMenu as openAddMediaMenu } from '../../actions/PlaylistActionCreators';
import { PLAYLIST, CHANNEL } from './constants';
import { importPlaylist } from './actions';
import LoadingPanel from './LoadingPanel';
import ChannelPanel from './ChannelPanel';
import PlaylistPanel from './PlaylistPanel';

const {
  useCallback,
} = React;

function YouTubeImportPanel({
  type,
  importingState,
  importingPlaylist,
  importingPlaylistItems,
  importingChannelTitle,
  importablePlaylists,
  onClosePanel,
}) {
  const dispatch = useDispatch();
  const onImportPlaylist = useCallback((id, name) => dispatch(importPlaylist(id, name)), []);
  const onOpenAddMediaMenu = useCallback((selection, position) => {
    dispatch(openAddMediaMenu(selection, position));
  }, []);

  if (importingState === LOADED) {
    if (type === PLAYLIST) {
      return (
        <PlaylistPanel
          importingPlaylist={importingPlaylist}
          importingPlaylistItems={importingPlaylistItems}
          onImportPlaylist={onImportPlaylist}
          onOpenAddMediaMenu={onOpenAddMediaMenu}
          onClosePanel={onClosePanel}
        />
      );
    }
    return (
      <ChannelPanel
        importingChannelTitle={importingChannelTitle}
        importablePlaylists={importablePlaylists}
        onImportPlaylist={onImportPlaylist}
        onClosePanel={onClosePanel}
      />
    );
  }
  return <LoadingPanel onClosePanel={onClosePanel} />;
}

YouTubeImportPanel.propTypes = {
  type: PropTypes.oneOf([PLAYLIST, CHANNEL]).isRequired,
  importingState: PropTypes.oneOf([IDLE, LOADING, LOADED]),
  importingPlaylist: PropTypes.object,
  importingPlaylistItems: PropTypes.arrayOf(PropTypes.object),
  importingChannelTitle: PropTypes.string,
  importablePlaylists: PropTypes.arrayOf(PropTypes.object),
  onClosePanel: PropTypes.func.isRequired,
};

export default YouTubeImportPanel;
