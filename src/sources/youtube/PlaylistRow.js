import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ImportIcon from 'material-ui-icons/PlaylistAdd';

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
        <ImportIcon />
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
