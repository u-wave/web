import withProps from 'recompose/withProps';
import Base from './BaseMediaList';
import Row from './Row';

const MediaList = withProps({
  listComponent: 'div',
  rowComponent: Row,
})(Base);

export default MediaList;
