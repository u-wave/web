import Overlay from '../components/Overlay';
import createLazyOverlay from '../components/LazyOverlay';

type OverlayProps = {
  onCloseOverlay: () => void,
  children: React.ReactNode,
};

function RoomHistoryOverlay(props: OverlayProps) {
  return <Overlay {...props} direction="top" />;
}

const RoomHistory = createLazyOverlay({
  loader: () => import('../components/RoomHistory'),
  title: (t) => t('history.title'),
  OverlayComponent: RoomHistoryOverlay,
});

function RoomHistoryContainer(props: OverlayProps) {
  return <RoomHistory {...props} />;
}

export default RoomHistoryContainer;
