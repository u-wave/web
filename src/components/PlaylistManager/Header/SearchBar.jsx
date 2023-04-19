import PropTypes from 'prop-types';
import { useDispatch } from '../../../hooks/useRedux';
import BaseSearchBar from '../../SearchBar';
import SourcePicker from './SourcePicker';
import { useMediaSearchStore } from '../../../stores/MediaSearchStore';
import { showSearchResults } from '../../../reducers/playlists';

function MediaSearchBar({ className }) {
  const {
    activeSource,
    search,
    setSource,
  } = useMediaSearchStore();
  const dispatch = useDispatch();

  const handleSubmit = (query) => {
    search(query);
    dispatch(showSearchResults());
  };
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
