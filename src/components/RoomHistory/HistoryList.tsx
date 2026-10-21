import useRoomHistory from '../../hooks/useRoomHistory';
import MediaListBase from '../MediaList/BaseMediaList';
import HistoryRow from './Row';

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
