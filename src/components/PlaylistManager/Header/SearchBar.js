import React from 'react';
import PropTypes from 'prop-types';
import BaseSearchBar from '../../SearchBar';
import SourcePicker from './SourcePicker';
import { useMediaSearchStore } from '../../../stores/MediaSearchStore';

function MediaSearchBar({ className }) {
  const {
    activeSource,
    search,
    setSource,
  } = useMediaSearchStore();

  const handleSubmit = (query) => search(query);
  const handleSourceChange = (newSource) => setSource(newSource);

  return (
    <BaseSearchBar className={className} onSubmit={handleSubmit} autoFocus>
      <SourcePicker
        className="SearchBar-source"
        selected={activeSource}
        onChange={handleSourceChange}
      />
    </BaseSearchBar>
  );
}

MediaSearchBar.propTypes = {
  className: PropTypes.string,
};

export default MediaSearchBar;
