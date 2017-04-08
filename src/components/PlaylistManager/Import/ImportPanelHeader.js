import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

const ImportPanelHeader = ({
  t,
  className,
  children,
  onClosePanel
}) => (
  <div className={cx('ImportPanelHeader', className)}>
    <div className="ImportPanelHeader-content">
      {children}
    </div>
    <IconButton
      onClick={onClosePanel}
      tooltip={t('close')}
      tooltipPosition="top-center"
    >
      <CloseIcon color="#555" hoverColor="#fff" />
    </IconButton>
  </div>
);

ImportPanelHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  t: PropTypes.func.isRequired,
  onClosePanel: PropTypes.func.isRequired
};

export default translate()(ImportPanelHeader);
