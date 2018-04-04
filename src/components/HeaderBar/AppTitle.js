import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import AboutIcon from 'material-ui-icons/ArrowDropDown';
import logo from '../../../assets/img/logo-white.png';

const AppTitle = ({
  className,
  hasAboutPage,
  children,
  onClick,
}) => (
  <div className={cx('AppTitle', className, hasAboutPage && 'AppTitle--hasAboutPage')}>
    <h1 className="AppTitle-logo">
      <img
        className="AppTitle-logoImage"
        alt={children}
        src={logo}
      />
    </h1>
    {hasAboutPage && (
      <IconButton className="AppTitle-button" onClick={onClick}>
        <AboutIcon />
      </IconButton>
    )}
  </div>
);

AppTitle.propTypes = {
  className: PropTypes.string,
  hasAboutPage: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AppTitle;
