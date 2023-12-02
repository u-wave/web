import cx from 'clsx';
import { useTranslator } from '@u-wave/react-translate';
import OverlayHeader from '../Overlay/Header';
import OverlayContent from '../Overlay/Content';
import HistoryList from './HistoryList';

type RoomHistoryProps = {
  className?: string,
  onCloseOverlay: () => void,
};
function RoomHistory({ className, onCloseOverlay }: RoomHistoryProps) {
  const { t } = useTranslator();

  return (
    <div className={cx('RoomHistory', className)}>
      <OverlayHeader
        direction="top"
        className="AppRow AppRow--top"
        title={t('history.title')}
        onCloseOverlay={onCloseOverlay}
      />
      <OverlayContent className="RoomHistory-body">
        <HistoryList />
      </OverlayContent>
    </div>
  );
}

export default RoomHistory;
