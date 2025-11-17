import Divider from '@mui/material/Divider';
import MessageTimestamp from '../MessageTimestamp';
import type { Media } from '../../../reducers/booth';

type NowPlayingMessageProps = {
  entry: Pick<Media, 'sourceType' | 'sourceID' | 'artist' | 'title'>,
  timestamp: number,
};
function NowPlayingMessage({ entry, timestamp }: NowPlayingMessageProps) {
  return (
    <div className="NowPlayingMessage">
      <Divider>
        {entry.artist} – {entry.title}
      </Divider>
      <div className="NowPlayingMessage-time">
        <MessageTimestamp date={new Date(timestamp)} />
      </div>
    </div>
  );
}

export default NowPlayingMessage;
