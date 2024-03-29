import type { MediaSource } from '../../context/MediaSourceContext';
import Player from './PlayerWrapper';

const logo = new URL('../../../assets/img/soundcloud.png', import.meta.url);
const icon = new URL('../../../assets/img/soundcloud.png', import.meta.url);

export default function soundcloud(): MediaSource {
  return {
    name: 'soundcloud',
    Player,
    logo,
    icon,
  };
}
