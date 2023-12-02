import Base, { BaseMediaListProps } from './BaseMediaList';
import Row from './Row';

type MediaListProps = Omit<BaseMediaListProps, 'listComponent' | 'rowComponent'>
  & Partial<Pick<BaseMediaListProps, 'listComponent' | 'rowComponent'>>;
function MediaList(props: MediaListProps) {
  return (
    <Base
      listComponent="div"
      rowComponent={Row}
      {...props}
    />
  );
}

export default MediaList;
