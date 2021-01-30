import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import BaseSearchBar from '../../SearchBar';
import SourcePicker from './SourcePicker';
import { useMediaSearchStore } from '../../../stores/MediaSearchStore';
import { LOADING } from '../../../constants/LoadingStates';

function MediaSearchBar({ className }) {
  const {
    activeSource,
    search,
    state,
    setSource,
  } = useMediaSearchStore();

  const handleSubmit = (query) => search(query);
  const handleSourceChange = (newSource) => setSource(newSource);

  return (
    <BaseSearchBar
      className={className}
      onSubmit={handleSubmit}
      autoFocus
      icon={state === LOADING ? <CircularProgress size={24} /> : undefined}
    >
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
