import cx from 'classnames';
import React from 'react';
import PlaylistRow from './Row';

export default class Menu extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    playlists: React.PropTypes.array
  };

  render() {
    const { className, playlists } = this.props;
    const sorted = playlists.slice().sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
    return (
      <div className={cx('PlaylistMenu', className)}>
        {sorted.map(pl => {
          return <PlaylistRow key={pl.id} className="PlaylistMenu-row" playlist={pl} />;
        })}
      </div>
    );
  }
}
