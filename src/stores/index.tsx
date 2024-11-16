import { MediaSearchStoreProvider } from './MediaSearchStore';

type AllStoresProvider = {
  children: React.ReactNode,
};
export function AllStoresProvider({ children }: AllStoresProvider) {
  return (
    <MediaSearchStoreProvider>
      {children}
    </MediaSearchStoreProvider>
  );
}
