import cx from 'clsx';
import ListItemButton, { type ListItemButtonProps } from '@mui/material/ListItemButton';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import SvgIcon from '../SvgIcon';

/**
 * A ListItem component wrapper around material-ui's ListItem,
 * with a üWave skin.
 */

type ListItemProps = ListItemButtonProps;
function ListItem({
  className,
  children,
  selected,
  ...props
}: ListItemProps) {
  return (
    <ListItemButton
      {...props}
      className={cx(className, selected && 'is-selected')}
    >
      {children}
      {selected && (
        <>
          <SvgIcon path={mdiChevronRight} className="u-rtl-hidden" />
          <SvgIcon path={mdiChevronLeft} className="u-rtl-only" />
        </>
      )}
    </ListItemButton>
  );
}

export default ListItem;
