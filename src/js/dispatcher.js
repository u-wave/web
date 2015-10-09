import { Dispatcher } from 'flux';

const debug = require('debug')('uwave:dispatcher');

class UWaveDispatcher extends Dispatcher {
  dispatch(payload) {
    debug('dispatch', payload.action, payload);
    super.dispatch(payload);
  }
}

const dispatcher = new UWaveDispatcher();

export default dispatcher;
export const dispatch = ::dispatcher.dispatch;
