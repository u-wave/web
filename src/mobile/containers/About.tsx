import { useContext } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import UwaveContext from '../../context/UwaveContext';
import Overlay from '../../components/Overlay';
import OverlayHeader from '../../components/Overlay/Header';
import OverlayContent from '../../components/Overlay/Content';

type AboutOverlayProps = {
  onCloseOverlay: () => void,
};
function AboutOverlay({ onCloseOverlay }: AboutOverlayProps) {
  const { t } = useTranslator();
  const AboutPage = useContext(UwaveContext)?.getAboutPageComponent();

  if (!AboutPage) {
    return null;
  }

  // This is actually a (mostly) static component
  // eslint-disable-next-line react-hooks/static-components
  const page = <AboutPage />;

  return (
    <Overlay>
      <OverlayHeader title={t('about.about')} onCloseOverlay={onCloseOverlay} />
      <OverlayContent className="AboutPanel">
        {page}
      </OverlayContent>
    </Overlay>
  );
}

export default AboutOverlay;
