import cx from 'clsx';
import MediaLoadingIndicator from './MediaLoadingIndicator';

type LoadingRowProps = React.ComponentProps<'div'>;
function LoadingRow({ className, ...attrs }: LoadingRowProps) {
  return (
    <div className={cx('MediaListRow', 'is-loading', className)} {...attrs}>
      <MediaLoadingIndicator className="MediaListRow-loader" />
      <div className="MediaListRow-data">
        <div className="MediaListRow-artist">
          {' … '}
        </div>
        <div className="MediaListRow-title">
          {' … '}
        </div>
      </div>
      <div className="MediaListRow-duration">
        {' … '}
      </div>
      <div className="MediaListRow-icon" />
    </div>
  );
}

export default LoadingRow;
