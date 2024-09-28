import { mdiFormatListBulleted } from '@mdi/js';
import SvgIcon from '../SvgIcon';

type MediaDragPreviewProps = {
  count: number,
};
function MediaDragPreview({ count }: MediaDragPreviewProps) {
  return (
    <div className="MediaDragPreview">
      <SvgIcon path={mdiFormatListBulleted} className="MediaDragPreview-icon" />
      {count}
    </div>
  );
}

export default MediaDragPreview;
