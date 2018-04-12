import Player from './Player';
import logo from '../../../assets/img/youtube.png';
import ImportForm from './ImportForm';
import ImportPanel from './ImportPanel';
import reducer from './reducer';

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
