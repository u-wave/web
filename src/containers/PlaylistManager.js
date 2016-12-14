import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  search,
  setSource as setSearchSource
} from '../actions/SearchActionCreators';

import { selectedPlaylistSelector } from '../selectors/playlistSelectors';
import {
  showSearchResultsSelector,
  searchSourceTypeSelector
} from '../selectors/searchSelectors';
import { showImportPanelSelector } from '../selectors/importSelectors';
import PlaylistManager from '../components/PlaylistManager';

const mapStateToProps = createStructuredSelector({
  selectedPlaylist: selectedPlaylistSelector,
  showImportPanel: showImportPanelSelector,
  showSearchResults: showSearchResultsSelector,
  searchSource: searchSourceTypeSelector
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onSearchSubmit: search,
  onSearchSourceChange: setSearchSource
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistManager);
