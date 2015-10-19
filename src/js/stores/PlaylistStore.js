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
  if (playlist) {
    selectedPlaylist = playlist;
    selectedPlaylist.selected = true;
    selectedMedia = selectedPlaylist.media || [];
  }
}

function activatePlaylist(playlist) {
  if (activePlaylist) {
    activePlaylist.active = false;
    activeMedia = [];
  }
  if (playlist) {
    activePlaylist = playlist;
    activePlaylist.active = true;
    activeMedia = activePlaylist.media || [];
  }
}

// TODO use a stack or counter here to ensure that multiple concurrent
// operations all get completed before setting the playlist to "not loading"
function setLoading(playlistId, loading = true) {
  if (playlists[playlistId] && playlists[playlistId].loading !== loading) {
    playlists[playlistId].loading = loading;
    // something changed!
    return true;
  }
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

  dispatchToken: dispatcher.register(({ type, payload, meta, error }) => {
    switch (type) {
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
    case 'searchStart':
      // Switch to displaying search results
      selectPlaylist(null);
      PlaylistStore.emit('change');
      break;

    case 'loadingPlaylist':
      if (setLoading(payload.playlistID)) {
        PlaylistStore.emit('change');
      }
      break;
    case 'loadedPlaylist':
      if (playlists[payload.playlistID]) {
        playlists[payload.playlistID].loading = false;
      }
      if (selectedPlaylist._id === payload.playlistID) {
        selectedMedia = payload.media;
      }
      if (activePlaylist._id === payload.playlistID) {
        activeMedia = payload.media;
      }
      PlaylistStore.emit('change');
      break;

    case 'creatingPlaylist':
      playlistWips[meta.tempId] = {
        _id: meta.tempId,
        name: payload.name,
        description: payload.description,
        shared: payload.shared,
        creating: true
      };
      selectPlaylist(playlistWips[meta.tempId]);
      PlaylistStore.emit('change');
      break;
    case 'createdPlaylist':
      delete playlistWips[meta.tempId];
      if (error) {
        debug('could not create playlist', payload.message);
      } else {
        playlists[payload.playlist._id] = payload.playlist;
        selectPlaylist(payload.playlist);
      }
      PlaylistStore.emit('change');
      break;

    case 'addMediaToPlaylist':
      if (setLoading(payload.playlistID)) {
        PlaylistStore.emit('change');
      }
      break;
    case 'addedMediaToPlaylist':
      if (error) break;
      const updatedPlaylist = playlists[payload.playlistID];
      if (updatedPlaylist) {
        updatedPlaylist.loading = false;
        updatedPlaylist.size = payload.newSize;
        if (selectedPlaylist === updatedPlaylist) {
          selectedMedia.push(...payload.appendedMedia);
        } else if (activePlaylist === updatedPlaylist) {
          activeMedia.push(...payload.appendedMedia);
        }
      }
      PlaylistStore.emit('change');
      break;

    default:
      // Not for us
    }
  })
});

export default PlaylistStore;
