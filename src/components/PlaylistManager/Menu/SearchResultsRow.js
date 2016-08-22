import cx from 'classnames';
import * as React from 'react';
import SearchIcon from 'material-ui/svg-icons/action/search';

const SearchResultsRow = ({
  className,
  query,
  size,
  onClick
}) => (
  <div
    role="menuitem"
    className={cx('PlaylistMenuRow', 'PlaylistMenuRow--search', className)}
    onClick={onClick}
  >
    <div className="PlaylistMenuRow-title">
      <div className="PlaylistMenuRow-active-icon">
        <SearchIcon color="#fff" />
      </div>
      "{query}"
    </div>
    <div className="PlaylistMenuRow-count">{size}</div>
  </div>
);

SearchResultsRow.propTypes = {
  className: React.PropTypes.string,
  query: React.PropTypes.string,
  size: React.PropTypes.number,
  onClick: React.PropTypes.func
};

export default SearchResultsRow;
