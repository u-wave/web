import LinearProgress from '@mui/material/LinearProgress';
import type { Media } from '../../reducers/booth';

type VideoProgressBarProps = {
  media: Media,
  seek: number,
};
function VideoProgressBar({ media, seek }: VideoProgressBarProps) {
  return (
    <div className="Video-overlay Video-progress">
      <LinearProgress
        variant="determinate"
        color="primary"
        value={((seek - media.start) / (media.end - media.start)) * 100}
      />
    </div>
  );
}

export default VideoProgressBar;
