import React from 'react';

const {
  createContext,
  useContext,
  useMemo,
} = React;

interface SourcesApi {
  getMediaSource(name: string): { icon: string, name: string };
  getAllMediaSources(): Record<string, { icon: string, name: string }>;
}

const InternalContext = createContext<SourcesApi | null>(null);
const { Consumer } = InternalContext;

function useMediaSources() {
  const ctx = useContext(InternalContext);
  if (ctx == null) {
    throw new Error('Cannot call `useMediaSources` outside a `MediaSourceContext`');
  }
  return ctx;
}

function sourcesApi(sources: Record<string, { icon: string, name: string }>): SourcesApi {
  function getMediaSource(name: string) {
    return sources[name];
  }

  function getAllMediaSources() {
    return sources;
  }

  return { getMediaSource, getAllMediaSources };
}

type ProviderProps = {
  mediaSources: Record<string, { icon: string, name: string }>,
  children: React.ReactNode,
};
function Provider({ mediaSources, children }: ProviderProps) {
  const value = useMemo(() => sourcesApi(mediaSources), [mediaSources]);
  return (
    <InternalContext.Provider value={value}>
      {children}
    </InternalContext.Provider>
  );
}

export default { Provider, Consumer };
export { useMediaSources };
