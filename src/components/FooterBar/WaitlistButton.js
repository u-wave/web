import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Button from '@mui/material/Button';
import LockedIcon from '@mui/icons-material/Lock';

function WaitlistButton({
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
}

WaitlistButton.propTypes = {
  userInWaitlist: PropTypes.bool,
  isLocked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(WaitlistButton);
