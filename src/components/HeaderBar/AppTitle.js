import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AboutIcon from '@material-ui/icons/ArrowDropDown';

const logo = new URL('../../../assets/img/logo-white.png', import.meta.url);

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
      <AboutIcon />
    </IconButton>
  </div>
);

AppTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AppTitle;
