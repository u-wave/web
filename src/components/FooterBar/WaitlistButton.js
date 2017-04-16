import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withProps from 'recompose/withProps';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FlatButton from 'material-ui/FlatButton';
import LockedIcon from 'material-ui/svg-icons/action/lock';
import ConfirmDialog from '../Dialogs/ConfirmDialog';
import FormGroup from '../Form/Group';

const inlineIconStyle = {
  width: '1em',
  height: '1em'
};

const buttonStyle = {
  height: '100%',
  fontSize: '11pt',
  textTransform: 'uppercase',
  // Align multiline button text nicely. Good for languages where "Join Waitlist"
  // becomes a longer phrase, especially.
  lineHeight: '24px'
};

const enhance = compose(
  muiThemeable(),
  translate(),
  pure,
  withState('isLeaving', 'setIsLeaving', false),
  withProps(props => ({
    onShowDialog: () => props.setIsLeaving(true),
    onHideDialog: () => props.setIsLeaving(false)
  }))
);

const WaitlistButton = ({
  t,
  muiTheme,
  userInWaitlist,
  isLocked,
  isLeaving,
  onShowDialog,
  onHideDialog,
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

  const onConfirmLeave = () => {
    onClick();
    onHideDialog();
  };

  return (
    <FlatButton
      className={cx('FooterBar-join', isLocked && 'FooterBar-join--locked')}
      disabled={isLocked && !userInWaitlist}
      onClick={userInWaitlist ? onShowDialog : onClick}
      style={buttonStyle}
      backgroundColor={muiTheme.palette.primary1Color}
      hoverColor={muiTheme.palette.primary2Color}
      rippleColor={muiTheme.palette.primary3Color}
    >
      {icon}
      {isLocked && ' '}
      {userInWaitlist ? t('waitlist.leave') : t('waitlist.join')}
      {isLeaving && (
        <ConfirmDialog
          title={t('waitlist.leave')}
          confirmLabel={t('waitlist.leave')}
          onConfirm={onConfirmLeave}
          onCancel={onHideDialog}
        >
          <FormGroup>{t('waitlist.leaveConfirm')}</FormGroup>
        </ConfirmDialog>
      )}
    </FlatButton>
  );
};

WaitlistButton.propTypes = {
  t: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  userInWaitlist: PropTypes.bool,
  isLocked: PropTypes.bool,
  isLeaving: PropTypes.bool.isRequired,
  onShowDialog: PropTypes.func.isRequired,
  onHideDialog: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default enhance(WaitlistButton);
