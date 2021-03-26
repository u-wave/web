import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import PlayTime from './PlayTime';

const CurrentDJ = ({ t, className, dj, startTime, mediaDuration }) => (
  <div className={className}>
    {t('booth.currentDJ', { user: dj.username })} - <PlayTime className="HeaderBar-timer" startTime={startTime} mediaDuration={mediaDuration} />
  </div>
);

CurrentDJ.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  dj: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  startTime: PropTypes.number.isRequired,
  mediaDuration: PropTypes.number.isRequired,
};

export default translate()(CurrentDJ);
