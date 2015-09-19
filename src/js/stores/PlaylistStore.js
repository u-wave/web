import assign from 'object-assign';
import EventEmitter from 'events';
import values from 'object-values';
import dispatcher from '../dispatcher';

let currentPlaylist = null;
const playlists = {};

const PlaylistStore = assign(new EventEmitter, {
  getCurrentPlaylist() {
    return playlists[currentPlaylist];
  },
  getPlaylists() {
    return values(playlists);
  },

  dispatchToken: dispatcher.register(payload => {
    switch (payload.action) {
    case 'playlists':
      payload.playlists.forEach(playlist => {
        playlists[playlist.id] = playlist;
      });
      if (!currentPlaylist && payload.playlists.length > 0) {
        currentPlaylist = payload.playlists[0].id;
      }
      PlaylistStore.emit('change');
      break;
    case 'setActivePlaylist':
      currentPlaylist = payload.playlistID;
      PlaylistStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default PlaylistStore;
