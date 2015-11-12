import assign from 'object-assign';
import EventEmitter from 'eventemitter3';
import findIndex from 'array-findindex';
import values from 'object-values';
import dispatcher from '../dispatcher';

const playlists = {};
const playlistWips = {};
let activePlaylistID = null;
let activeMedia = [];
let selectedPlaylistID = null;
let selectedMedia = [];

const activePlaylist = () => playlists[activePlaylistID] || playlistWips[activePlaylistID];
const selectedPlaylist = () => playlists[selectedPlaylistID] || playlistWips[selectedPlaylistID];

function selectPlaylist(playlistID) {
  if (selectedPlaylist()) {
    selectedPlaylist().selected = false;
    selectedMedia = [];
  }
  if (playlistID) {
    selectedPlaylistID = playlistID;
    selectedPlaylist().selected = true;
    if (activePlaylistID && selectedPlaylistID === activePlaylistID) {
      selectedMedia = activeMedia;
    } else {
      selectedMedia = selectedPlaylist().media || [];
    }
  }
}

function activatePlaylist(playlistID) {
  if (activePlaylist()) {
    activePlaylist().active = false;
    activeMedia = [];
  }
  if (playlistID) {
    activePlaylistID = playlistID;
    activePlaylist().active = true;
    if (selectedPlaylistID && activePlaylistID === selectedPlaylistID) {
      activeMedia = selectedMedia;
    } else {
      activeMedia = activePlaylist().media || [];
    }
  }
}

function replaceArray(target, replacement) {
  target.splice(0, target.length, ...replacement);
}

function processMove(list, movedMedia, afterID) {
  const movedMap = movedMedia.reduce((map, media) => {
    map[media._id] = true;
    return map;
  }, {});
  const updated = list.filter(media => !movedMap[media._id]);
  const insertIdx = afterID === -1
    ? 0
    : findIndex(updated, media => media._id === afterID) + 1;
  updated.splice(insertIdx, 0, ...movedMedia);
  replaceArray(list, updated);
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
    return activePlaylist();
  },
  getActiveMedia() {
    return activeMedia;
  },
  getNextMedia() {
    return activeMedia && activeMedia[0] || null;
  },
  getSelectedPlaylist() {
    return selectedPlaylist() || activePlaylist();
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
    case 'loadedPlaylists':
      if (error) break;
      payload.playlists.forEach(playlist => {
        playlists[playlist._id] = playlist;
      });
      if (!activePlaylistID && payload.playlists.length > 0) {
        activatePlaylist(payload.playlists[0]._id);
      }
      if (!selectedPlaylistID && payload.playlists.length > 0) {
        selectPlaylist(payload.playlists[0]._id);
      }
      PlaylistStore.emit('change');
      break;
    case 'activatePlaylist':
      // TODO use a different property here so we can show a loading icon on
      // the "Active" button only, instead of on top of the entire playlist
      setLoading(payload.playlistID);
      PlaylistStore.emit('change');
      break;
    case 'activatedPlaylist':
      setLoading(payload.playlistID, false);
      activatePlaylist(payload.playlistID);
      PlaylistStore.emit('change');
      break;
    case 'selectPlaylist':
      selectPlaylist(payload.playlistID);
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
      if (selectedPlaylistID === payload.playlistID) {
        selectedMedia = payload.media;
      }
      if (activePlaylistID === payload.playlistID) {
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
      selectPlaylist(meta.tempId);
      PlaylistStore.emit('change');
      break;
    case 'createdPlaylist':
      delete playlistWips[meta.tempId];
      if (error) {
        debug('could not create playlist', payload.message);
      } else {
        playlists[payload.playlist._id] = payload.playlist;
        selectPlaylist(payload.playlist._id);
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
        if (selectedPlaylistID === updatedPlaylist._id) {
          selectedMedia.push(...payload.appendedMedia);
        } else if (activePlaylistID === updatedPlaylist._id) {
          activeMedia.push(...payload.appendedMedia);
        }
      }
      PlaylistStore.emit('change');
      break;

    case 'moveMediaInPlaylist':
      setLoading(payload.playlistID);
      PlaylistStore.emit('change');
      break;
    case 'movedMediaInPlaylist':
      if (error) break;
      if (selectedPlaylistID === payload.playlistID) {
        processMove(selectedMedia, payload.medias, payload.afterID);
      } else if (activePlaylistID === payload.playlistID) {
        processMove(activeMedia, payload.medias, payload.afterID);
      }
      setLoading(payload.playlistID, false);
      PlaylistStore.emit('change');
      break;

    case 'removeMediaFromPlaylist':
      setLoading(payload.playlistID);
      PlaylistStore.emit('change');
      break;
    case 'removedMediaFromPlaylist':
      setLoading(payload.playlistID, false);
      if (selectedPlaylistID === payload.playlistID) {
        selectedMedia = selectedMedia.filter(media => media._id !== payload.mediaID);
      } else if (activePlaylistID === payload.playlistID) {
        activeMedia = activeMedia.filter(media => media._id !== payload.mediaID);
      }
      PlaylistStore.emit('change');
      break;

    default:
      // Not for us
    }
  })
});

export default PlaylistStore;
