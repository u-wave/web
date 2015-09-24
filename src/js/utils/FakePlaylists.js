import { setPlaylists } from '../actions/PlaylistActionCreators';

function id() {
  return Math.floor(Math.random() * 1e9);
}

const playlists = [
  {
    name: 'K-pop',
    media: [
      { artist: 'f(x)', title: 'Airplane' },
      { artist: '4Minute', title: 'Crazy' }
    ]
  },
  {
    name: 'K-pop also',
    media: [
      { artist: 'Dead Gakkahs', title: 'PARADOX OVER PARADOX' },
      { artist: 'DIEALRIGHT', title: 'Heaven' }
    ]
  },
  {
    name: 'K-indie',
    media: [
      { artist: 'Hee Young', title: 'Are You Still Waiting?' },
      { artist: 'Morrie', title: 'Dead At 5:16' }
    ]
  },
  {
    name: 'K-hiphop',
    media: [
      { artist: 'Swings', title: 'Bulldozer' },
      { artist: 'Gray', title: 'Summer Night' }
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
