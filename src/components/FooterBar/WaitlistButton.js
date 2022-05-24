import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Button from '@mui/material/Button';
import LockedIcon from '@mui/icons-material/Lock';

function WaitlistButton({
  userIsDJ,
  userInWaitlist,
  isLocked,
  onClick,
}) {
  const { t } = useTranslator();

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

  let label;
  if (userIsDJ) {
    label = t('waitlist.leaveBooth');
  } else if (userInWaitlist) {
    label = t('waitlist.leave');
  } else {
    label = t('waitlist.join');
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
      {label}
    </Button>
  );
}

WaitlistButton.propTypes = {
  userIsDJ: PropTypes.bool,
  userInWaitlist: PropTypes.bool,
  isLocked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(WaitlistButton);
