import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';

function CurrentDJ({ className, dj }) {
  const { t } = useTranslator();

  return (
    <div className={className}>
      {t('booth.currentDJ', { user: dj.username })}
    </div>
  );
}

CurrentDJ.propTypes = {
  className: PropTypes.string,
  dj: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};

export default CurrentDJ;
