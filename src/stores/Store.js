import EventEmitter from 'eventemitter3';
import dispatcher from '../dispatcher';

export default class Store extends EventEmitter {
  constructor() {
    super();
    this.state = this.reduce(undefined, {});
    this.dispatchToken = dispatcher.register(action => {
      const oldState = this.state;
      this.state = this.reduce(this.state, action);
      if (this.state !== oldState) {
        this.emit('change');
      }
    });
  }
}
