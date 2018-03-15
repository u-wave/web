import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const CurrentDJ = ({ t, className, dj }) => (
  <div className={className}>
    {t('booth.currentDJ', { user: dj.username })}
  </div>
);

CurrentDJ.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  dj: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};

export default translate()(CurrentDJ);
