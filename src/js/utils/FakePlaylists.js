import { setPlaylists } from '../actions/PlaylistActionCreators';

function id() {
  return Math.floor(Math.random() * 1e9);
}

const playlists = [
  {
    name: 'K-pop',
    media: [
      { sourceID: '70MBQrlsr_M', artist: 'f(x)', title: 'Airplane', thumbnail: 'https://i.ytimg.com/vi/70MBQrlsr_M/sddefault.jpg' },
      { sourceID: '1nCLBTmjJBY', artist: '4Minute', title: 'Crazy', thumbnail: 'https://i.ytimg.com/vi/1nCLBTmjJBY/sddefault.jpg' },
      { sourceID: 'Qk52ypnGs68', artist: 'T-ARA (티아라)', title: 'Number Nine (넘버나인)', thumbnail: 'https://i.ytimg.com/vi/Qk52ypnGs68/sddefault.jpg' },
      { sourceID: 'zO9RzrhYR-I', artist: 'miss A (미쓰에이)', title: 'Only You (다른 남자 말고 너)', thumbnail: 'https://i.ytimg.com/vi/zO9RzrhYR-I/sddefault.jpg' },
      { sourceID: '4xLFxfXWDUk', artist: '4Minute', title: 'Whatcha Doin\' Today (오늘 뭐해)', thumbnail: 'https://i.ytimg.com/vi/4xLFxfXWDUk/sddefault.jpg' }
    ]
  },
  {
    name: 'K-pop also',
    media: [
      { sourceID: 'kCvsh0DJ6dk', artist: 'Dead Gakkahs', title: 'PARADOX OVER PARADOX', thumbnail: 'https://i.ytimg.com/vi/kCvsh0DJ6dk/sddefault.jpg' },
      { sourceID: '9iPXcZVmaNc', artist: 'DIEALRIGHT', title: 'Satellite', thumbnail: 'https://i.ytimg.com/vi/9iPXcZVmaNc/sddefault.jpg' },
      { sourceID: 'Fe6Po5ceFY0', artist: 'Ninesin', title: 'Punishment', thumbnail: 'https://i.ytimg.com/vi/Fe6Po5ceFY0/sddefault.jpg' }
    ]
  },
  {
    name: 'K-indie',
    media: [
      { sourceID: 'fegmno49D30', artist: 'Hee Young', title: 'Are You Still Waiting?', thumbnail: 'https://i.ytimg.com/vi/fegmno49D30/sddefault.jpg' },
      { sourceID: 'WbF5LRaouno', artist: 'Morrie', title: 'Rainy Day', thumbnail: 'https://i.ytimg.com/vi/WbF5LRaouno/sddefault.jpg' },
      { sourceID: 'hfi43ImfcIs', artist: 'GGotjam Project (꽃잠프로젝트)', title: 'Summer (뜨거울 나이)', thumbnail: 'https://i.ytimg.com/vi/hfi43ImfcIs/sddefault.jpg' },
      { sourceID: 'zDpDe9LZb0k', artist: 'Soran (소란)', title: '자꾸 생각나 (Feat. Sam Ock, 김이지)', thumbnail: 'https://i.ytimg.com/vi/zDpDe9LZb0k/sddefault.jpg' }
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
  pl._id = id();
  pl.count = pl.media.length;
});

export function init() {
  // Normally, a server call
  setPlaylists(playlists);
}
