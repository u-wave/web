import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

const closeButtonStyle = {
  width: 44,
  height: 44,
  padding: 10,
  marginRight: -10
};

const SearchResultsRow = ({
  className,
  query,
  onClick,
  onClose
}) => (
  <div role="menuitem" className={cx('PlaylistMenuRow', 'PlaylistMenuRow--search', className)}>
    <div className="PlaylistMenuRow-content">
      <button
        className="PlaylistMenuRow-title"
        onClick={onClick}
      >
        <div className="PlaylistMenuRow-active-icon">
          <SearchIcon color="#fff" />
        </div>
        &quot;{query}&quot;
      </button>
      <div className="PlaylistMenuRow-count">
        <IconButton style={closeButtonStyle} onClick={onClose}>
          <CloseIcon color="#777" />
        </IconButton>
      </div>
    </div>
  </div>
);

SearchResultsRow.propTypes = {
  className: PropTypes.string,
  query: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SearchResultsRow;
