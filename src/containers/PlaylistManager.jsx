import React from 'react';
import createLazyOverlay from '../components/LazyOverlay';

const PlaylistManager = createLazyOverlay({
  Component: React.lazy(() => import('../components/PlaylistManager')),
  title: (t) => t('playlists.title'),
});

export default PlaylistManager;
