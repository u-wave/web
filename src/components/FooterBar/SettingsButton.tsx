import { memo } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { mdiCog } from '@mdi/js';
import SvgIcon from '../SvgIcon';

type SettingsButtonProps = {
  onClick: () => void,
};
function SettingsButton({ onClick }: SettingsButtonProps) {
  const { t } = useTranslator();

  return (
    <span>
      <Tooltip title={t('settings.title')}>
        <IconButton className="SettingsButton" onClick={() => onClick()}>
          <SvgIcon path={mdiCog} />
        </IconButton>
      </Tooltip>
    </span>
  );
}

export default memo(SettingsButton);
