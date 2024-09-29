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

  return (
    <Overlay>
      <OverlayHeader title={t('about.about')} onCloseOverlay={onCloseOverlay} />
      <OverlayContent className="AboutPanel">
        <AboutPage />
      </OverlayContent>
    </Overlay>
  );
}

export default AboutOverlay;
