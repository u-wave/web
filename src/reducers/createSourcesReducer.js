const initialState = {};

// A reducer that calls each known Media Source's reducer.
function reduceSources(state = initialState, action, sources) {
  return Object.keys(sources).reduce((newState, sourceName) => {
    const source = sources[sourceName];
    if (!source.reducer) {
      return newState;
    }
    return {
      ...newState,
      [sourceName]: source.reducer(newState[sourceName], action),
    };
  }, state);
}

export default function createSourcesReducer(options) {
  const mediaSources = options.mediaSources || {};
  return function reducer(state, action) {
    return reduceSources(state, action, mediaSources);
  };
}
