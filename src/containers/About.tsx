import { useUwave } from '../context/UwaveContext';
import Overlay from '../components/Overlay';
import About from '../components/About';

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
