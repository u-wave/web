export default function listen(...stores) {
  return Component => {
    const proto = Component.prototype;

    const _componentDidMount = proto.componentDidMount;
    const _componentWillUnmount = proto.componentWillUnmount;

    proto.componentDidMount = function componentDidMount() {
      _componentDidMount && _componentDidMount.apply(this, arguments);
      stores.forEach(store => {
        store.on('change', this.onChange, this);
      });
    };

    proto.componentWillUnmount = function componentWillUnmount() {
      stores.forEach(store => {
        store.removeListener('change', this.onChange, this);
      });
      _componentWillUnmount && _componentWillUnmount.apply(this, arguments);
    };
  };
}
