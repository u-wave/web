import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const SearchResultsRow = ({
  className,
  query,
  onClick,
  onClose,
}) => (
  <div role="menuitem" className={cx('PlaylistMenuRow', 'PlaylistMenuRow--search', className)}>
    <div className="PlaylistMenuRow-content">
      <button
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
          <CloseIcon nativeColor="#777" />
        </IconButton>
      </div>
    </div>
  </div>
);

SearchResultsRow.propTypes = {
  className: PropTypes.string,
  query: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchResultsRow;
