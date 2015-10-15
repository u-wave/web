import { Dispatcher } from 'flux';

const debugOk = require('debug')('uwave:dispatcher');
const debugError = require('debug')('uwave:dispatcher');
debugError.log = ::console.error;

class UWaveDispatcher extends Dispatcher {
  dispatch(action) {
    const { type, payload, error, meta } = action;
    const debug = error ? debugError : debugOk;
    debug(type, payload, meta || '');
    super.dispatch(action);
  }
}

const dispatcher = new UWaveDispatcher();

export default dispatcher;
export const dispatch = ::dispatcher.dispatch;
