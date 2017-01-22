import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectedPlaylistSelector } from '../selectors/playlistSelectors';
import {
  showSearchResultsSelector
} from '../selectors/searchSelectors';
import { showImportPanelSelector } from '../selectors/importSelectors';
import PlaylistManager from '../components/PlaylistManager';

const mapStateToProps = createStructuredSelector({
  selectedPlaylist: selectedPlaylistSelector,
  showImportPanel: showImportPanelSelector,
  showSearchResults: showSearchResultsSelector
});

export default connect(mapStateToProps)(PlaylistManager);
