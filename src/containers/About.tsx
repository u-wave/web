import About from '../components/About';
import Overlay from '../components/Overlay';
import { useUwave } from '../context/UwaveContext';

type AboutContainerProps = {
  onCloseOverlay: () => void,
};
function AboutContainer({ onCloseOverlay }: AboutContainerProps) {
  const uwave = useUwave();
  const component = uwave.getAboutPageComponent() ?? undefined;

  return (
    <Overlay direction="top">
      <About aboutComponent={component} onCloseOverlay={onCloseOverlay} />
    </Overlay>
  );
}

export default AboutContainer;
