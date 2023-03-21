import MediaListBase from '../MediaList/BaseMediaList';
import HistoryRow from './Row';
import useRoomHistory from '../../hooks/useRoomHistory';

function HistoryList() {
  const media = useRoomHistory();

  return (
    <MediaListBase
      className="RoomHistory-list"
      listComponent="div"
      rowComponent={HistoryRow}
      media={media}
    />
  );
}

export default HistoryList;
