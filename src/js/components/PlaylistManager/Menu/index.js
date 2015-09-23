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
    return (
      <div className={cx('PlaylistMenu', className)}>
        {playlists.map(pl => {
          return <PlaylistRow key={pl.id} className="PlaylistMenu-row" playlist={pl} />;
        })}
      </div>
    );
  }
}
