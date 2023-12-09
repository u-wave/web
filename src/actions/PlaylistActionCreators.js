// TODO It would be good to get rid of this
export function flattenPlaylistItem(item) {
  return {
    ...item.media,
    ...item,
  };
}

export function cannotDeleteActivePlaylist(playlistID) {
  return {
    type: 'cannotDeleteActivePlaylist',
    error: true,
    payload: new Error('The active playlist cannot be deleted. '
      + 'Activate a different playlist first, before deleting this one.'),
    meta: { playlistID },
  };
}
