import React from 'react';
import type { AnyAction } from 'redux';
import { Media } from '../reducers/booth';

const {
  createContext,
  useContext,
  useMemo,
} = React;

export interface MediaSource<State extends object = Record<never, never>> {
  name: string;
  icon: URL;
  logo: URL;
  Player: React.ComponentType<{
    active: boolean,
    enabled: boolean,
    mode?: 'preview' | undefined,
    volume: number,
    media: Media,
    seek: number,
    onPlay?: () => void,
  }>;
  ImportForm?: React.ComponentType<{
    onShowImportPanel: () => void,
    onHideImportPanel: () => void,
  }>;
  ImportPanel?: React.ComponentType<{
    onClosePanel: () => void,
  } & State>;
  reducer?: (state: State, action: AnyAction) => State;
}

interface MediaSourceContextApi {
  getMediaSource(name: string): MediaSource | undefined;
  getAllMediaSources(): Record<string, MediaSource>;
}

const InternalContext = createContext<MediaSourceContextApi | null>(null);
const { Consumer } = InternalContext;

function useMediaSources() {
  const ctx = useContext(InternalContext);
  if (ctx == null) {
    throw new Error('Cannot call `useMediaSources` outside a `MediaSourceContext`');
  }
  return ctx;
}

function sourcesApi(sources: Record<string, MediaSource>): MediaSourceContextApi {
  function getMediaSource(name: string) {
    return sources[name];
  }

  function getAllMediaSources() {
    return sources;
  }

  return { getMediaSource, getAllMediaSources };
}

type ProviderProps = {
  mediaSources: Record<string, MediaSource>,
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
