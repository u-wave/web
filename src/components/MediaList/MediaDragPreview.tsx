import { mdiFormatListBulleted } from '@mdi/js';
import SvgIcon from '../SvgIcon';
import type { Media } from '../../reducers/booth';

function getItemStyles(offset: { x: number, y: number } | null) {
  if (offset != null) {
    return {
      display: 'inline-block',
      transform: `translate(${offset.x}px, ${offset.y}px)`,
    };
  }
  return { display: 'none' };
}

type MediaDragPreviewProps = {
  items?: { media?: Media[] | null } | null,
  currentOffset: { x: number, y: number } | null,
};
function MediaDragPreview({
  items,
  currentOffset,
}: MediaDragPreviewProps) {
  if (!items || !items.media) {
    return null;
  }
  return (
    <div
      className="MediaDragPreview"
      style={getItemStyles(currentOffset)}
    >
      <SvgIcon path={mdiFormatListBulleted} className="MediaDragPreview-icon" />
      {items.media.length}
    </div>
  );
}

export default MediaDragPreview;
