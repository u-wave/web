import { get, del } from '../../actions/RequestActionCreators';
import mergeIncludedModels from '../../utils/mergeIncludedModels';
import { LOAD_BANS_START, LOAD_BANS_COMPLETE } from '../constants/ActionTypes';

export function loadBansStart() {
  return { type: LOAD_BANS_START };
}

export function loadBansComplete(response) {
  const { meta } = response;

  return {
    type: LOAD_BANS_COMPLETE,
    payload: {
      bans: mergeIncludedModels(response),
    },
    meta: {
      page: Math.floor(meta.offset / meta.pageSize),
      size: meta.pageSize,
    },
  };
}

export function loadBans() {
  return get('/bans', {
    onStart: loadBansStart,
    onComplete: loadBansComplete,
  });
}

export function unbanUser(user) {
  return del(`/bans/${user._id}`, {});
}

export function unbanUserAndReload(user) {
  return dispatch => dispatch(unbanUser(user))
    .then(() => dispatch(loadBans()));
}
