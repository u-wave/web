import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { mdiShuffle } from '@mdi/js';
import SvgIcon from '../../SvgIcon';

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
          <SvgIcon path={mdiShuffle} />
        )}
      </IconButton>
    </Tooltip>
  );
}

ShuffleButton.propTypes = {
  onShuffle: PropTypes.func.isRequired,
};

export default ShuffleButton;
