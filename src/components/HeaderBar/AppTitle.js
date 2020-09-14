import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AboutIcon from '@material-ui/icons/ArrowDropDown';

const logo = new URL('../../../assets/img/logo-white.png', import.meta.url);

// We use `logo.pathname` to ensure that the prerendered loading screen
// does not include a `file://` prefix. This should still work fine in browsers
// so long as the asset is hosted on the same domain as the web client, which
// has always been the expected situation.
function pathname(url) {
  if (url.protocol === 'data:') {
    return url.toString();
  }
  return url.pathname;
}

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
        src={pathname(logo)}
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
