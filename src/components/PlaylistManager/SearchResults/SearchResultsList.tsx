import MediaListBase from '../../MediaList/BaseMediaList';
import SearchResultRow from './SearchResultRow';
import type { SearchResult } from '../../../containers/SearchResultsPanel';

type SearchResultsListProps = {
  results: SearchResult[],
};
function SearchResultsList({ results }: SearchResultsListProps) {
  return (
    <MediaListBase
      className="PlaylistPanel-media"
      media={results}
      listComponent="div"
      rowComponent={SearchResultRow}
    />
  );
}

export default SearchResultsList;
