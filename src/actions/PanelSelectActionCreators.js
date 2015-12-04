export function selectPanel(name) {
  return {
    type: 'selectPanel',
    payload: {
      panel: name
    }
  };
}
