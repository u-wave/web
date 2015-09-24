import dispatcher from '../dispatcher';

export function setPlaylists(playlists) {
  dispatcher.dispatch({
    action: 'playlists',
    playlists: playlists
  });
}

export function selectPlaylist(playlistID) {
  dispatcher.dispatch({
    action: 'selectPlaylist',
    playlistID: playlistID
  });
}

export function setActivePlaylist(playlistID) {
  dispatcher.dispatch({
    action: 'setActivePlaylist',
    playlistID: playlistID
  });
}
