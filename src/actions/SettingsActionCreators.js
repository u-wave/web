export function set(name, value) {
  return {
    type: 'setSettings',
    payload: { [name]: value }
  };
}
