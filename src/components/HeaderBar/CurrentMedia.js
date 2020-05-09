import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import SongTitle from '../SongTitle';

function CurrentMedia({ className, media }) {
  const { t } = useTranslator();

  return (
    <div className={className}>
      {media
        ? <SongTitle artist={media.artist} title={media.title} />
        : t('booth.empty')}
    </div>
  );
}

CurrentMedia.propTypes = {
  className: PropTypes.string,
  media: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default CurrentMedia;
