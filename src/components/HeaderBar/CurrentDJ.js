import * as React from 'react';
import { translate } from 'react-i18next';

const CurrentDJ = ({ t, className, dj }) => (
  <div className={className}>
    {t('booth.currentDJ', { user: dj.username })}
  </div>
);

CurrentDJ.propTypes = {
  t: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  dj: React.PropTypes.shape({
    username: React.PropTypes.string.isRequired
  })
};

export default translate()(CurrentDJ);
