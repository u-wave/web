import { mdiCog } from '@mdi/js';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTranslator } from '@u-wave/react-translate';
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

export default SettingsButton;
