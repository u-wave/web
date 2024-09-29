/* eslint-disable import/prefer-default-export */
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
