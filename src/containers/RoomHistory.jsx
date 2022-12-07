import React from 'react';
import { useSelector } from 'react-redux';
import { roomHistoryWithVotesSelector } from '../selectors/roomHistorySelectors';
import Overlay from '../components/Overlay';
import createLazyOverlay from '../components/LazyOverlay';

function RoomHistoryOverlay(props) {
  return <Overlay {...props} direction="top" />;
}

const RoomHistory = createLazyOverlay({
  loader: () => import('../components/RoomHistory'),
  title: (t) => t('history.title'),
  OverlayComponent: RoomHistoryOverlay,
});

function RoomHistoryContainer(props) {
  const media = useSelector(roomHistoryWithVotesSelector);

  return <RoomHistory {...props} media={media} />;
}

export default RoomHistoryContainer;
