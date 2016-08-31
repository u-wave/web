import * as React from 'react';
import { translate } from 'react-i18next';
import SongTitle from '../SongTitle';

const CurrentMedia = ({ t, className, media }) => (
  <div className={className}>
    {media
      ? <SongTitle artist={media.artist} title={media.title} />
      : t('booth.empty')}
  </div>
);

CurrentMedia.propTypes = {
  t: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  media: React.PropTypes.shape({
    artist: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  })
};

export default translate()(CurrentMedia);
