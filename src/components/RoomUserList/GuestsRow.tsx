import cx from 'clsx';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTranslator } from '@u-wave/react-translate';

type GuestsRowProps = {
  className?: string,
  style?: React.CSSProperties,
  guests: number,
};
function GuestsRow({ className, guests, style }: GuestsRowProps) {
  const { t } = useTranslator();

  return (
    <ListItem component="div" className={cx('UserRow', 'UserRow--guests', className)} style={style}>
      <ListItemText
        classes={{ primary: 'UserRow-guestsText' }}
        primary={t('users.guests', { count: guests })}
      />
    </ListItem>
  );
}

export default GuestsRow;
