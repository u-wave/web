import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import { mdiClose, mdiMagnify } from '@mdi/js';
import IconButton from '../../IconButton';
import SvgIcon from '../../SvgIcon';

const SearchResultsRow = ({
  className,
  query,
  onClick,
  onClose,
}) => (
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

SearchResultsRow.propTypes = {
  className: PropTypes.string,
  query: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchResultsRow;
