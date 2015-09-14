import cx from 'classnames';
import React from 'react';

export default class NowPlaying extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    artist: React.PropTypes.string,
    title: React.PropTypes.string
  };

  render() {
    return (
      <div className={cx('NowPlaying', this.props.className)}>
        <span className="NowPlaying-artist">{this.props.artist}</span>
        –
        <span className="NowPlaying-title">{this.props.title}</span>
      </div>
    );
  }
}
