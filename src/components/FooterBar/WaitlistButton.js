import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import { withStyles } from 'material-ui-next/styles'; // eslint-disable-line
import Button from 'material-ui-next/Button'; // eslint-disable-line
import LockedIcon from 'material-ui-icons/Lock';

const buttonStyle = theme => ({
  button: {
    height: '100%',
    fontSize: '11pt',
    textTransform: 'uppercase',
    // Align multiline button text nicely. Good for languages where "Join Waitlist"
    // becomes a longer phrase, especially.
    lineHeight: '24px',
    padding: '8px 4px',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  locked: {
    color: theme.palette.text.disabled,
  },
  icon: {
    width: '1em',
    height: '1em',
    color: theme.palette.primary.contrastText,
  },
  iconLocked: {
    color: theme.palette.text.disabled,
  },
});

const WaitlistButton = ({
  t,
  classes,
  userInWaitlist,
  isLocked,
  onClick,
}) => {
  let icon;
  if (isLocked) {
    icon = (
      <LockedIcon
        className={cx(
          classes.icon,
          // The user can still leave the waitlist, if it's locked,
          // but cannot join the waitlist.
          !userInWaitlist && classes.iconLocked,
        )}
      />
    );
  }

  return (
    <Button
      classes={{
        root: cx('FooterBar-join', classes.button),
        disabled: cx('FooterBar-join--locked', classes.locked),
      }}
      disabled={isLocked && !userInWaitlist}
      onClick={onClick}
    >
      {icon}
      {isLocked && ' '}
      {userInWaitlist ? t('waitlist.leave') : t('waitlist.join')}
    </Button>
  );
};

WaitlistButton.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired,
  }).isRequired,
  userInWaitlist: PropTypes.bool,
  isLocked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default compose(
  translate(),
  pure,
  withStyles(buttonStyle),
)(WaitlistButton);
