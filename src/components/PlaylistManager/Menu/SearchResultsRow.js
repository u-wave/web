/* eslint-disable react/prefer-stateless-function */
import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';

export default class SearchResultsRow extends Component {
  static propTypes = {
    className: PropTypes.string,
    query: PropTypes.string,
    size: PropTypes.number,
    onClick: PropTypes.func
  };

  render() {
    const { className, query, size, onClick } = this.props;
    return (
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
  }
}
/* eslint-enable react/prefer-stateless-function */
