import React from 'react';
import Player from './Player';
import ImportForm from './ImportForm';
import reducer, { State } from './reducer';
import { MediaSource } from '../../context/MediaSourceContext';

const ImportPanel = React.lazy(() => import('./ImportPanel'));
const logo = new URL('../../../assets/img/youtube.png', import.meta.url);
const icon = new URL('../../../assets/img/youtube-icon.png', import.meta.url);

export default function youtube(): MediaSource<State> {
  return {
    name: 'youtube',
    Player,
    logo,
    icon,
    ImportForm,
    ImportPanel,
    reducer,
  };
}
