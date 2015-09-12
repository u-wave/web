import dispatcher from '../dispatcher';

export function advance(media) {
  dispatcher.dispatch({
    action: 'advance',
    media: media
  });
}
