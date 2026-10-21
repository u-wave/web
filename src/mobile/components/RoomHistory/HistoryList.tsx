import List from '@mui/material/List';
import MediaListBase from '../../../components/MediaList/BaseMediaList';
import useRoomHistory from '../../../hooks/useRoomHistory';
import HistoryRow from './Row';

function HistoryList() {
  const media = useRoomHistory();

  return (
    <MediaListBase
      className="RoomHistory-list"
      listComponent={List}
      rowComponent={HistoryRow}
      media={media}
    />
  );
}

export default HistoryList;
