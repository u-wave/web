import { lazy } from 'react';
import Overlay from '../../components/Overlay';
import createLazyOverlay from '../../components/LazyOverlay';

type RoomHistoryOverlayProps = {
  className?: string,
  children: React.ReactNode,
};
function RoomHistoryOverlay(props: RoomHistoryOverlayProps) {
  return <Overlay {...props} direction="top" />;
}

const RoomHistory = createLazyOverlay({
  title: (t) => t('history.title'),
  Component: lazy(() => import('../components/RoomHistory')),
  OverlayComponent: RoomHistoryOverlay,
});

export default RoomHistory;
