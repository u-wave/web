import cx from 'clsx';
import { useTranslator } from '@u-wave/react-translate';
import { mdiArrowDown } from '@mdi/js';
import Fab from '@mui/material/Fab';
import SvgIcon from '../SvgIcon';

type ScrollDownNoticeProps = {
  show: boolean,
  onClick: () => void,
};
function ScrollDownNotice({ show, onClick }: ScrollDownNoticeProps) {
  const { t } = useTranslator();

  return (
    <div className={cx('ChatMessages-scrollDown', show && 'is-visible')}>
      <Fab
        tabIndex={show ? 0 : -1}
        className="ChatMessages-scrollDownButton"
        size="small"
        color="primary"
        aria-label={t('chat.scrollDown')}
        onClick={onClick}
      >
        <SvgIcon path={mdiArrowDown} />
      </Fab>
    </div>
  );
}

export default ScrollDownNotice;
