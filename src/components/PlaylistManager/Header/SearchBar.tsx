import { useDispatch } from '../../../hooks/useRedux';
import { showSearchResults } from '../../../reducers/playlists';
import { useMediaSearchStore } from '../../../stores/MediaSearchStore';
import BaseSearchBar from '../../SearchBar';
import SourcePicker from './SourcePicker';

type MediaSearchBarProps = {
  className?: string,
};
function MediaSearchBar({ className }: MediaSearchBarProps) {
  const {
    activeSource,
    search,
    setSource,
  } = useMediaSearchStore();
  const dispatch = useDispatch();

  const handleSubmit = (query: string) => {
    search(query);
    dispatch(showSearchResults());
  };

  return (
    <BaseSearchBar className={className} onSubmit={handleSubmit} autoFocus>
      <SourcePicker
        className="SearchBar-source"
        selected={activeSource}
        onChange={setSource}
      />
    </BaseSearchBar>
  );
}

export default MediaSearchBar;
