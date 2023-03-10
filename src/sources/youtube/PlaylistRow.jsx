import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import { mdiPlaylistPlus } from '@mdi/js';
import SvgIcon from '../../components/SvgIcon';

const PlaylistRow = ({
  className,
  playlist,
  onImport,
  // etc
  ...attrs
}) => {
  const thumbnail = (
    <div className="MediaListRow-thumb">
      <img
        className="MediaListRow-image"
        key={playlist.id}
        src={playlist.thumbnail}
        loading="lazy"
        alt=""
      />
    </div>
  );

  return (
    <div
      className={cx('MediaListRow', 'src-youtube-PlaylistRow', className)}
      {...attrs}
    >
      {thumbnail}
      <div className="src-youtube-PlaylistRow-info" title={playlist.description}>
        <div className="src-youtube-PlaylistRow-name">
          {playlist.name}
        </div>
        <div className="src-youtube-PlaylistRow-size">
          Items: {playlist.size}
        </div>
      </div>
      <IconButton className="src-youtube-PlaylistRow-import" onClick={onImport}>
        <SvgIcon path={mdiPlaylistPlus} />
      </IconButton>
    </div>
  );
};

PlaylistRow.propTypes = {
  className: PropTypes.string,
  playlist: PropTypes.object.isRequired,
  onImport: PropTypes.func.isRequired,
};

export default PlaylistRow;
