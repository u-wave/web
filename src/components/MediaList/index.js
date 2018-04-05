import defaultProps from 'recompose/defaultProps';
import Base from './BaseMediaList';
import Row from './Row';

const MediaList = defaultProps({
  listComponent: 'div',
  rowComponent: Row,
})(Base);

export default MediaList;
