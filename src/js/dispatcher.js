import { Dispatcher } from 'flux';

const dispatcher = new Dispatcher();

export default dispatcher;
export const dispatch = ::dispatcher.dispatch;
