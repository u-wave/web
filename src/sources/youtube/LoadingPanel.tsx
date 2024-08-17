import CircularProgress from '@mui/material/CircularProgress';
import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';

type LoadingPanelProps = {
  onClosePanel: () => void,
};
function LoadingPanel({ onClosePanel }: LoadingPanelProps) {
  return (
    <div className="ImportPanel">
      <ImportPanelHeader onClosePanel={onClosePanel} />
      <div className="ImportPanel-loading">
        <CircularProgress size="100%" />
      </div>
    </div>
  );
}

export default LoadingPanel;
