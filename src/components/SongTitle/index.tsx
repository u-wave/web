import cx from 'clsx';
import React from 'react';

type SongTitleProps = {
  className?: string,
  artist: React.ReactNode,
  title: React.ReactNode,
  size?: 'large' | 'mediaRow',
};

function SongTitle({
  className,
  artist,
  title,
  size = 'large',
}: SongTitleProps) {
  const hoverTitle = typeof artist === 'string' && typeof title === 'string'
    ? `${artist} – ${title}` : undefined;

  return (
    <div
      className={cx('SongTitle', `SongTitle--${size}`, className)}
      title={hoverTitle}
    >
      <span className="SongTitle-artist">{artist}</span>
      <span className="SongTitle-separator"> – </span>
      <span className="SongTitle-title">{title}</span>
    </div>
  );
}

export default React.memo(SongTitle);
