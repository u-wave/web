import React from 'react';
import Player from './Player';
import ImportForm from './ImportForm';
import reducer from './reducer';

const ImportPanel = React.lazy(() => import('./ImportPanel'));

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
