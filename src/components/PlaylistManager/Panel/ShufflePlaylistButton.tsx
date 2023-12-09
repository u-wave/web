import { useAsyncCallback } from 'react-async-hook';
import { useTranslator } from '@u-wave/react-translate';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { mdiShuffle } from '@mdi/js';
import SvgIcon from '../../SvgIcon';

const HARDCODED_LOADING_SIZE = 24; // FIXME derive this from some mui property?

type ShuffleButtonProps = {
  onShuffle: () => Promise<void>,
};
function ShuffleButton({ onShuffle }: ShuffleButtonProps) {
  const { t } = useTranslator();
  const onClick = useAsyncCallback(onShuffle);

  return (
    <Tooltip title={t('playlists.shuffle')} placement="top">
      <IconButton
        className="PlaylistMeta-iconButton"
        onClick={onClick.execute}
        disabled={onClick.loading}
      >
        {onClick.loading ? (
          <CircularProgress size={HARDCODED_LOADING_SIZE} />
        ) : (
          <SvgIcon path={mdiShuffle} />
        )}
      </IconButton>
    </Tooltip>
  );
}

export default ShuffleButton;
