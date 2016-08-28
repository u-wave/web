import * as React from 'react';
import SongTitle from '../SongTitle';

const CurrentMedia = ({ className, media }) => (
  <div className={className}>
    {media
      ? <SongTitle artist={media.artist} title={media.title} />
      : 'Nobody is playing!'}
  </div>
);

CurrentMedia.propTypes = {
  className: React.PropTypes.string,
  media: React.PropTypes.shape({
    artist: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  })
};

export default CurrentMedia;
