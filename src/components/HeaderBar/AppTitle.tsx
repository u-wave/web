import { mdiMenuDown } from '@mdi/js';
import IconButton from '@mui/material/IconButton';
import cx from 'clsx';
import logo from '../../../assets/img/logo-white.png';
import SvgIcon from '../SvgIcon';

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
