import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import LockedIcon from '@material-ui/icons/Lock';

const enhance = compose(
  translate(),
  React.memo,
);

const WaitlistButton = ({
  t,
  userInWaitlist,
  isLocked,
  onClick,
}) => {
  let icon;
  if (isLocked) {
    icon = (
      <LockedIcon
        className={cx(
          'WaitlistButton-icon',
          // The user can still leave the waitlist, if it's locked,
          // but cannot join the waitlist.
          !userInWaitlist && 'WaitlistButton-icon--locked',
        )}
      />
    );
  }

  return (
    <Button
      classes={{
        root: 'WaitlistButton',
        disabled: 'WaitlistButton--locked',
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
  userInWaitlist: PropTypes.bool,
  isLocked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default enhance(WaitlistButton);
