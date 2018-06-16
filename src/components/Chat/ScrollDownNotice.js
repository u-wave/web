import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Button from '@material-ui/core/Button';
import ScrollDownIcon from '@material-ui/icons/ArrowDownward';

const enhance = translate();

const ScrollNotice = ({ t, show, onClick }) => (
  <div className={cx('ChatMessages-scrollDown', show && 'is-visible')}>
    <Button
      tabIndex={show ? 0 : -1}
      className="ChatMessages-scrollDownButton"
      variant="fab"
      mini
      color="primary"
      aria-label={t('chat.scrollDown')}
      onClick={onClick}
    >
      <ScrollDownIcon />
    </Button>
  </div>
);

ScrollNotice.propTypes = {
  t: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default enhance(ScrollNotice);
