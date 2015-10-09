import assign from 'object-assign';
import EventEmitter from 'events';
import values from 'object-values';
import dispatcher from '../dispatcher';

const playlists = {};
const playlistWips = {};
let activePlaylist = null;
let activeMedia = [];
let selectedPlaylist = null;
let selectedMedia = [];

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
    return values(playlists)
      .concat(values(playlistWips));
  },

  dispatchToken: dispatcher.register(payload => {
    switch (payload.action) {
    case 'playlists':
      payload.playlists.forEach(playlist => {
        playlists[playlist._id] = playlist;
      });
      if (!activePlaylist && payload.playlists.length > 0) {
        activePlaylist = payload.playlists[0];
        activePlaylist.active = true;
        // TODO grab this from server or cache instead of playlist obj
        activeMedia = activePlaylist.media;
      }
      if (!selectedPlaylist && payload.playlists.length > 0) {
        selectedPlaylist = payload.playlists[0];
        selectedPlaylist.selected = true;
        // TODO grab this from server or cache instead of playlist obj
        selectedMedia = selectedPlaylist.media;
      }
      PlaylistStore.emit('change');
      break;
    case 'setActivePlaylist':
      if (activePlaylist) {
        activePlaylist.active = false;
      }
      activePlaylist = playlists[payload.playlistID];
      activePlaylist.active = true;
      // TODO grab this from server or cache instead of playlist obj
      activeMedia = activePlaylist.media;
      PlaylistStore.emit('change');
      break;
    case 'selectPlaylist':
      if (selectedPlaylist) {
        selectedPlaylist.selected = false;
      }
      selectedPlaylist = playlists[payload.playlistID];
      selectedPlaylist.selected = true;
      // TODO grab this from server or cache instead of playlist obj
      selectedMedia = selectedPlaylist.media;
      PlaylistStore.emit('change');
      break;

    case 'creatingPlaylist':
      playlistWips[payload.tempId] = {
        _id: payload.tempId,
        name: payload.name,
        description: payload.description,
        shared: payload.shared,
        creating: true
      };
      selectedPlaylist = playlistWips[payload.tempId];
      PlaylistStore.emit('change');
      break;
    case 'createdPlaylist':
      delete playlistWips[payload.tempId];
      playlists[payload.playlist._id] = payload.playlist;
      PlaylistStore.emit('change');
      break;
    case 'createPlaylistError':
      delete playlistWips[payload.tempId];
      debug('could not create playlist', payload.message);
      PlaylistStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default PlaylistStore;
