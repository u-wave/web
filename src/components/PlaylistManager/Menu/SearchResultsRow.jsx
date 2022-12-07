import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

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
        <SearchIcon />
      </div>
      &quot;{query}&quot;
    </button>
    <div className="PlaylistMenuRow-count">
      <IconButton className="PlaylistMenuRow-closeButton" onClick={onClose}>
        <CloseIcon htmlColor="#777" />
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
