import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import BaseSearchBar from '../../SearchBar';
import SourcePicker from './SourcePicker';
import { search, setSource } from '../../../actions/SearchActionCreators';
import { searchSourceTypeSelector } from '../../../selectors/searchSelectors';

const { useCallback } = React;

function MediaSearchBar({ className }) {
  const source = useSelector(searchSourceTypeSelector);
  const dispatch = useDispatch();
  const handleSubmit = useCallback((query) => {
    dispatch(search(query));
  }, []);
  const handleSourceChange = useCallback((newSource) => {
    dispatch(setSource(newSource));
  }, []);

  return (
    <BaseSearchBar className={className} onSubmit={handleSubmit} autoFocus>
      <SourcePicker
        className="SearchBar-source"
        selected={source}
        onChange={handleSourceChange}
      />
    </BaseSearchBar>
  );
}

MediaSearchBar.propTypes = {
  className: PropTypes.string,
};

export default MediaSearchBar;
