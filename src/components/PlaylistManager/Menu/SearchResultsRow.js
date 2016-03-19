/* eslint-disable react/prefer-stateless-function */
import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import SearchIcon from 'material-ui/svg-icons/action/search';
import muiThemeable from 'material-ui/styles/muiThemeable';

@muiThemeable()
export default class SearchResultsRow extends Component {
  static propTypes = {
    className: PropTypes.string,
    query: PropTypes.string,
    size: PropTypes.number,
    onClick: PropTypes.func,
    muiTheme: PropTypes.object.isRequired
  };

  render() {
    const { className, query, size, onClick, muiTheme } = this.props;
    return (
      <div
        role="menuitem"
        className={cx('PlaylistMenuRow', 'PlaylistMenuRow--search', className)}
        onClick={onClick}
      >
        <div className="PlaylistMenuRow-title">
          <div className="PlaylistMenuRow-active-icon">
            <SearchIcon color={muiTheme.palette.textColor} />
          </div>
          "{query}"
        </div>
        <div className="PlaylistMenuRow-count">{size}</div>
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
