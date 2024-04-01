import cx from 'clsx';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Button from '@mui/material/Button';
import { mdiLock } from '@mdi/js';
import SvgIcon from '../SvgIcon';

type WaitlistButtonProps = {
  userIsDJ: boolean,
  userInWaitlist: boolean,
  isLocked: boolean,
  onClick: () => void,
};
function WaitlistButton({
  userIsDJ,
  userInWaitlist,
  isLocked,
  onClick,
}: WaitlistButtonProps) {
  const { t } = useTranslator();

  let icon;
  if (isLocked) {
    icon = (
      <SvgIcon
        path={mdiLock}
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
      onClick={() => onClick()}
    >
      {icon}
      {isLocked && ' '}
      {label}
    </Button>
  );
}

export default memo(WaitlistButton);
