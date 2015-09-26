import { setPlaylists } from '../actions/PlaylistActionCreators';

function id() {
  return Math.floor(Math.random() * 1e9);
}

const playlists = [
  {
    name: 'K-pop',
    media: [
      { sourceID: '70MBQrlsr_M', artist: 'f(x)', title: 'Airplane', thumbnail: 'https://i.ytimg.com/vi/70MBQrlsr_M/sddefault.jpg' },
      { sourceID: '1nCLBTmjJBY', artist: '4Minute', title: 'Crazy', thumbnail: 'https://i.ytimg.com/vi/1nCLBTmjJBY/sddefault.jpg' }
    ]
  },
  {
    name: 'K-pop also',
    media: [
      { sourceID: 'kCvsh0DJ6dk', artist: 'Dead Gakkahs', title: 'PARADOX OVER PARADOX', thumbnail: 'https://i.ytimg.com/vi/kCvsh0DJ6dk/sddefault.jpg' },
      { sourceID: '9iPXcZVmaNc', artist: 'DIEALRIGHT', title: 'Satellite', thumbnail: 'https://i.ytimg.com/vi/9iPXcZVmaNc/sddefault.jpg' }
    ]
  },
  {
    name: 'K-indie',
    media: [
      { sourceID: 'fegmno49D30', artist: 'Hee Young', title: 'Are You Still Waiting?', thumbnail: 'https://i.ytimg.com/vi/fegmno49D30/sddefault.jpg' },
      { sourceID: 'WbF5LRaouno', artist: 'Morrie', title: 'Rainy Day', thumbnail: 'https://i.ytimg.com/vi/WbF5LRaouno/sddefault.jpg' }
    ]
  },
  {
    name: 'K-hiphop',
    media: [
      { sourceID: 'kILZDwZjVkQ', artist: 'Swings', title: 'Bulldozer', thumbnail: 'https://i.ytimg.com/vi/kILZDwZjVkQ/sddefault.jpg' },
      { sourceID: 'rn7TJaec1xk', artist: 'Gray', title: 'Dangerous (Feat. Jay Park)', thumbnail: 'https://i.ytimg.com/vi/rn7TJaec1xk/sddefault.jpg' }
    ]
  }
];

playlists.forEach(pl => {
  pl.id = id();
  pl.count = pl.media.length;
});

export function init() {
  // Normally, a server call
  setPlaylists(playlists);
}
