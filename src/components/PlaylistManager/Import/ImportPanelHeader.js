import cx from 'classnames';
import * as React from 'react';
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
  className: React.PropTypes.string,
  children: React.PropTypes.node,
  t: React.PropTypes.func.isRequired,
  onClosePanel: React.PropTypes.func.isRequired
};

export default translate()(ImportPanelHeader);
