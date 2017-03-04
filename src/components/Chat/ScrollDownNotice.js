import cx from 'classnames';
import * as React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ScrollDownIcon from 'material-ui/svg-icons/navigation/arrow-downward';

const ScrollNotice = ({ muiTheme, show, onClick }) => (
  <div className={cx('ChatMessages-scrollDown', show && 'is-visible')}>
    <div className="ChatMessages-scrollDownButton">
      <FloatingActionButton mini onTouchTap={onClick}>
        <ScrollDownIcon style={{ fill: muiTheme.palette.textColor }} />
      </FloatingActionButton>
    </div>
  </div>
);

ScrollNotice.propTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  show: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default muiThemeable()(ScrollNotice);
