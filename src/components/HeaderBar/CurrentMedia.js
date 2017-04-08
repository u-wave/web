import React from 'react';
import PropTypes from 'prop-types';
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
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  media: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

export default translate()(CurrentMedia);
