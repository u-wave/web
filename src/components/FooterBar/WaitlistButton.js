import cx from 'classnames';
import * as React from 'react';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FlatButton from 'material-ui/FlatButton';
import LockedIcon from 'material-ui/svg-icons/action/lock';

const inlineIconStyle = {
  width: '1em',
  height: '1em'
};

const buttonStyle = {
  height: '100%',
  fontSize: '11pt',
  textTransform: 'uppercase'
};

const WaitlistButton = ({
  t,
  muiTheme,
  userInWaitlist,
  isLocked,
  onClick
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
      style={buttonStyle}
      backgroundColor={muiTheme.palette.primary1Color}
      hoverColor={muiTheme.palette.primary2Color}
      rippleColor={muiTheme.palette.primary3Color}
    >
      {icon}
      {isLocked && ' '}
      {userInWaitlist ? t('waitlist.leave') : t('waitlist.join')}
    </FlatButton>
  );
};

WaitlistButton.propTypes = {
  t: React.PropTypes.func.isRequired,
  muiTheme: React.PropTypes.object.isRequired,
  userInWaitlist: React.PropTypes.bool,
  isLocked: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
};

export default compose(
  muiThemeable(),
  translate(),
  pure
)(WaitlistButton);
