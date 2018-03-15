import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  openPreviewMediaDialog,
} from '../actions/DialogActionCreators';
import {
  addMediaMenu,
} from '../actions/PlaylistActionCreators';

import {
  searchQuerySelector,
  searchResultsSelector,
  searchLoadingStateSelector,
} from '../selectors/searchSelectors';
import SearchResults from '../components/PlaylistManager/Panel/SearchResults';

const mapStateToProps = createStructuredSelector({
  query: searchQuerySelector,
  results: searchResultsSelector,
  loadingState: searchLoadingStateSelector,
});

const selectionOrOne = (media, selection) => {
  if (selection.isSelected(media)) {
    return selection.get();
  }
  return [media];
};

const onOpenAddMediaMenu = (position, media, selection) =>
  addMediaMenu(selectionOrOne(media, selection), position);

const mapDispatchToProps = dispatch => bindActionCreators({
  onOpenAddMediaMenu,
  onOpenPreviewMediaDialog: openPreviewMediaDialog,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
