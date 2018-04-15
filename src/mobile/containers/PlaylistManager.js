import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectedPlaylistSelector,
  filteredSelectedPlaylistItemsSelector,
} from '../../selectors/playlistSelectors';
import { showSearchResultsSelector } from '../../selectors/searchSelectors';
import { showImportPanelSelector } from '../../selectors/importSelectors';
import createLazyOverlay from '../../components/LazyOverlay';

const mapStateToProps = createStructuredSelector({
  selectedPlaylist: selectedPlaylistSelector,
  selectedItems: filteredSelectedPlaylistItemsSelector,
  showImportPanel: showImportPanelSelector,
  showSearchResults: showSearchResultsSelector,
});

const enhance = connect(mapStateToProps);

const PlaylistManager = createLazyOverlay({
  loader: () => import('../components/PlaylistManager' /* webpackChunkName: "playlistsMobile" */),
  title: t => t('playlists.title'),
});

export default enhance(PlaylistManager);
