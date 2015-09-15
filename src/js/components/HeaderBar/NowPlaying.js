import cx from 'classnames';
import isEqual from 'is-equal-shallow';
import React from 'react';

export default class NowPlaying extends React.Component {
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
      <div className={cx('NowPlaying', this.props.className)}>
        <span className="NowPlaying-artist">{this.props.artist}</span>
        <span className="NowPlaying-separator"> – </span>
        <span className="NowPlaying-title">{this.props.title}</span>
      </div>
    );
  }
}
