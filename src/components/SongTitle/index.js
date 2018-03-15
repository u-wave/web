import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';

const SongTitle = ({
  className, artist, title, size = 'large',
}) => (
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
  className: PropTypes.string,
  artist: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default pure(SongTitle);
