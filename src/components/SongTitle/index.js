import cx from 'classnames';
import * as React from 'react';
import pure from 'recompose/pure';

const SongTitle = ({ className, artist, title, size = 'large' }) => (
  <div
    className={cx('SongTitle', `SongTitle--${size}`, className)}
    title={`${artist} – ${title}`}
  >
    <span className="SongTitle-artist">{artist}</span>
    <span className="SongTitle-separator"> – </span>
    <span className="SongTitle-title">{title}</span>
  </div>
);

SongTitle.propTypes = {
  className: React.PropTypes.string,
  artist: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  size: React.PropTypes.string
};

export default pure(SongTitle);
