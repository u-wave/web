import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { translate } from '@u-wave/react-translate';
import { createStructuredSelector } from 'reselect';
import { selectedPlaylistSelector } from '../selectors/playlistSelectors';
import { showSearchResultsSelector } from '../selectors/searchSelectors';
import { showImportPanelSelector } from '../selectors/importSelectors';
import { createPlaylist } from '../actions/PlaylistActionCreators';
import createLazyOverlay from '../components/LazyOverlay';

const mapStateToProps = createStructuredSelector({
  selectedPlaylist: selectedPlaylistSelector,
  showImportPanel: showImportPanelSelector,
  showSearchResults: showSearchResultsSelector,
});

const mapDispatchToProps = (dispatch, { t }) => ({
  onCreatePlaylist: () => dispatch(createPlaylist(t('playlists.defaultName'))),
});

const enhance = compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps),
);

const PlaylistManager = createLazyOverlay({
  loader: () => import('../components/PlaylistManager' /* webpackChunkName: "playlists" */),
  title: t => t('playlists.title'),
});

export default enhance(PlaylistManager);
