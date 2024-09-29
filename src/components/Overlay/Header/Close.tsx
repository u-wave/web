import cx from 'clsx';
import IconButton from '@mui/material/IconButton';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import SvgIcon from '../../SvgIcon';

const icons = {
  bottom: mdiChevronDown,
  top: mdiChevronUp,
};

type CloseProps = {
  className?: string,
  direction: keyof typeof icons,
  onClose: () => void,
};
function Close({ className, onClose, direction }: CloseProps) {
  return (
    <IconButton
      className={cx('OverlayHeaderClose', className)}
      onClick={onClose}
    >
      <SvgIcon path={icons[direction]} className="OverlayHeaderClose-icon" />
    </IconButton>
  );
}

export default Close;
