import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import type { Media } from '../../../reducers/booth';

const noWrap = { noWrap: true };

type MediaRowProps = {
  media: Media,
  /** For virtual list positioning. */
  style: React.CSSProperties,
};
function MediaRow({ media, style }: MediaRowProps) {
  return (
    <ListItem className="MobileMediaRow" style={style}>
      <ListItemAvatar>
        <Avatar
          src={media.thumbnail}
          variant="square"
        />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={noWrap}
        secondaryTypographyProps={noWrap}
        primary={media.title}
        secondary={media.artist}
      />
    </ListItem>
  );
}

export default MediaRow;
