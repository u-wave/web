import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from 'material-ui/svg-icons/action/search';

const SearchResultsRow = ({
  className,
  query,
  size,
  onClick
}) => (
  <button
    role="menuitem"
    className={cx('PlaylistMenuRow', 'PlaylistMenuRow--search', className)}
    onClick={onClick}
  >
    <div className="PlaylistMenuRow-content">
      <div className="PlaylistMenuRow-title">
        <div className="PlaylistMenuRow-active-icon">
          <SearchIcon color="#fff" />
        </div>
        &quot;{query}&quot;
      </div>
      <div className="PlaylistMenuRow-count">{size}</div>
    </div>
  </button>
);

SearchResultsRow.propTypes = {
  className: PropTypes.string,
  query: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func
};

export default SearchResultsRow;
