import cx from 'clsx';
import { useTranslator } from '@u-wave/react-translate';
import MenuItem from '@mui/material/MenuItem';
import SvgIcon from '../../SvgIcon';

const mdiImport = 'M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z';

type PlaylistImportRowProps = {
  className?: string,
  importing: boolean,
  onClick: () => void,
};
function PlaylistImportRow({
  className,
  onClick,
}: PlaylistImportRowProps) {
  const { t } = useTranslator();

  return (
    <MenuItem
      className={cx('PlaylistMenuRow', 'PlaylistMenuRow--import', className)}
      onClick={onClick}
    >
      <div className="PlaylistMenuRow-title">
        <div className="PlaylistMenuRow-active-icon">
          <SvgIcon path={mdiImport} />
        </div>
        {t('playlists.import.title')}
      </div>
    </MenuItem>
  );
}

export default PlaylistImportRow;
