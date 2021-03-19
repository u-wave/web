import React from 'react';
import PropTypes from 'prop-types';
import MediaList from '../../MediaList';
import SearchResultRow from './ResultRow';

function SearchResultsList({ results }) {
  return (
    <MediaList
      className="PlaylistPanel-media"
      media={results}
      rowComponent={SearchResultRow}
    />
  );
}

SearchResultsList.propTypes = {
  results: PropTypes.array.isRequired,
};

export default SearchResultsList;
