import cx from 'clsx';
import { useRef, useState } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { useTranslator } from '@u-wave/react-translate';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { mdiCheck, mdiLock, mdiMenuUp } from '@mdi/js';
import SvgIcon from '../SvgIcon';
import { useDispatch, useSelector } from '../../hooks/useRedux';
import {
  joinWaitlist,
  leaveWaitlist,
  userInWaitlistSelector,
  waitlistIsLockedSelector,
} from '../../reducers/waitlist';
import { isCurrentDJSelector, setAutoLeave, skipSelf } from '../../reducers/booth';

function WaitlistButton() {
  const { t } = useTranslator();
  const isDJ = useSelector(isCurrentDJSelector);
  const isInWaitlist = useSelector(userInWaitlistSelector);
  const isLocked = useSelector(waitlistIsLockedSelector);
  const autoLeave = useSelector((state) => state.booth.autoLeave ?? false);
  const dispatch = useDispatch();
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleSkipRemove = useAsyncCallback(async () => {
    await dispatch(skipSelf({ remove: true }));
  });

  const handleAutoLeave = useAsyncCallback(async () => {
    await dispatch(setAutoLeave({ autoLeave: !autoLeave }));
  });

  const handleLeave = useAsyncCallback(async () => {
    await dispatch(leaveWaitlist());
  });

  const handleJoin = useAsyncCallback(async () => {
    await dispatch(joinWaitlist());
  });

  let icon;
  if (isLocked) {
    icon = (
      <SvgIcon
        path={mdiLock}
        className={cx(
          'WaitlistButton-icon',
          // The user can still leave the waitlist, if it's locked,
          // but cannot join the waitlist.
          !isInWaitlist && 'WaitlistButton-icon--locked',
        )}
      />
    );
  }

  if (isDJ) {
    return (
      <>
        <ButtonGroup ref={anchorRef} style={{ height: '100%' }}>
          <Button
            classes={{ root: 'WaitlistButton' }}
            onClick={handleSkipRemove.execute}
            disabled={handleSkipRemove.loading}
          >
            {t('waitlist.leaveBooth')}
          </Button>
          <Button
            classes={{ root: 'WaitlistButton--split' }}
            onClick={() => setOpen((v) => !v)}
          >
            <SvgIcon path={mdiMenuUp} />
          </Button>
        </ButtonGroup>
        <Popover
          anchorEl={anchorRef.current}
          open={open}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          onClose={() => setOpen(false)}
        >
          <MenuList>
            <MenuItem onClick={handleAutoLeave.execute}>
              <ListItemIcon>
                {autoLeave ? <SvgIcon path={mdiCheck} /> : null}
              </ListItemIcon>
              {t('waitlist.autoLeave')}
            </MenuItem>
          </MenuList>
        </Popover>
      </>
    );
  }

  if (isInWaitlist) {
    return (
      <Button
        classes={{
          root: 'WaitlistButton',
          disabled: 'WaitlistButton--locked',
        }}
        onClick={handleLeave.execute}
        disabled={handleLeave.loading}
      >
        {icon}
        {isLocked ? ' ' : null}
        {t('waitlist.leave')}
      </Button>
    );
  }

  return (
    <Button
      classes={{
        root: 'WaitlistButton',
        disabled: 'WaitlistButton--locked',
      }}
      disabled={isLocked || handleJoin.loading}
      onClick={handleJoin.execute}
    >
      {icon}
      {isLocked ? ' ' : null}
      {t('waitlist.join')}
    </Button>
  );
}

export default WaitlistButton;
