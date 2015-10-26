import cx from 'classnames';
import React from 'react';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';

export default class SearchResultsRow extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    query: React.PropTypes.string,
    size: React.PropTypes.number
  };

  onClick() {
    // show search results
  }

  render() {
    const { className, query, size } = this.props;
    return (
      <div
        className={cx('PlaylistMenuRow', 'PlaylistMenuRow--search', className)}
        onClick={::this.onClick}
      >
        <div className="PlaylistMenuRow-active-icon">
          <SearchIcon color="#fff" />
        </div>
        "{query}"
        <span className="PlaylistMenuRow-count">{size}</span>
      </div>
    );
  }
}
