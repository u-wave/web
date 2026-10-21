import { mdiClose } from '@mdi/js';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTranslator } from '@u-wave/react-translate';
import cx from 'clsx';
import SvgIcon from '../../SvgIcon';

type ImportPanelHeaderProps = {
  className?: string,
  children?: React.ReactNode,
  onClosePanel: () => void,
};
function ImportPanelHeader({
  className,
  children,
  onClosePanel,
}: ImportPanelHeaderProps) {
  const { t } = useTranslator();

  return (
    <div className={cx('ImportPanelHeader', className)}>
      <div className="ImportPanelHeader-content">
        {children}
      </div>
      <Tooltip title={t('close')} placement="top">
        <IconButton onClick={onClosePanel}>
          <SvgIcon path={mdiClose} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default ImportPanelHeader;
