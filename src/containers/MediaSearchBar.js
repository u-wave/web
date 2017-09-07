import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import withProps from 'recompose/withProps';
import SearchBar from '../components/PlaylistManager/Header/SearchBar';
import {
  searchInRecommendedSource,
  setSource
} from '../actions/SearchActionCreators';
import {
  searchSourceTypeSelector
} from '../selectors/searchSelectors';

const mapStateToProps = createStructuredSelector({
  source: searchSourceTypeSelector
});

const mapDispatchToProps = {
  onSubmit: searchInRecommendedSource,
  onSourceChange: setSource
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  getContext({ uwave: PropTypes.object }),
  withProps(props => ({
    // Add media sources to `onSubmit` handler.
    onSubmit: query => props.onSubmit(props.uwave.sources, query)
  }))
);

export default enhance(SearchBar);
