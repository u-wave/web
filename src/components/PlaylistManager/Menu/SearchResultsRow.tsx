import cx from 'clsx';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import { mdiClose, mdiMagnify } from '@mdi/js';
import SvgIcon from '../../SvgIcon';

type SearchResultsRowProps = {
  className?: string,
  query: string,
  onClick: () => void,
  onClose: () => void,
};
function SearchResultsRow({
  className,
  query,
  onClick,
  onClose,
}: SearchResultsRowProps) {
  return (
    <ListItem role="menuitem" className={cx('PlaylistMenuRow', 'PlaylistMenuRow--search', className)}>
      <button
        type="button"
        className="PlaylistMenuRow-title"
        onClick={onClick}
      >
        <div className="PlaylistMenuRow-active-icon">
          <SvgIcon path={mdiMagnify} />
        </div>
        &quot;{query}&quot;
      </button>
      <div className="PlaylistMenuRow-count">
        <IconButton className="PlaylistMenuRow-closeButton" onClick={onClose}>
          <SvgIcon path={mdiClose} />
        </IconButton>
      </div>
    </ListItem>
  );
}

export default SearchResultsRow;
