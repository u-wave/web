import React from 'react';
import PropTypes from 'prop-types';
import MediaListBase from '../../MediaList/BaseMediaList';
import SearchResultRow from './SearchResultRow';

function SearchResultsList({ results }) {
  return (
    <MediaListBase
      className="PlaylistPanel-media"
      media={results}
      listComponent="div"
      rowComponent={SearchResultRow}
    />
  );
}

SearchResultsList.propTypes = {
  results: PropTypes.array.isRequired,
};

export default SearchResultsList;
