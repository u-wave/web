import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  filteredSelectedPlaylistItemsSelector,
  isSelectedPlaylistLoadingSelector,
  isFilteredSelector,
} from '../../selectors/playlistSelectors';
import {
  filterPlaylistItems,
  cannotDeleteActivePlaylist,
  shufflePlaylist,
  loadPlaylist,
  loadFilteredPlaylistItems,
} from '../../actions/PlaylistActionCreators';
import PlaylistPanel from '../components/PlaylistManager/PlaylistPanel';
import {
  deletePlaylist,
  renamePlaylist,
  activatePlaylist,
  movePlaylistItems,
  selectedPlaylistSelector,
} from '../../reducers/playlists';

const mapStateToProps = createStructuredSelector({
  playlist: selectedPlaylistSelector,
  media: filteredSelectedPlaylistItemsSelector,
  loading: isSelectedPlaylistLoadingSelector,
  isFiltered: isFilteredSelector,
});

const onMoveMedia = (playlistID) => (media, opts) => (
  movePlaylistItems({ playlistID, medias: media, target: opts })
);
const onLoadPlaylistPage = ({ isFiltered, playlist }) => (page) => (
  isFiltered ? loadFilteredPlaylistItems(playlist._id, page)
    : loadPlaylist(playlist._id, page)
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
    onFilterPlaylistItems: filterPlaylistItems.bind(null, state.playlist._id),
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlaylistPanel);
