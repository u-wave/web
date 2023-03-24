import React from 'react';

const {
  useCallback,
  useContext,
  useMemo,
  useState,
} = React;

interface MediaSearchStore {
  activeSource: string;
  query: string | null;
  search: (query: string | null) => void;
  reset: () => void;
  setSource: (source: string) => void;
}
const MediaSearchStoreContext = React.createContext<MediaSearchStore | null>(null);

function useStoreImplementation() {
  const [query, setQuery] = useState<string | null>(null);
  const [activeSource, setActiveSource] = useState('youtube');

  const reset = useCallback(() => {
    setQuery(null);
  }, []);

  const context = useMemo(() => ({
    activeSource,
    query,

    search: setQuery,
    reset,
    setSource: setActiveSource,
  }), [activeSource, query, setQuery, reset, setActiveSource]);

  return context;
}

type MediaSearchStoreProviderProps = {
  children: React.ReactNode,
};
export function MediaSearchStoreProvider({ children }: MediaSearchStoreProviderProps) {
  const context = useStoreImplementation();

  return (
    <MediaSearchStoreContext.Provider value={context}>
      {children}
    </MediaSearchStoreContext.Provider>
  );
}

export function useMediaSearchStore() {
  const store = useContext(MediaSearchStoreContext);
  if (!store) {
    throw new Error('Cannot call `useMediaSearchStore` outside of a `MediaSearchStoreProvider`');
  }
  return store;
}
