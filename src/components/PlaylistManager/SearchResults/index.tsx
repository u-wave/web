import cx from 'clsx';
import { useTranslator } from '@u-wave/react-translate';
import { LOADING, LOADED } from '../../../constants/LoadingStates';
import NoSearchResults from './NoSearchResults';
import LoadingSearchResults from './LoadingSearchResults';
import SearchResultsList from './SearchResultsList';
import type { SearchResult } from '../../../containers/SearchResultsPanel';

type SearchResultsPanelProps = {
  className?: string,
  query: string,
  loadingState: `loadingState/${'IDLE' | 'LOADING' | 'LOADED'}`
  results: SearchResult[],
};
function SearchResultsPanel({
  className,
  query,
  loadingState,
  results,
}: SearchResultsPanelProps) {
  const { t } = useTranslator();

  let list;
  if (loadingState === LOADED && results.length > 0) {
    list = <SearchResultsList results={results} />;
  } else if (loadingState === LOADING) {
    list = <LoadingSearchResults />;
  } else {
    list = <NoSearchResults />;
  }

  return (
    <div className={cx('PlaylistPanel', 'SearchResults', className)}>
      <div className="SearchResults-query">
        {t('playlists.search.results', { query })}
      </div>
      {list}
    </div>
  );
}

export default SearchResultsPanel;
