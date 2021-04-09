import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ShuffleIcon from '@material-ui/icons/Shuffle';

const { useCallback, useState } = React;
const HARDCODED_LOADING_SIZE = 24; // FIXME derive this from some mui property?

function ShuffleButton({ onShuffle }) {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslator();

  const onClick = useCallback(() => {
    setLoading(true);
    onShuffle().finally(() => {
      setLoading(false);
    });
  }, [onShuffle]);

  return (
    <Tooltip title={t('playlists.shuffle')} placement="top">
      <IconButton
        className="PlaylistMeta-iconButton"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={HARDCODED_LOADING_SIZE} />
        ) : (
          <ShuffleIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}

ShuffleButton.propTypes = {
  onShuffle: PropTypes.func.isRequired,
};

export default ShuffleButton;
