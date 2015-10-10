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

function selectPlaylist(playlist) {
  if (selectedPlaylist) {
    selectedPlaylist.selected = false;
    selectedMedia = [];
  }
  selectedPlaylist = playlist;
  selectedPlaylist.selected = true;
  selectedMedia = selectedPlaylist.media || [];
}

function activatePlaylist(playlist) {
  if (activePlaylist) {
    activePlaylist.active = false;
    activeMedia = [];
  }
  activePlaylist = playlist;
  activePlaylist.active = true;
  activeMedia = activePlaylist.media || [];
}

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
        activatePlaylist(payload.playlists[0]);
      }
      if (!selectedPlaylist && payload.playlists.length > 0) {
        selectPlaylist(payload.playlists[0]);
      }
      PlaylistStore.emit('change');
      break;
    case 'setActivePlaylist':
      activatePlaylist(playlists[payload.playlistID]);
      PlaylistStore.emit('change');
      break;
    case 'selectPlaylist':
      selectPlaylist(playlists[payload.playlistID]);
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
      selectPlaylist(playlistWips[payload.tempId]);
      PlaylistStore.emit('change');
      break;
    case 'createdPlaylist':
      delete playlistWips[payload.tempId];
      playlists[payload.playlist._id] = payload.playlist;
      selectPlaylist(payload.playlist);
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
