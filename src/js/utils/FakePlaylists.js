import { setPlaylists } from '../actions/PlaylistActionCreators';

function id() {
  return Math.floor(Math.random() * 1e9);
}

export function init() {
  // Normally, a server call
  setPlaylists([
    { id: id(), name: 'K-pop', media: [ 1, 2, 3 ] }
  ]);
}
