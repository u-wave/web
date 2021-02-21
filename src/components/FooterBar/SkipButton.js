import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import SkipIcon from '@material-ui/icons/SkipNext';
import SkipReasonsList from './SkipReasonsList';

const {
  useCallback,
  useRef,
  useState,
} = React;

const popoverPosition = {
  marginThreshold: 0,
  anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
  transformOrigin: { horizontal: 'center', vertical: 'bottom' },
};

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

function SkipButton({ userIsDJ, currentDJ, onSkip }) {
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

  const handleSkip = useCallback((reason) => {
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
    message = t('booth.skip.other', { user: currentDJ.username });
  }

  return (
    <span>
      <Tooltip title={message}>
        <IconButton
          ref={anchor}
          className="SkipButton"
          onClick={userIsDJ ? handleSelfSkip : handleOpen}
        >
          <SkipIcon />
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

SkipButton.propTypes = {
  userIsDJ: PropTypes.bool.isRequired,
  currentDJ: PropTypes.object.isRequired,
  onSkip: PropTypes.func.isRequired,
};

export default React.memo(SkipButton);
