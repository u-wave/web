import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Fab from '@material-ui/core/Fab';
import ScrollDownIcon from '@material-ui/icons/ArrowDownward';

function ScrollDownNotice({ show, onClick }) {
  const { t } = useTranslator();

  return (
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
}

ScrollDownNotice.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ScrollDownNotice;
