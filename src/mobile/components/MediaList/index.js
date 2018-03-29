import withProps from 'recompose/withProps';
import { List } from 'material-ui/List';
import Base from '../../../components/MediaList/BaseMediaList';
import MediaRow from './Row';

const MediaList = withProps({
  listComponent: List,
  rowComponent: MediaRow,
})(Base);

export default MediaList;
