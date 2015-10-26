import cx from 'classnames';
import React from 'react';
import naturalCmp from 'natural-compare';
import PlaylistRow from './Row';
import PlaylistCreateRow from './NewPlaylist';
import SearchResultsRow from './SearchResultsRow';

const byName = (a, b) => naturalCmp(a.name.toLowerCase(), b.name.toLowerCase());

export default class Menu extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    playlists: React.PropTypes.array,
    searchQuery: React.PropTypes.string,
    searchResults: React.PropTypes.number
  };

  render() {
    const { className, playlists, searchQuery, searchResults } = this.props;
    const sorted = playlists.slice().sort(byName);
    return (
      <div className={cx('PlaylistMenu', className)}>
        <PlaylistCreateRow className="PlaylistMenu-row" />
        {searchQuery && (
          <SearchResultsRow
            className="PlaylistMenu-row is-selected"
            query={searchQuery}
            size={searchResults}
          />
        )}
        {sorted.map(pl => {
          return <PlaylistRow key={pl._id} className="PlaylistMenu-row" playlist={pl} />;
        })}
      </div>
    );
  }
}
