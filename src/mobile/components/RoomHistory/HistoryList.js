import withProps from 'recompose/withProps';
import { List } from 'material-ui/List';
import Base from '../../../components/MediaList/BaseMediaList';
import HistoryRow from './Row';

const HistoryList = withProps({
  className: 'RoomHistory-list',
  listComponent: List,
  rowComponent: HistoryRow,
})(Base);

export default HistoryList;
