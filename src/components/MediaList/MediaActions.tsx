import cx from 'clsx';
import AddToPlaylistAction from './AddToPlaylistAction';
import PreviewMediaAction from './PreviewMediaAction';
import { Media } from '../../reducers/booth';

function dontBubble(event: React.MouseEvent) {
  event.stopPropagation();
}

type MediaActionsProps = {
  className?: string,
  media: Media,
};
function MediaActions({ className, media }: MediaActionsProps) {
  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={cx('MediaActions', className)}
      onClick={dontBubble}
    >
      <PreviewMediaAction media={media} />
      <AddToPlaylistAction media={media} />
    </div>
  );
}

export default MediaActions;
