import cx from 'classnames';
import * as React from 'react';
import pure from 'recompose/pure';
import muiThemeable from 'material-ui/lib/muiThemeable';
import FlatButton from 'material-ui/lib/flat-button';
import LockedIcon from 'material-ui/lib/svg-icons/action/lock';

const inlineIconStyle = {
  width: '1em',
  height: '1em'
};

const WaitlistButton = ({
  muiTheme,
  userInWaitlist, isLocked, onClick
}) => {
  const { rawTheme } = muiTheme;

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
      backgroundColor={rawTheme.palette.primary1Color}
      hoverColor={rawTheme.palette.primary2Color}
      rippleColor={rawTheme.palette.primary3Color}
    >
      {icon}
      {isLocked && ' '}
      {userInWaitlist ? 'Leave Waitlist' : 'Join Waitlist'}
    </FlatButton>
  );
};

export default muiThemeable(pure(WaitlistButton));
