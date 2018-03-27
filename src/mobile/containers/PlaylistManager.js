import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import nest from 'recompose/nest';
import {
  selectedPlaylistSelector,
  filteredSelectedPlaylistItemsSelector,
} from '../../selectors/playlistSelectors';
import { showSearchResultsSelector } from '../../selectors/searchSelectors';
import { showImportPanelSelector } from '../../selectors/importSelectors';
import Overlay from '../../components/Overlay';
import PlaylistManager from '../components/PlaylistManager';

const mapStateToProps = createStructuredSelector({
  selectedPlaylist: selectedPlaylistSelector,
  selectedItems: filteredSelectedPlaylistItemsSelector,
  showImportPanel: showImportPanelSelector,
  showSearchResults: showSearchResultsSelector,
});

export default connect(mapStateToProps)(nest(Overlay, PlaylistManager));
