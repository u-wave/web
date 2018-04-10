import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import ScrollDownIcon from '@material-ui/icons/ArrowDownward';

const ScrollNotice = ({ show, onClick }) => (
  <div className={cx('ChatMessages-scrollDown', show && 'is-visible')}>
    <div className="ChatMessages-scrollDownButton">
      <Button variant="fab" mini color="primary" onClick={onClick}>
        <ScrollDownIcon />
      </Button>
    </div>
  </div>
);

ScrollNotice.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ScrollNotice;
