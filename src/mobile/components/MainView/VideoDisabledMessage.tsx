import { useTranslator } from '@u-wave/react-translate';
import Button from '@mui/material/Button';

type VideoDisabledMessageProps = {
  onEnableVideo: () => void,
};
function VideoDisabledMessage({ onEnableVideo }: VideoDisabledMessageProps) {
  const { t } = useTranslator();

  return (
    <div className="VideoDisabledMessage">
      <p className="VideoDisabledMessage-text">{t('booth.videoDisabled')}</p>
      <Button variant="contained" onClick={onEnableVideo}>
        Enable?
      </Button>
    </div>
  );
}

export default VideoDisabledMessage;
