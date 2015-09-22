import assign from 'object-assign';
import EventEmitter from 'events';
import values from 'object-values';
import dispatcher from '../dispatcher';

const playlists = {};
let activePlaylist = null;
const activeMedia = [
  { artist: 'Swings', title: 'Bulldozer' }
];
let selectedPlaylist = null;
const selectedMedia = [
  { artist: '4Minute', title: 'Crazy' }
];

const PlaylistStore = assign(new EventEmitter, {
  getActivePlaylist() {
    return activePlaylist;
  },
  getActiveMedia() {
    return activeMedia;
  },
  getSelectedPlaylist() {
    return selectedPlaylist || activePlaylist;
  },
  getSelectedMedia() {
    return selectedMedia;
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
      if (!activePlaylist && payload.playlists.length > 0) {
        activePlaylist = payload.playlists[0];
        activePlaylist.active = true;
      }
      if (!selectedPlaylist && payload.playlists.length > 0) {
        selectedPlaylist = payload.playlists[0];
        selectedPlaylist.selected = true;
      }
      PlaylistStore.emit('change');
      break;
    case 'setActivePlaylist':
      if (activePlaylist) {
        activePlaylist.active = false;
      }
      activePlaylist = playlists[payload.playlistID];
      activePlaylist.active = true;
      PlaylistStore.emit('change');
      break;
    case 'selectPlaylist':
      if (selectedPlaylist) {
        selectedPlaylist.selected = false;
      }
      selectedPlaylist = playlists[payload.playlistID];
      selectedPlaylist.selected = true;
      PlaylistStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default PlaylistStore;
