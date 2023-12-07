import { Suspense } from 'react';
import { useMediaSources } from '../../../context/MediaSourceContext';
import LoadingPanel from './LoadingPanel';

type PlaylistImportProps = {
  selectedSourceType: string | null,
  sourceStates: Record<string, object>,
  onShowImportPanel: (sourceType: string) => void,
  onHideImportPanel: () => void,
};
function PlaylistImport({
  selectedSourceType,
  sourceStates,
  onShowImportPanel,
  onHideImportPanel,
}: PlaylistImportProps) {
  const { getMediaSource, getAllMediaSources } = useMediaSources();

  if (selectedSourceType) {
    const source = getMediaSource(selectedSourceType);
    if (source && source.ImportPanel != null) {
      const state = sourceStates[selectedSourceType];
      // The panels may be lazy loaded.
      return (
        <Suspense fallback={<LoadingPanel onClosePanel={onHideImportPanel} />}>
          <source.ImportPanel
            onClosePanel={onHideImportPanel}
            {...state}
          />
        </Suspense>
      );
    }
  }

  const forms: React.ReactNode[] = [];
  const sources = getAllMediaSources();
  Object.entries(sources).forEach(([sourceType, source]) => {
    if (source.ImportForm != null) {
      forms.push((
        <source.ImportForm
          key={sourceType}
          onShowImportPanel={() => onShowImportPanel(sourceType)}
          onHideImportPanel={onHideImportPanel}
        />
      ));
    }
  });

  return (
    <div className="PlaylistImport">
      <Suspense fallback={<LoadingPanel onClosePanel={onHideImportPanel} />}>
        {forms}
      </Suspense>
    </div>
  );
}

export default PlaylistImport;
