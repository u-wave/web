import cx from 'classnames';
import * as React from 'react';
import pure from 'recompose/pure';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FlatButton from 'material-ui/FlatButton';
import LockedIcon from 'material-ui/svg-icons/action/lock';

const inlineIconStyle = {
  width: '1em',
  height: '1em'
};

const WaitlistButton = ({
  muiTheme,
  userInWaitlist, isLocked, onClick
}) => {
  let icon;
  if (isLocked) {
    const iconColor =
      // The user can still leave the waitlist, if it's locked…
      userInWaitlist ? muiTheme.flatButton.textColor :
      // …but cannot join the waitlist.
      muiTheme.flatButton.disabledTextColor;
    icon = (
      <LockedIcon
        style={inlineIconStyle}
        color={iconColor}
      />
    );
  }

  return (
    <FlatButton
      className={cx('FooterBar-join', isLocked && 'FooterBar-join--locked')}
      disabled={isLocked && !userInWaitlist}
      onClick={onClick}
      style={{
        // Workaround for a React issue where `background` and
        // `background-color` styles are applied in the incorrect order, leading
        // the material-ui builtin "background: None" style to override the
        // backgroundColor prop below on the initial render.
        // https://github.com/facebook/react/issues/6524
        background: muiTheme.palette.primary1Color
      }}
      backgroundColor={muiTheme.palette.primary1Color}
      hoverColor={muiTheme.palette.primary2Color}
      rippleColor={muiTheme.palette.primary3Color}
    >
      {icon}
      {isLocked && ' '}
      {userInWaitlist ? 'Leave Waitlist' : 'Join Waitlist'}
    </FlatButton>
  );
};

WaitlistButton.propTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  userInWaitlist: React.PropTypes.bool,
  isLocked: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
};

export default muiThemeable()(pure(WaitlistButton));
