import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Votes from './Votes';
import type { HistoryEntry } from '../../../hooks/useRoomHistory';

const noWrap = { noWrap: true };

type HistoryRowProps = {
  media: HistoryEntry,
  /** For virtual list positioning. */
  style: React.CSSProperties,
};
function HistoryRow({ media, style }: HistoryRowProps) {
  return (
    <ListItem className="MobileMediaRow" style={style}>
      <ListItemAvatar>
        <Avatar
          src={media.media.thumbnail}
          variant="square"
        />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={noWrap}
        secondaryTypographyProps={noWrap}
        primary={media.media.title}
        secondary={media.media.artist}
      />
      <Votes {...media.stats} />
    </ListItem>
  );
}

export default HistoryRow;
