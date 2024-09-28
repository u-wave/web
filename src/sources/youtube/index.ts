import React from 'react';
import Player from './Player';
import ImportForm from './ImportForm';
import reducer, { type State } from './reducer';
import type { MediaSource } from '../../context/MediaSourceContext';
import type { Media } from '../../reducers/booth';

const ImportPanel = React.lazy(() => import('./ImportPanel'));
const logo = new URL('../../../assets/img/youtube.png', import.meta.url);
const icon = new URL('../../../assets/img/youtube-icon.png', import.meta.url);

function getMediaUrl(media: Media) {
  const url = new URL(`https://youtu.be/${media.sourceID}`);
  if (media.start > 0) {
    url.searchParams.set('t', String(media.start));
  }
  return url;
}

function getStartTime(url: URL) {
  const t = url.searchParams.get('t');
  if (t == null) return 0;

  const seconds = Number(t);
  if (Number.isNaN(seconds)) return 0;
  return seconds;
}

function fromMediaUrl(url: URL) {
  let sourceID;
  if (url.hostname === 'youtu.be' || url.hostname === 'www.youtu.be') {
    sourceID = url.pathname;
  }
  if ((url.hostname === 'youtube.com' || url.hostname === 'www.youtube.com') && url.pathname === '/watch') {
    sourceID = url.searchParams.get('v');
  }

  if (sourceID != null) {
    return {
      sourceType: 'youtube',
      sourceID,
      start: getStartTime(url),
    };
  }
  return null;
}

export default function youtube(): MediaSource<State> {
  return {
    name: 'youtube',
    Player,
    logo,
    icon,
    ImportForm,
    ImportPanel,
    reducer,
    getMediaUrl,
    fromMediaUrl,
  };
}
