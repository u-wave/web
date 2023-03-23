import { lazy } from 'react';
import Overlay from '../components/Overlay';
import createLazyOverlay from '../components/LazyOverlay';

function RoomHistoryOverlay(props: { children: React.ReactNode }) {
  return <Overlay {...props} direction="top" />;
}

const RoomHistory = createLazyOverlay({
  title: (t) => t('history.title'),
  OverlayComponent: RoomHistoryOverlay,
  Component: lazy(() => import('../components/RoomHistory')),
});

function RoomHistoryContainer(props: { onCloseOverlay: () => void }) {
  return <RoomHistory {...props} />;
}

export default RoomHistoryContainer;
