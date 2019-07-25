import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import Fab from '@material-ui/core/Fab';
import ScrollDownIcon from '@material-ui/icons/ArrowDownward';

const enhance = translate();

const ScrollDownNotice = ({ t, show, onClick }) => (
  <div className={cx('ChatMessages-scrollDown', show && 'is-visible')}>
    <Fab
      tabIndex={show ? 0 : -1}
      className="ChatMessages-scrollDownButton"
      size="small"
      color="primary"
      aria-label={t('chat.scrollDown')}
      onClick={onClick}
    >
      <ScrollDownIcon />
    </Fab>
  </div>
);

ScrollDownNotice.propTypes = {
  t: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default enhance(ScrollDownNotice);
