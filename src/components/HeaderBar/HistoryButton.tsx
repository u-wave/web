import { mdiHistory } from '@mdi/js';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTranslator } from '@u-wave/react-translate';
import SvgIcon from '../SvgIcon';

type HistoryButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>,
};

function HistoryButton({ onClick }: HistoryButtonProps) {
  const { t } = useTranslator();

  return (
    <Tooltip title={t('history.title')} placement="bottom">
      <IconButton
        aria-label={t('history.title')}
        className="HistoryButton"
        onClick={onClick}
      >
        <SvgIcon className="HistoryButton-icon" path={mdiHistory} />
      </IconButton>
    </Tooltip>
  );
}

export default HistoryButton;
