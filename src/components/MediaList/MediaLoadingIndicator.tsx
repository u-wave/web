import cx from 'clsx';
import CircularProgress from '@mui/material/CircularProgress';

type MediaLoadingIndicatorProps = {
  className?: string,
};
function MediaLoadingIndicator({ className }: MediaLoadingIndicatorProps) {
  return (
    <div className={cx('MediaLoadingIndicator', className)}>
      <CircularProgress className="MediaLoadingIndicator-spinner" />
    </div>
  );
}

export default MediaLoadingIndicator;
