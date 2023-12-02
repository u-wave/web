import React from 'react';
import Overlay from '../../components/Overlay';
import createLazyOverlay from '../../components/LazyOverlay';

function RoomHistoryOverlay(props) {
  return <Overlay {...props} direction="top" />;
}

const RoomHistory = createLazyOverlay({
  loader: React.lazy(() => import('../components/RoomHistory')),
  title: (t) => t('history.title'),
  OverlayComponent: RoomHistoryOverlay,
});

export default RoomHistory;
