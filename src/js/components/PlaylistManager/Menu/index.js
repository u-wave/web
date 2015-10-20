import cx from 'classnames';
import React from 'react';
import naturalCmp from 'natural-compare';
import PlaylistRow from './Row';
import PlaylistCreate from './NewPlaylist';

const byName = (a, b) => naturalCmp(a.name.toLowerCase(), b.name.toLowerCase());

export default class Menu extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    playlists: React.PropTypes.array
  };

  render() {
    const { className, playlists } = this.props;
    const sorted = playlists.slice().sort(byName);
    return (
      <div className={cx('PlaylistMenu', className)}>
        <PlaylistCreate className="PlaylistMenu-row" />
        {sorted.map(pl => {
          return <PlaylistRow key={pl._id} className="PlaylistMenu-row" playlist={pl} />;
        })}
      </div>
    );
  }
}
