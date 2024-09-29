import List from '@mui/material/List';
import Base from '../../../components/MediaList/BaseMediaList';
import MediaRow from './Row';
import type { Media } from '../../../reducers/booth';

type MediaListProps = {
  className?: string,
  media: (Media | null)[],
};
function MediaList(props: MediaListProps) {
  return (
    <Base
      listComponent={List}
      rowComponent={MediaRow}
      {...props}
    />
  );
}

export default MediaList;
