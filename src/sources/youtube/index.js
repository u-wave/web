import Player from './Player';
import ImportForm from './ImportForm';
import ImportPanel from './ImportPanel';
import reducer from './reducer';

const logo = new URL('../../../assets/img/youtube.png', import.meta.url);

export default function youtube() {
  return {
    name: 'youtube',
    Player,
    logo,
    ImportForm,
    ImportPanel,
    reducer,
  };
}
