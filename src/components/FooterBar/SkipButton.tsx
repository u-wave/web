import {
  memo,
  useCallback,
  useRef,
  useState,
} from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { mdiSkipNext } from '@mdi/js';
import SvgIcon from '../SvgIcon';
import SkipReasonsList from './SkipReasonsList';
import type { User } from '../../reducers/users';

const popoverPosition = {
  marginThreshold: 0,
  anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
  transformOrigin: { horizontal: 'center', vertical: 'bottom' },
} as const;

// TODO not hardcode these maybe?
const reasons = [
  'genre',
  'history',
  'unavailable',
  'nsfw',
  'duration',
  'downvotes',
  'other',
];

type SkipButtonProps = {
  userIsDJ: boolean,
  // Technically `currentDJ` is not inherently bound to `historyID`,
  // though it should be. In error cases it may be absent.
  currentDJ: User | null,
  onSkip: (reason: string) => void,
};
function SkipButton({ userIsDJ, currentDJ, onSkip }: SkipButtonProps) {
  const { t } = useTranslator();
  const [isSkipping, setSkipping] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const anchor = useRef(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSkip = useCallback((reason: string) => {
    setSkipping(true);
    Promise.resolve(onSkip(reason)).finally(() => {
      setSkipping(false);
    });
    setOpen(false);
  }, [onSkip]);
  const handleSelfSkip = useCallback(() => handleSkip(''), [handleSkip]);

  if (isSkipping) {
    return (
      <span>
        <div className="SkipButton is-loading">
          <CircularProgress className="SkipButton-loader" />
        </div>
      </span>
    );
  }

  let message = t('booth.skip.self');
  if (!userIsDJ) {
    message = t('booth.skip.other', {
      user: currentDJ?.username ?? '…',
    });
  }

  return (
    <span>
      <Tooltip title={message}>
        <IconButton
          ref={anchor}
          className="SkipButton"
          onClick={userIsDJ ? handleSelfSkip : handleOpen}
        >
          <SvgIcon path={mdiSkipNext} />
        </IconButton>
      </Tooltip>
      <Popover
        open={isOpen}
        anchorEl={anchor.current}
        onClose={handleClose}
        classes={{ paper: 'SkipButton-list' }}
        {...popoverPosition}
      >
        <SkipReasonsList
          reasons={reasons.map((name) => ({
            name,
            label: t(`booth.skip.reasons.${name}`),
          }))}
          onSelect={handleSkip}
        />
      </Popover>
    </span>
  );
}

export default memo(SkipButton);
