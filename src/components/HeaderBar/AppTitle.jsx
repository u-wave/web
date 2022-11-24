import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { mdiMenuDown } from '@mdi/js';
import IconButton from '../IconButton';
import SvgIcon from '../SvgIcon';
import logo from '../../../assets/img/logo-white.png';

const AppTitle = ({
  className,
  children,
  onClick,
}) => (
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

AppTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AppTitle;
