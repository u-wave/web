const onChange = Symbol('onChange listener');

export default function listen(...stores) {
  return Component => {
    const proto = Component.prototype;

    const _componentDidMount = proto.componentDidMount;
    const _componentWillUnmount = proto.componentWillUnmount;

    proto.componentDidMount = function componentDidMount() {
      _componentDidMount && _componentDidMount.apply(this, arguments);
      this[onChange] = ::this.onChange;
      stores.forEach(store => {
        store.on('change', this[onChange]);
      });
    };

    proto.componentWillUnmount = function componentWillUnmount() {
      if (this[onChange]) {
        stores.forEach(store => {
          store.removeListener('change', this[onChange]);
        });
      }
      _componentWillUnmount && _componentWillUnmount.apply(this, arguments);
    };
  };
}
