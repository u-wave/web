import { useTranslator } from '@u-wave/react-translate';
import Overlay from '../../components/Overlay';
import OverlayContent from '../../components/Overlay/Content';
import OverlayHeader from '../../components/Overlay/Header';
import ServerList from '../../components/ServerList';

type ServerListContainerProps = {
  onCloseOverlay: () => void,
};
function ServerListContainer({ onCloseOverlay }: ServerListContainerProps) {
  const { t } = useTranslator();

  return (
    <Overlay>
      <OverlayHeader title={t('about.servers')} onCloseOverlay={onCloseOverlay} />
      <OverlayContent className="AboutPanel">
        <ServerList />
      </OverlayContent>
    </Overlay>
  );
}

export default ServerListContainer;
