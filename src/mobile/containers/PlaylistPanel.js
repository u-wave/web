import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { cannotDeleteActivePlaylist } from '../../actions/PlaylistActionCreators';
import PlaylistPanel from '../components/PlaylistManager/PlaylistPanel';
import {
  loadPlaylist,
  deletePlaylist,
  shufflePlaylist,
  renamePlaylist,
  activatePlaylist,
  movePlaylistItems,
  setPlaylistFilter,
  selectedPlaylistSelector,
  filteredSelectedPlaylistItemsSelector,
  playlistItemFilterSelector,
} from '../../reducers/playlists';

const mapStateToProps = createStructuredSelector({
  playlist: selectedPlaylistSelector,
  media: filteredSelectedPlaylistItemsSelector,
  filter: playlistItemFilterSelector,
});

const onMoveMedia = (playlistID) => (media, opts) => (
  movePlaylistItems({ playlistID, medias: media, target: opts })
);
const onLoadPlaylistPage = ({ filter, playlist }) => (
  (page) => loadPlaylist({ playlistID: playlist._id, page, filter })
);

// Most of the playlist-related action creators need to know which playlist to
// use, i.e. need to have a reference to the selected playlist. The selected
// playlist is picked out in `mapStateToProps`, but we can't access its result
// in `mapDispatchToProps` yet. Instead, `mapDispatchToProps` passes the
// `dispatch` function to the `mergeProps` function below, and then that
// configures the action creators.
// TODO Maybe it's better to have versions of these action creators that work on
// the selected playlist by default? using redux-thunk.
const mapDispatchToProps = (dispatch) => ({ dispatch });

const mergeProps = (state, { dispatch }, props) => ({
  ...props,
  ...state,
  ...bindActionCreators({
    onShufflePlaylist: shufflePlaylist.bind(null, state.playlist._id),
    onActivatePlaylist: activatePlaylist.bind(null, state.playlist._id),
    onRenamePlaylist: (name) => renamePlaylist({ playlistID: state.playlist._id, name }),
    onDeletePlaylist: deletePlaylist.bind(null, state.playlist._id),
    onNotDeletable: cannotDeleteActivePlaylist,
    onMoveMedia: onMoveMedia(state.playlist._id),
    onLoadPlaylistPage: onLoadPlaylistPage(state),
    onFilterPlaylistItems:
      (filter) => setPlaylistFilter({ playlistID: state.playlist._id, filter }),
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlaylistPanel);
