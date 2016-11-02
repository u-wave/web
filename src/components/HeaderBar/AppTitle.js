import cx from 'classnames';
import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import AboutIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';

const AppTitle = ({
  className,
  children,
  onClick
}) => (
  <div className={cx('AppTitle', className)}>
    <h1 className="AppTitle-logo">{children}</h1>
    <IconButton className="AppTitle-button" onClick={onClick}>
      <AboutIcon />
    </IconButton>
  </div>
);

AppTitle.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default AppTitle;
