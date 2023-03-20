import useSWR from 'swr';
import { useMemo } from 'react';
import List from '@mui/material/List';
import MediaListBase from '../../../components/MediaList/BaseMediaList';
import HistoryRow from './Row';
import { useSelector } from '../../../hooks/useRedux';
import { normalizeFromApi } from '../../../reducers/roomHistory';
import mergeIncludedModels from '../../../utils/mergeIncludedModels';
import { currentPlaySelector } from '../../../selectors/boothSelectors';

async function fetchJSON(url) {
  const res = await fetch(`/api${url}`);
  const data = await res.json();
  return data;
}

function HistoryList() {
  const { data } = useSWR('/booth/history', fetchJSON, {
    suspense: true,
  });

  const currentPlay = useSelector(currentPlaySelector);
  const historyEntries = useMemo(() => {
    return mergeIncludedModels(data).map(normalizeFromApi);
  }, [data]);

  const media = useMemo(() => {
    if (!currentPlay) {
      return historyEntries;
    }
    if (historyEntries[0]._id === currentPlay._id) {
      return [currentPlay, ...historyEntries.slice(1)];
    }
    return [currentPlay, ...historyEntries];
  }, [currentPlay, historyEntries]);

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
