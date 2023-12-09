import cx from 'clsx';
import { useTranslator } from '@u-wave/react-translate';
import OverlayHeader from '../../Overlay/Header';

type PlaylistManagerHeaderProps = {
  className?: string,
  children?: React.ReactNode,
  onCloseOverlay: () => void,
};
function PlaylistManagerHeader({
  className,
  children,
  onCloseOverlay,
}: PlaylistManagerHeaderProps) {
  const { t } = useTranslator();

  return (
    <OverlayHeader
      className={cx('PlaylistHeader', className)}
      title={t('playlists.title')}
      onCloseOverlay={onCloseOverlay}
    >
      {children}
    </OverlayHeader>
  );
}

export default PlaylistManagerHeader;
