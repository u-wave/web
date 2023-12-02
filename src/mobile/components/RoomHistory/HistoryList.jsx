import List from '@mui/material/List';
import MediaListBase from '../../../components/MediaList/BaseMediaList';
import HistoryRow from './Row';
import useRoomHistory from '../../../hooks/useRoomHistory';

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
