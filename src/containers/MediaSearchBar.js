import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import SearchBar from '../components/PlaylistManager/Header/SearchBar';
import {
  search,
  setSource,
} from '../actions/SearchActionCreators';
import {
  searchSourceTypeSelector,
} from '../selectors/searchSelectors';

const mapStateToProps = createStructuredSelector({
  source: searchSourceTypeSelector,
});

const mapDispatchToProps = {
  onSubmit: search,
  onSourceChange: setSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
