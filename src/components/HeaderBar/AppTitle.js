import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AboutIcon from '@material-ui/icons/ArrowDropDown';
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
