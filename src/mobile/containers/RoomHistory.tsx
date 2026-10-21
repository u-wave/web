import { lazy } from 'react';
import createLazyOverlay from '../../components/LazyOverlay';
import Overlay from '../../components/Overlay';

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
