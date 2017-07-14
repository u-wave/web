import React from 'react';
import PropTypes from 'prop-types';
import BaseSearchBar from '../../SearchBar';
import SourcePicker from './SourcePicker';

const SearchBar = ({
  className,
  source,
  onSubmit,
  onSourceChange
}) => (
  <BaseSearchBar className={className} onSubmit={onSubmit}>
    <SourcePicker
      className="SearchBar-source"
      selected={source}
      onChange={onSourceChange}
    />
  </BaseSearchBar>
);

SearchBar.propTypes = {
  className: PropTypes.string,
  source: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSourceChange: PropTypes.func.isRequired
};

export default SearchBar;
