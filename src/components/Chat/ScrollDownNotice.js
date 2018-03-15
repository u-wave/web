import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ScrollDownIcon from 'material-ui/svg-icons/navigation/arrow-downward';

const ScrollNotice = ({ muiTheme, show, onClick }) => (
  <div className={cx('ChatMessages-scrollDown', show && 'is-visible')}>
    <div className="ChatMessages-scrollDownButton">
      <FloatingActionButton mini onClick={onClick}>
        <ScrollDownIcon style={{ fill: muiTheme.palette.textColor }} />
      </FloatingActionButton>
    </div>
  </div>
);

ScrollNotice.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default muiThemeable()(ScrollNotice);
