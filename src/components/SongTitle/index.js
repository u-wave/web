import cx from 'classnames';
import isEqual from 'is-equal-shallow';
import React from 'react';

export default class SongTitle extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    artist: React.PropTypes.string,
    title: React.PropTypes.string
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) ||
           !isEqual(this.state, nextState);
  }


  render() {
    return (
      <div className={cx('SongTitle', this.props.className)}>
        <span className="SongTitle-artist">{this.props.artist}</span>
        <span className="SongTitle-separator"> – </span>
        <span className="SongTitle-title">{this.props.title}</span>
      </div>
    );
  }
}
