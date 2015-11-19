import cx from 'classnames';
import React from 'react';

const SongTitle = ({ className, artist, title }) => {
  return (
    <div
      className={cx('SongTitle', className)}
      title={`${artist} – ${title}`}
    >
      <span className="SongTitle-artist">{artist}</span>
      <span className="SongTitle-separator"> – </span>
      <span className="SongTitle-title">{title}</span>
    </div>
  );
};

export default SongTitle;
