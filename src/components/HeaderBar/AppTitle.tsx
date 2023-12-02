import cx from 'clsx';
import IconButton from '@mui/material/IconButton';
import { mdiMenuDown } from '@mdi/js';
import SvgIcon from '../SvgIcon';
import logo from '../../../assets/img/logo-white.png';

type AppTitleTypes = {
  className?: string,
  children: string,
  onClick?: () => void,
};

function AppTitle({
  className,
  children,
  onClick,
}: AppTitleTypes) {
  return (
    <div className={cx('AppTitle', className)}>
      <h1 className="AppTitle-logo">
        <img
          className="AppTitle-logoImage"
          alt={children}
          src={logo}
        />
      </h1>
      <IconButton className="AppTitle-button" onClick={onClick}>
        <SvgIcon path={mdiMenuDown} />
      </IconButton>
    </div>
  );
}

export default AppTitle;
